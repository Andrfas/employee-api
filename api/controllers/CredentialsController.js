var db = require('../../libs/mongoose.js');
var CommonFunctions = require('../../api/services/CommonFunctions.js');


module.exports = {
    createCredentials: function(obj, callback){
        var reqFieldsPresent = CommonFunctions.areKeysInObj(reqFields.createCredentials, obj);
        if(reqFieldsPresent !== true) {
            return callback({msg:'[CompanyController createCompany] Missed required field: '+reqFieldsPresent})
        }
        var dbModel = new db.Credentials(obj)
        dbModel.password = dbModel.getCrypted(obj.password)
        dbModel.save(function(err, res){
            if (err || res === null) {
                return callback({msg:'[CredentialsCntrl createCredentials] creating error: '+ err})
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

