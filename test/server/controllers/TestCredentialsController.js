var sinon = require('sinon');
var assert = require('assert');
var credentialsCntrl = require('../../../api/controllers/CredentialsController.js');
var requestsDB = require('../../../api/services/requestsDB.js')

var testData = {
    credentials: [{
        'client_id':1,
        'client_type':'company',
        'email': 'mponsfagnbud@fgbosn.su',
        'password': 'aASd2fdsf4a3',
        'status':'notConfirmed'
    }, {
        'client_id':2,
        'client_type':'employee',
        'email': '2mponsfagnbud@fgbosn.su',
        'password': '2aASd2fdsf4a3',
        'status':'notConfirmed'
    }]
};

describe('api/controllers/CredentialsController', function() {
    describe('createCredentials', function() {
        testData.credentials.forEach(function(cred) {
            it('should create credentials', function(done) {
                credentialsCntrl.createCredentials(cred, function(err, res) {
                    assert.equal(err, null);
                    assert.notEqual(res, null);
                    assert.equal(res.client_id, cred.client_id);
                    assert.equal(res.client_type, cred.client_type);
                    assert.equal(res.email, cred.email);
                    assert.notEqual(res.password, null);
                    assert.notEqual(res.password, '');
                    assert.notEqual(res.password, cred.password);
                    done();
                })
            })
        })
        
    })

    describe('confirmEmail', function() {
        testData.credentials.forEach(function(cred) {
            it('should confirm email', function(done) {
                var req = {
                    param: function(param) {
                            var obj = {
                                clientType: cred.client_type,
                                clientId: cred.client_id
                                };
                            return obj[param];
                        }
                }
                var res = {
                    redirect: sinon.spy(cb)
                }
                credentialsCntrl.confirmEmail(req, res)
                function cb(){
                    assert(res.redirect.called);
                    assert.notEqual(res.redirect.args[0][0], '500');
                    requestsDB.findOne('Credentials', {email: cred.email}, function(err, result){
                        assert.equal(err, null);
                        console.log(result);
                        assert.equal('notActivated', result.status)
                        done()
                    })
                }
            })
        })      
    })
})