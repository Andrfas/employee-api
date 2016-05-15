var requestsDB = require('../../api/services/requestsDB.js');
var db = require('../../libs/mongoose.js');
var _ = require('lodash');
var async = require('async');

module.exports = {
	createApply: createApply,
    changeApplicationStatus: changeApplicationStatus,
	getApplicatns: getApplicatns,

}

function createApply (req, res) {
    if (!req.param('employeeId') || !req.param('letter') || !req.param('advertId'))
        return res.badRequest({message: 'employeeId, letter, advertId param is undefined'});
    requestsDB.create('Messages', {employee_id: req.param('employeeId'), 
        proposal_id: req.param('advertId'), letter: req.param('letter'),
        advertTitle: req.param('advertTitle'), companyName: req.param('companyName')}, function(err, response) {
        if (err) {
            return res.badRequest(err);
        }
        res.json({status:200});
    })
}

function changeApplicationStatus (req, res) {
	if (!req.body.applicationId || !req.body.status)
        return res.badRequest({message: 'applicationId, status param is undefined'});
    requestsDB.update('Messages', {'_id': req.body.applicationId}, {status: req.body.status}, {}, function(err, response) {
	    if (err) {
	        return res.badRequest(err);
	    }
	    res.json({data:response});
	})
}

function getApplicatns (req, res) {
	if (!req.params.advertId )
        return res.badRequest({message: 'proposal_id param is undefined'});
    var employies = [];

    async.waterfall([
    	function (callback) {
    		requestsDB.find('Messages', {proposal_id: req.params.advertId, status:null}, function (err, found) {
		    	if (err) {
		    		callback(err);
		    	}
		    	callback(null, found);
    		});
    	},
    	function (array, callback) {
    		async.eachLimit(array, 1, function(apply, callb) {
                requestsDB.findOne('Employee', {'_id':  apply.employee_id}, function(err, response){
			        if (err) {
			            return callb(err);
			        }
			        if (response !== null){
				        var obj = {
                            application:apply,
                            employee: response,
				        	_id: response._id,
				        	firstName: response.firstName,
				        	lastName: response.lastName,
				        	letter: apply.letter
				        }
				        employies.push(obj);
				        return callb(null);
			    	} else callb(null);
			    })
          	}, function(err) {
                if(err) {
                    sails.log.error(err);
                    return callback(err);
                }
                callback(null, employies);
            })
    	}],
    function (err, arrayOfEmployyes) {
    	if (err) {
    		return res.badRequest(err);
    	}
    	res.json(arrayOfEmployyes);

    });
    
}