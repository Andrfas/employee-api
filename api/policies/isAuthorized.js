var requestsDB = require('../../api/services/requestsDB.js')
var async = require('async')

module.exports = function(req, res, next) {

	if (req.headers['authorization']){

		async.waterfall([
	        function(callback) {
				var findCriteria = {
					token : req.headers['authorization']
				}

				requestsDB.findOne('Credentials', findCriteria, function(response){

					if (response.status) {
	                    return res.forbidden('You are not permitted to perform this action. Please, sign in')
	                }
	                callback(response)
				})
	        },
			function(user, callback) {

				if (Math.abs(new Date() - user.last_activity)/(1000*60*60) > 24){
					var searchFields = {
		                _id: user._id
		            }

		            var updateFields = {
		                token: null
		            }

		            requestsDB.update('Credentials', searchFields, updateFields, function(response){
		                if (response.status) {
		                    return res.json({status:response.status, msg:'[Authorization policy] '+response.msg})
		                }
		                return res.forbidden('You are not permitted to perform this action. Please, sign in')
		            })
				} else {
					callback(user)
				}
	        },
	        function(user, callback) {

	            var searchFields = {
	                _id: user._id
	            }

	            var updateFields = {
	                last_activity: new Date()
	            }

	            requestsDB.update('Credentials', searchFields, updateFields, function(response){
	                if (response.status) {
	                    return res.json({status:response.status, msg:'[Authorization policy] '+response.msg})
	                }
	                callback()
	            })
	        }
	    ], function () {
	        return next();
	    });

	} else {
		return res.forbidden('You are not permitted to perform this action. Please, sign in');
	}

};