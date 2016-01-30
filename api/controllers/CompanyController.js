var requestsDB = require('../../api/services/requestsDB.js')
var CommonFunctions = require('../../api/services/CommonFunctions.js')
var _ = require('lodash')
var async = require('async')

module.exports = {
    createCompany: createCompany
}


function createCompany(req, res) {
    var reqFieldsPresent = CommonFunctions.areKeysInObj(reqFields.createCompany, req.body);
    if(reqFieldsPresent !== true) {
        return res.json({status: 400, msg:'[CompanyController createCompany] Missed required field: '+reqFieldsPresent})
    }

    var company = _.cloneDeep(req.body)
    delete company.email 
    delete company.password
     
    async.waterfall([
        function(callback) {
            requestsDB.create('Company', req.body, function(response){
                if (response.status) {
                    return res.json({status:response.status, msg:'[CompanyController createCompany] '+response.msg})
                }
            callback(null, response._id);
            })
        },
        function(id, callback) {

            var credentials = {
                company_id: id,
                email: req.body.email,
                password: req.body.password
            }
            requestsDB.changePass(credentials, function(response){
                if (response.status) {
                    return res.json({status:response.status, msg:'[CompanyController createCompany] '+response.msg})
                }
                callback(response)
            })
        }
    ], function (result) {
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

