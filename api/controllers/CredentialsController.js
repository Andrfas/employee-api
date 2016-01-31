var db = require('../../libs/mongoose.js');
var CommonFunctions = require('../../api/services/CommonFunctions.js');


module.exports = {
    createCredentials: function(obj, callback){
        var reqFieldsPresent = CommonFunctions.areKeysInObj(reqFields.createCredentials, obj);
        if(reqFieldsPresent !== true) {
            return callback({status: 400, msg:'[CompanyController createCompany] Missed required field: '+reqFieldsPresent})
        }
        var dbModel = new db.Credentials(obj)
        dbModel.password = dbModel.getCrypted(obj.password)
        dbModel.save(function(err, res){
            if (err || res === null) {
                return callback({status: 400, msg:'[requestsDB service] createPass error'})
            }
            callback(null, res)
        })
    }
}

var reqFields = {
    createCredentials: [
        'company_id',
        'email',
        'password',
        'status'
    ]
}

