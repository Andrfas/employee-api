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
        return res.json({msg:'[AdvertController createAdvert] Missed required field: '+reqFieldsPresent})
    }

    var advert = _.cloneDeep(req.body)
    
    requestsDB.create('Advert', advert, function(err,response) {
                if (err) {
                    return res.json({msg:'[AdvertController createAdvert] '+err.msg})
                }
                res.json({status: 200});
            })
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
