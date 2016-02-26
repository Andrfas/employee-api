var requestsDB = require('../../api/services/requestsDB.js')
var async = require('async')

module.exports = function(req, res, next) {

    if (req.body.company){

        async.waterfall([
            function(callback) {
                var findCriteria = {
                    client_id: req.body.company
                }
                requestsDB.findOne('Credentials', findCriteria, function(err,response){
                    if (err) {
                        return res.json({success:false, msg: '[isConfirmed policy] Find credentials error'});
                    } else if(response === null) {
                        return res.json({success:false, msg: '[isConfirmed policy] No credentials found'});                        
                    }
                    callback(null, response)
                })
            },
            function(cred, callback) {

                if(cred.status === 'notConfirmed') {
                    return res.json({success:false, msg:'You have not confirmed your account. Please check email for letter with confirmation link'})
                } else {
                    return next();
                }
            }
        ]);
    } else {
        return res.json({success: false, msg: 'No email specified'});
    }

};