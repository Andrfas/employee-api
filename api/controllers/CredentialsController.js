var db = require('../../libs/mongoose.js');
var CommonFunctions = require('../../api/services/CommonFunctions.js');
var requestsDB = require('../../api/services/requestsDB.js');

module.exports = {
    createCredentials: createCredentials,
    confirmEmail: confirmEmail
}

function createCredentials (obj, callback){
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

function confirmEmail(req, res){
    var toFind = {
        client_type: req.param('clientType'),
        client_id: req.param('clientId')
    }
    var toUpd = {
        status: 'notActivated' 
    }
    requestsDB.update('Credentials', toFind, toUpd, function(err,result){
        if (err){
            return res.redirect('500')
        }
            return res.redirect('/#/confirmed')            
        })
}

var reqFields = {
    createCredentials: [
        'client_type',
        'client_id',
        'email',
        'password',
        'status'
    ]
}

