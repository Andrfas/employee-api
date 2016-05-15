/**
 * EmployeeController
 *
 * @description :: Server-side logic for managing employees
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var db = require('../../libs/mongoose.js');
var mongoose = require('mongoose');
var CommonFunctions = require('../../api/services/CommonFunctions.js');
var _ = require('lodash');
var async = require('async');
var requestsDB = require('../../api/services/requestsDB.js');
var credentialsCntrl = require('../../api/controllers/CredentialsController.js');
var mailingCntrl = require('../../api/controllers/MailingController.js');

module.exports = {
	createEmployee: createEmployee,
    getEmployee: getEmployee,
    getEmployees: getEmployees,
    editEmployee: editEmployee
}

function createEmployee (req, res) {
    var fields = _.pick(req.body, Fields.createEmployee.allowed);
	var reqFieldsPresent = CommonFunctions.areKeysInObj(Fields.createEmployee.required, fields);
    if(reqFieldsPresent) {
        if(typeof fields.fbId !== 'undefined') {
            if(typeof fields.password === 'undefined') {
                reqFieldsPresent = false;
            }
        }
    }
    if(reqFieldsPresent !== true) {
        return res.json({success:false, msg:'[EmployeeController createEmployee] Missed required field: '+reqFieldsPresent})
    }
    
    var employee = _.cloneDeep(fields)
    delete employee.email 
    delete employee.password
    employee.availability = true;
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
                status: 'notConfirmed'
            }
            if(typeof fields.fbId !== 'undefined') {
                credentials['fb_user_id'] = fields.fbId;
            } else {
                credentials['password'] = fields.password;
            }
            credentialsCntrl.createCredentials(credentials, function(err, response){
                if (err) {
                    return callback({success:false, msg:'[employeeCtrl createEmployee createCredentials] ', err:err})
                }
                return callback(null, data.createCompany)
            })
        }]
    }, function  (err, response) {
    	if(err) {
            sails.log.error(err);
            return res.json(err);
        }
        return res.json({success:true, status: 200});
    });
}

function getEmployee (req, res) {
    if(!req.params.employeeId) {
        return res.json({success:false, msg: 'Employee id is not specified'})
    }

    requestsDB.findOne('Employee', {'_id': req.params.employeeId}, function(err,response){
        if (err) {
            return res.json({success: false, msg:'No employees found with specified id'})
        }
        if (response === null){
            return res.json({success: false, msg: 'No employees found with specified id'})
        }
        return res.json({success:true, data:response});
    })
}


function getEmployees (req, res) {
    var fields = _.pick(req.body, Fields.getEmployees.allowed);

    var page = fields.page;
    var count = fields.count;
    delete fields.page;
    delete fields.count;
    console.log(fields)
    var reqObj = {};
    if (fields.availability.yes && !fields.availability.no){
        reqObj.availability = true
    } else if (!fields.availability.yes && fields.availability.no){
        reqObj.availability = false
    }

    if (fields.selectedCities.length > 0){
        reqObj.currentCity = {}; 
        reqObj.currentCity['$in'] = fields.selectedCities
    } 
    if (fields.selectedSkills.length > 0){
        reqObj.skills = {}; 
        reqObj.skills['$elemMatch'] = {}; 
        reqObj.skills['$elemMatch'].name = fields.selectedSkills
    } 
    if (fields.selectedLanguages.length > 0){
        reqObj.languages = {}; 
        reqObj.languages['$in'] = fields.selectedLanguages
    } 
    db['Employee'].find(reqObj).skip((page-1)*count).limit(count).exec(function(err, response){
        if (err) {
            res.json({success:false, msg:'[Employee] find error'})
            return;
        }
        return res.json({success:true, data:response})
    })
}


function editEmployee (req, res){
    if(!req.params.employeeId) {
        return res.json({success:false, msg: 'Employee id is not specified'})
    }
    console.log(req.body);
    requestsDB.findOne('Employee', {'_id': req.params.employeeId}, function(err,response){
        if (err) {
            return res.json({success: false, msg:'No employees found with specified id'})
        }
        if (response === null){
            return res.json({success: false, msg: 'No employees found with specified id'})
        }
        for (var i in req.body){
            response[i] = req.body[i]
        }
        response.save(function(err, res){
            console.log(err)
            console.log(res)
        })
        return res.json({success:true, data:response});
    })
    // requestsDB.update('Employee', {'_id': req.params.employeeId}, req.body, function(err, response){
    //     console.log(response)
    //     if (err) {
    //         return res.json({success: false, msg:'No employees found with specified id'})
    //     }
    //     if (response === null){
    //         return res.json({success: false, msg: 'No employees found with specified id'})
    //     }
        
    //     return res.json({success: true, data: response})

    // })
}


var Fields = {
    createEmployee: {
        allowed: [
            'firstName',
            'lastName',
            'email',
            'password',
            'birthDate',
            'fbId',
            'currentCity',
            'availability',
            'languages',
            'image'
        ],
        required: [
            'firstName',
            'lastName',
            'email',
            'birthDate',
            // 'currentCity'
        ]
    },
    getEmployees: {
        allowed: [
            'count',
            'page',
            'availability',
            'selectedCities',
            'selectedSkills',
            'selectedLanguages'
        ],
        required: [
            'count',
            'page'
        ]
    }
}



