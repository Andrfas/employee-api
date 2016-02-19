/**
 * EmployeeController
 *
 * @description :: Server-side logic for managing employees
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var db = require('../../libs/mongoose.js');
var CommonFunctions = require('../../api/services/CommonFunctions.js');
var _ = require('lodash');
var async = require('async');
var requestsDB = require('../../api/services/requestsDB.js');
var credentialsCntrl = require('../../api/controllers/CredentialsController.js');
var mailingCntrl = require('../../api/controllers/MailingController.js');

module.exports = {
	createEmployee: createEmployee
}

function createEmployee (req, res) {
    var fields = _.pick(req.body, Fields.createEmployee.allowed);
	var reqFieldsPresent = CommonFunctions.areKeysInObj(Fields.createEmployee.required, fields);
    if(reqFieldsPresent !== true) {
        return res.json({success:false, msg:'[EmployeeController createEmployee] Missed required field: '+reqFieldsPresent})
    }
    
    var employee = _.cloneDeep(fields)
    delete employee.email 
    delete employee.password

    async.auto({
    	checkIfEmail: function (callback){
            requestsDB.findOne('Credentials', {email: fields.email}, function(err,response){
                if (err) {
                    return callback({success:false, msg:'[EmployeeController checkIfEmail] '+err.msg})
                }
                if (response != null){
                    return callback({success:false, msg: '[EmployeeController checkIfEmail] email already exists'})
                }
                callback();
            })
        },
        createEmployee: ['checkIfEmail', function(callback) {
            requestsDB.create('Employee', employee, function(err,response){
                if (err) {
                    return callback({success:false, msg:'[EmployeeController createEmployee] '+err.msg})
                }
            callback(null, response);
            })
        }],
        sendEmail: ['createEmployee', function(callback, data) {
            mailingCntrl.sendConfirmLetter('employee', data.createEmployee._id, fields.email, function(err, response){
                if(err) {
                    return callback({success:false, msg:'[EmployeeController createEmployee sendEmail] '+err.msg})
                }
                callback(null, response);
            })
        }],
        createCredentials: ['createEmployee', function(callback, data) {
            var credentials = {
                client_type: 'employee',
                client_id: data.createEmployee._id,
                email: fields.email,
                password: fields.password,
                status: 'notConfirmed'
            }
            credentialsCntrl.createCredentials(credentials, function(err, response){
                if (err) {
                    return callback({success:false, msg:'[CompanyController createCompany createCredentials] '+err})
                }
                return callback(null, data.createCompany)
            })
        }]
    }, function  (err, response) {
    	if(err) {
            return res.json(err);
        }
        return res.json({success:true, status: 200});
    });
}


var Fields = {
    createEmployee: {
        allowed: [
            'firstName',
            'lastName',
            'email',
            'password'
        ],
        required: [
            'firstName',
            'lastName',
            'email',
            'password'
        ]
    }
}



