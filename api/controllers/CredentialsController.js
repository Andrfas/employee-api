var db = require('../../libs/mongoose.js');
var CommonFunctions = require('../../api/services/CommonFunctions.js');
var requestsDB = require('../../api/services/requestsDB.js');

module.exports = {
    createCredentials: createCredentials,
    confirmEmail: confirmEmail,
    getCredentialsByToken: getCredentialsByToken
}

function createCredentials (obj, callback){
        var reqFieldsPresent = CommonFunctions.areKeysInObj(reqFields.createCredentials, obj);
        if(reqFieldsPresent !== true) {
            return callback({msg:'[CompanyController createCompany] Missed required field: '+reqFieldsPresent})
        }
        var dbModel = new db.Credentials(obj);
        if(typeof dbModel.password !== 'undefined') {
            dbModel.password = dbModel.getCrypted(obj.password);
        }
        dbModel.save(function(err, res){
            if (err || res === null) {
                return callback({msg:'[CredentialsCntrl createCredentials] creating error: '+ err})
            }
            callback(null, res)
        })
    }

function confirmEmail(req, res){

    if (!req.param('clientType') || !req.param('clientId')) {
        return res.badRequest({message: 'clientType, clientId param is required.'});
    }

    var toFind = {
        client_type: req.param('clientType'),
        client_id: req.param('clientId')
    }
    var toUpd = {
        $set:{status: 'notActivated'} 
    }
    var options = { multi: true };
    requestsDB.update('Credentials', toFind, toUpd, { multi: true },  function(err,result){
        if (err){
            return res.redirect('500');
        } else if(result.nModified !== 1) {
            return res.redirect('500');
        }
            return res.redirect('/#/confirmed')            
        })
}

// not tested functionality
function getCredentialsByToken (token) {
    requestsDB.findOne('Credentials', {'token': token}, function(err,response){
        if (err || response == null) {
            return null;
        }
        return response;
    })
}

var reqFields = {
    createCredentials: [
        'client_type',
        'client_id',
        'email',
        'status'
    ]
}

