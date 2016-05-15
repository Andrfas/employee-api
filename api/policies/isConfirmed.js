var requestsDB = require('../../api/services/requestsDB.js')
var async = require('async')

module.exports = function(req, res, next) {

    if (req.body.email){

        async.waterfall([
            function(callback) {
                var findCriteria = {
                    email: req.body.email
                }
                requestsDB.findOne('Credentials', findCriteria, function(err,response){

                    if (err) {
                        return res.json({ success: false, msg: '[isConfirmed policy] Find credentials error'});
                    } else if(response === null) {
                        return res.json({ success: false, msg: '[isConfirmed policy] No credentials found'});                        
                    }
                    callback(null, response)
                })
            },
            function(cred, callback) {

                if(cred.status === 'notConfirmed') {
                    return res.json({ success: false, msg:'You have not confirmed your account. Please check email for letter with confirmation link'})
                } else {
                    return next();
                }
            }
        ]);

    } else if(req.body.fb_user_id) {
        return next();
    }

};