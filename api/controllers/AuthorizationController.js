var requestsDB = require('../../api/services/requestsDB.js')
var CommonFunctions = require('../../api/services/CommonFunctions.js')
var async = require('async')
var db = require('../../libs/mongoose.js');

module.exports = {
    signIn: signIn,
    signOut: signOut
}

function signIn(req, res){
	var reqFieldsPresent = CommonFunctions.areKeysInObj(reqFields.signIn, req.body);
    if(reqFieldsPresent !== true) {
        return res.json({status: 400, msg:'[AuthorizationController signIn] Missed required field: '+reqFieldsPresent})
    }

 	async.waterfall([
        function(callback) {
        	var findCriteria = {
        		email: req.body.email
        	}
   			requestsDB.findOne('Credentials', findCriteria, function(response){
                if (response.status) {
                    return res.json({status:response.status, msg:'[AuthorizationController signIn] '+response.msg})
                }
            callback(null, response);
            })
        },
        function(user, callback) {

        	var dbModel = new db.Credentials(user)
        	if (!dbModel.validPass(req.body.password)){
        		return res.json({status:400, msg:'[AuthorizationController signIn] Invalid password'})
        	}
   			
            callback(null, user);
        },
        function(user, callback) {

        	generateToken(function(res){
        		var token = res;

            	callback(null, user, token);
        	});
        },
        function(user, token, callback) {

            var searchFields = {
                _id: user._id
            }

            var updateFields = {
                token: token,
                last_activity: new Date()
            }

            requestsDB.update('Credentials', searchFields, updateFields, function(response){
                if (response.status) {
                    return res.json({status:response.status, msg:'[AuthorizationController signIn] '+response.msg})
                }
                callback(user, token)
            })
        }
    ], function (user, token) {
        return res.ok({
        	status: 200, 
        	token: token, 
        	client_id: user._id,
        	client_type: (user.company_id) ? 'company' : 'employee'
        });
    });

}

function signOut(req, res){

    var searchFields = {
        token: req.headers['authorization']
    }

    var updateFields = {
        token: null
    }

    requestsDB.update('Credentials', searchFields, updateFields, function(response){
        if (response.status) {
            return res.json({status:response.status, msg:'[AuthorizationController signOut] '+response.msg})
        }
        res.ok({status:200})
    })
}

function generateToken(callback){
	require('crypto').randomBytes(48, function(ex, buf) {
	  callback(buf.toString('hex'));
	});
}
// fields, that are required for request. Should be for each function, and should have the same name
var reqFields = {
    signIn: [
        'email',
        'password'
    ]
}