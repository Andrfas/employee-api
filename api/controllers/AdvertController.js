var requestsDB = require('../../api/services/requestsDB.js');
var db = require('../../libs/mongoose.js');
var _ = require('lodash');
var async = require('async');
var CommonFunctions = require('../../api/services/CommonFunctions.js');

module.exports = {
	createAdvert: createAdvert,
    getAdverts: getAdverts,
    getAdvert: getAdvert
}

function createAdvert (req, res) {
    var reqFieldsPresent = CommonFunctions.areKeysInObj(reqFields.createAdvert, req.body);
    if(reqFieldsPresent !== true) {
        sails.log.error({status:1, msg:reqFieldsPresent+' is missing'});
        return res.json({success:false, data:{status:1, msg:reqFieldsPresent+' is missing'}})
    }

    var advert = _.cloneDeep(req.body);

    async.auto({
        getNewSkills: function(cb) {
            var newSkills = [];
            console.log(req.body.skills);
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
                requestsDB.findOne('Skill', {name: skill}, function (err, skill) {
                    if (skill === null) {
                        requestsDB.create('Skill', {name: skill}, function(err, response) {
                            if (err) {
                                return callb(err);
                            }
                            return callb();
                        })
                    }
                    return callb();
                });

            }, function(err) {
                if(err) {
                    sails.log.error(err);
                    return cb(err);
                }
                cb(null);
            })
        }],
        setSkillsArr: function(cb) {
            var skills = [];
            for (var i = 0, x = advert.skills.length; i < x; i++) {
                skills.push(advert.skills[i].name);
            };
            advert.skills = skills;
            return cb(null, skills);
        },
        getCompanyInfo: function (cb) {
            var findCriteria = {
                _id: req.body.company
            }
            requestsDB.findOne('Company', findCriteria, function(err,response){
                if (err) {
                    sails.log.error(err);
                    return res.json({success:false, data:{status:500, msg:'Error while finding company document'}})
                }
                if (response === null) {
                    return res.json({success:false, data:{status:1, msg:'Company with such id is not found.'}})
                }
                var company = response;
            return cb(null, company);
            });
        },
        createAdvert: ['setSkillsArr','getCompanyInfo', function(cb, results) {
            advert.companyName = results.getCompanyInfo.name;
            requestsDB.create('Advert', advert, function(err, advert) {
                if (err) {
                    sails.log.error(err);
                    return res.json({success:false, data:{status:500, msg:'Error while creating advert document'}})
                }
                if (advert === null) {
                    return res.json({success:false, data:{status:1, msg:'Advert not created'}})
                }
                cb(null, advert);
            })
        }]
    }, function(err, data) {
        if(err) {
            return res.json({success:false, msg: err})
        }
        return res.json({success:true, advertId: data.createAdvert.id})
    })   
}

function getAdverts(req, res) {
    var fields = _.pick(req.body, Fields.getAdverts.allowed);
    var reqFieldsPresent = CommonFunctions.areKeysInObj(Fields.getAdverts.required, fields);
    if(reqFieldsPresent !== true) {
        return res.json({success:false, msg:'[AdvertController getAdverts] Missed required field: '+reqFieldsPresent})
    }

    var page = fields.page;
    var count = fields.count;
    delete fields.page;
    delete fields.count;

    fields = _.forOwn(fields, function(value, key) {
        switch(key) {
            case 'cities':
            case 'skills':
            case 'paid':
            case 'needPay':
            case 'emplType':
            case 'hoursPerWeek':
            case 'subcategory':
                if(value.length == 0) {
                    delete fields[key];
                } else {
                    fields[key] = {$in:value};
                }
        }
    })
    console.log(fields);
    db['Advert'].find(fields).skip((page-1)*count).limit(count).exec(function(err, response){
        if (err) {
            res.json({success:false, msg:'[requestsDB service] find error'})
            return;
        }
        return res.json({success:true, data:response})
    })
}

function getAdvert (req, res) {
    if(!req.params.advertId) {
        return res.json({success:false, msg: 'Advert id is not specified'})
    }

    async.waterfall([
        function (callback) {
            requestsDB.findOne('Advert', {'_id': req.params.advertId}, function(err, response) {
                if (err) {
                    return callback(err);
                }
                sails.log(response);
                if (response === null){
                    return callback({msg: 'No adverts found with specified id'});
                }
                    sails.log(response);
                callback(null, response);
            })
        },
        function (data, callback) {
            if (data.company) {
                requestsDB.findOne('Company', {'_id': data.company}, function (err, company) {
                    if (err) {
                        return callback(err);
                    }
                    if (company === null) {
                        return callback({ msg: 'No company found with specified id'});
                    }
                    var newData = JSON.parse(JSON.stringify(data));
                    newData['company'] = company;
                    callback(null, newData);
                });
            }
        }],
    function (err, data) {
        if (err) {
            return res.badRequest(err);
        }

        if (data === null) {
            return res.badRequest({message: 'data is null, check getAdvert'});
        }
        sails.log(data)
        res.json({success: true, data: data});
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
        'skills',
        'cities',
        'hoursPerWeek',
        'paid',
        'needPay',
        'emplType',
        'dateSelEnd'
    ]
}

var Fields = {
    getAdverts: {
        allowed: [
            'count',
            'page',
            'company',
            'subcategory',
            'hoursPerWeek',
            'paid',
            'needPay',
            'emplType',
            'cities',
            'skills'
        ],
        required: [
            'count',
            'page'
        ]
    }
}
