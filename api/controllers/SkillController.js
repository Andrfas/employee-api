var requestsDB = require('../../api/services/requestsDB.js');
var _ = require('lodash');
var async = require('async');
var CommonFunctions = require('../../api/services/CommonFunctions.js');
var db = require('../../libs/mongoose.js');

module.exports = {
    getSkills: getSkills
}

function getSkills(req, res) {
    var name = req.allParams().name;
    if(typeof name === 'undefined') {
        return res.json({success:false, msg:'name of the skill should be specified'})
    }
    db['Skill'].find({name: new RegExp(name, "i")}, 'name', {limit:7}, function(err, response){
        if (err) {
            return res.json({success:false, msg:'[SkillController getSkills] search error: '+err});
        }
        return res.json({success:true, data:response})
    })
}