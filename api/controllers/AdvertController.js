var requestsDB = require('../../api/services/requestsDB.js');
var _ = require('lodash');
var async = require('async');
var CommonFunctions = require('../../api/services/CommonFunctions.js');

module.exports = {
	createAdvert: createAdvert
}

function createAdvert (req, res) {
    var reqFieldsPresent = CommonFunctions.areKeysInObj(reqFields.createAdvert, req.body);
    if(reqFieldsPresent !== true) {
        return res.json({success:false, data:{status:1, msg:reqFieldsPresent+' is missing'}})})
    }

    async.waterfall([
        function (callback) {
            var findCriteria = {
                _id: req.body.company
            }
            requestsDB.findOne('Company', findCriteria, function(err,response){
                if (err) {
                    return res.json({success:false, data:{status:500, msg:'Error while finding company document'}})
                }
                if (response === null) {
                    return res.json({success:false, data:{status:1, msg:'Company with such id is not found.'}})
                }
            callback(null, response);
            })
        },
        function  (company, callback) {
            var advert = _.cloneDeep(req.body);
            advert.companyName = company.name;
            requestsDB.create('Advert', advert, function(err,response) {
                if (err) {
                    return res.json({success:false, data:{status:500, msg:'Error while creating company document'}})
                }
                if (response === null) {
                    return res.json({success:false, data:{status:1, msg:'Company not created'}})
                }
                callback(response);
            });
        }], function  (argument) {
        return res.json({
            success:true, 
            data:{
                status: 200
            }
        });
    });
}

// fields, that are required for request. Should be for each function, and should have the same name
var reqFields = {
    createAdvert: [
        'company',
        'category',
        'subcategory',
        'title',
        'description',
        'short_description',
        'skills',
        'city',
        'isActive',
        'hoursPerWeek',
        'paid',
        'emplType',
        'dateSelEnd',
        'submitted'
    ]
}
