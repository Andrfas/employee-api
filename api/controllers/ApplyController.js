var requestsDB = require('../../api/services/requestsDB.js');
var db = require('../../libs/mongoose.js');
var _ = require('lodash');
var async = require('async');

module.exports = {
	createApply: createApply,
	getApplicatns: getApplicatns
}

function createApply (req, res) {
	if (!req.param('employeeId') || !req.param('letter') || !req.param('advertId'))
        return res.badRequest({message: 'employeeId, letter, advertId param is undefined'});
    requestsDB.create('Messages', {employee_id: req.param('employeeId'), proposal_id: req.param('advertId'), letter: req.param('letter')}, function(err, response) {
	    if (err) {
	        return res.badRequest(err);
	    }
	    if (response) {
	    	res.ok();
	    }
	})
}

function getApplicatns (req, res) {
	if (!req.param('proposal_id') )
        return res.badRequest({message: 'proposal_id param is undefined'});

    //async.waterfall
    requestsDB.find('Message', {proposal_id: req.param('proposal_id')}, function (err, found) {
    	if (err) {
    		res.badRequest(err);
    	}
    	res.ok(found);
    });
}