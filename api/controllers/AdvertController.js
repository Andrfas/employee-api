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

    var advert = _.cloneDeep(req.body);

    async.auto({
        getNewSkills: function(cb) {
            var newSkills = [];
            req.body.skills.forEach(function(skill) {
                if(skill.isNew) {
                    newSkills.push(skill.name);
                }
            });
            cb(null, newSkills);
        },
        saveNewSkills: ['getNewSkills', function(cb, data) {
            if(data.getNewSkills.length == 0) {
                return cb(null);
            }
            async.each(data.getNewSkills, function(skill, callb) {
                requestsDB.create('Skill', {name:skill}, function(err,response) {
                    if (err) {
                        return callb(err);
                    }
                    callb();
                })
            }, function(err) {
                if(err) {
                    return cb(err);
                }
                cb(null);
            })
        }],
        setSkillsArr: function(cb) {
            var skills = [];
            for (var i = 0; i < advert.skills.length; i++) {
                skills.push(advert.skills[i].name);
            };
            advert.skills = skills;
            return cb(null, skills);
        },
        createAdvert: ['setSkillsArr', function(cb) {
            requestsDB.create('Advert', advert, function(err,response) {
                if (err) {
                    return cb('[AdvertController createAdvert] '+err.msg);
                }
                cb();
            })
        }]
    }, function(err, data) {
        if(err) {
            return res.json({success:false, msg: err})
        }
        return res.json({success:true})
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
        'skills',
        'cities',
        'hoursPerWeek',
        'paid',
        'needPay',
        'emplType',
        'dateSelEnd'
    ]
}
