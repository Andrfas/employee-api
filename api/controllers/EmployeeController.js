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
	var reqFieldsPresent = CommonFunctions.areKeysInObj(reqFields.createEmployee, req.body);
    if(reqFieldsPresent !== true) {
        return callback({msg:'[EmployeeController createEmployee] Missed required field: '+reqFieldsPresent})
    }
    
    var employee = _.cloneDeep(req.body)
    delete employee.email 
    delete employee.password

    async.auto({
    	checkIfEmail: function (callback){
            requestsDB.findOne('Credentials', {email: req.body.email}, function(err,response){
                if (err) {
                    return callback({msg:'[EmployeeController checkIfEmail] '+err.msg})
                }
                if (response != null){
                    return callback({msg: '[EmployeeController checkIfEmail] email already exists'})
                }
                callback();
            })
        },
        createEmployee: ['checkIfEmail', function(callback) {
            requestsDB.create('Employee', employee, function(err,response){
                if (err) {
                    return callback({msg:'[EmployeeController createEmployee] '+err.msg})
                }
            callback(null, response);
            })
        }],
        sendEmail: ['createEmployee', function(callback, data) {
            mailingCntrl.sendConfirmLetter('employee', data.createEmployee._id, req.body.email, function(err, response){
                if(err) {
                    return callback({msg:'[EmployeeController createEmployee sendEmail] '+err.msg})
                }
                callback(null, response);
            })
        }],
        createCredentials: ['createEmployee', function(callback, data) {
            var credentials = {
                client_type: 'employee',
                client_id: data.createEmployee._id,
                email: req.body.email,
                password: req.body.password,
                status: 'notConfirmed'
            }
            credentialsCntrl.createCredentials(credentials, function(err, response){
                if (err) {
                    return callback({msg:'[CompanyController createCompany createCredentials] '+err})
                }
                return callback(null, data.createCompany)
            })
        }]
    }, function  (err, response) {
    	if(err) {
            return res.json(err);
        }
        return res.ok({status: 200});
    });
}

var reqFields = {
    createEmployee: [
        'firstName',
        'lastName'
    ]
}



