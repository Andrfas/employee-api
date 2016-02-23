var requestsDB = require('../../api/services/requestsDB.js');
var credentialsCntrl = require('../../api/controllers/CredentialsController.js');
var mailingCntrl = require('../../api/controllers/MailingController.js');
var CommonFunctions = require('../../api/services/CommonFunctions.js');
var _ = require('lodash');
var async = require('async');

module.exports = {
    createCompany: createCompany
}


function createCompany(req, res) {
    var reqFieldsPresent = CommonFunctions.areKeysInObj(reqFields.createCompany, req.body);
    if(reqFieldsPresent !== true) {
        return res.json({success:false, data:{status:1, msg:reqFieldsPresent+' is missing'}})
    }

    var company = _.cloneDeep(req.body)
    delete company.email 
    delete company.password
    async.auto({
        checkIfEmail: function (callback){
            requestsDB.findOne('Credentials', {email: req.body.email}, function(err,response){
                if (err) {
                    return callback({msg:'[CompanyController checkIfEmail] '+err.msg})
                }
                if (response != null){
                    return callback({msg: '[CompanyController checkIfEmail] email already exists'})
                }
                callback();
            })
        },
        createCompany: ['checkIfEmail', function(callback) {
            requestsDB.create('Company', company, function(err,response){
                if (err) {
                    return callback({msg:'[CompanyController createCompany] '+err.msg})
                }
            callback(null, response);
            })
        }],
        sendEmail: ['createCompany', function(callback, data) {
            mailingCntrl.sendConfirmLetter('company', data.createCompany._id, req.body.email, function(err, response){
                if(err) {
                    return callback({msg:'[CompanyController createCompany sendEmail] '+err.msg})
                }
                callback(null, response);
            })
        }],
        createCredentials: ['createCompany', function(callback, data) {
            var credentials = {
                client_type: 'company',
                client_id: data.createCompany._id,
                email: req.body.email,
                password: req.body.password,
                status: 'notConfirmed'
            }
            credentialsCntrl.createCredentials(credentials, function(err, response){
                if (err) {
                    return callback({msg:'[CompanyController createCompany createCredentials] '+err.msg})
                }
                return callback(null, data.createCompany)
            })
        }]
    }, function (err, response) {
        if(err) {
            return res.json(err);
        }
        return res.ok({status: 200});
    });

}

// fields, that are required for request. Should be for each function, and should have the same name
var reqFields = {
    createCompany: [
        'name',
        'description',
        'email',
        'password'
    ]
}

