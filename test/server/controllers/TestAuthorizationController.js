var sinon = require('sinon');
var assert = require('assert');
var async = require('async');
var _ = require('lodash');
var authorizationCntrl = require('../../../api/controllers/AuthorizationController.js');
var companyCntrl = require('../../../api/controllers/CompanyController.js');
var credentialsCntrl = require('../../../api/controllers/CredentialsController.js');
var requestsDB = require('../../../api/services/requestsDB.js');


var testData = {
    credentials: [
        {
            'client_id':1,
            'client_type':'company',
            'email':'1dofhbnsdghsd@sajhdfjv.su',
            'password':'1JHg3h3h4gjhvl4',
            'status':'notActivated'
        },{
            'client_id':2,
            'client_type':'employee',
            'email':'2dofhbnsdghsd@sajhdfjv.su',
            'password':'2JHg3h3h4gjhvl4',
            'status':'notActivated'
        }
    ]
}

// describe('api/controllers/AuthorizationController', function() {
//     describe('signIn', function() {
//         before(function(done) {
//             async.auto({
//                 createCompanyCredentials: function(callback) {
//                     credentialsCntrl.createCredentials(testData.credentials[0], function(err, res) {
//                         if(err) {
//                             return callback(err);
//                         }                
//                         callback(null, res)
//                     })
//                 },
//                 createEmployeeCredentials: function(callback) {
//                     credentialsCntrl.createCredentials(testData.credentials[1], function(err, res) {
//                         if(err) {
//                             return callback(err);
//                         }                
//                         callback(null, res)
//                     })
//                 }
//             }, function(err, res) {
//                 if(err) {
//                     return done(err);
//                 }
//                 done();
//             })
            
//         })
//         testData.credentials.forEach(function(cred) {
//             it('should return error if there is no user with specified email', function(done) {
//                 var reqObj = _.cloneDeep(cred);
//                 reqObj.email = 'asd@asd.ua';
//                 var ok = sinon.spy(cb);
//                 var json = sinon.spy(cb);
//                 authorizationCntrl.signIn({body:reqObj}, {json:json, ok:ok});

//                 function cb() {
//                     assert(!ok.called);
//                     assert(json.called);// TODO check errror statuts
//                     done();
//                 }
//             })
//             it('should return error if password is not valid', function(done) {
//                 var reqObj = _.cloneDeep(cred);
//                 reqObj.password = '12345678';
//                 var ok = sinon.spy(cb);
//                 var json = sinon.spy(cb);
//                 authorizationCntrl.signIn({body:reqObj}, {json:json, ok:ok});

//                 function cb() {
//                     assert(!ok.called);
//                     assert(json.called);// TODO check errror statuts
//                     done();
//                 }

//             })
//             it('should return authorization data', function(done) {
//                 var ok = sinon.spy(cb);
//                 var json = sinon.spy(cb);
//                 authorizationCntrl.signIn({body:cred}, {json:json, ok:ok});

//                 function cb() {
//                     assert(ok.called);
//                     // console.log(ok.args);
//                     assert(!!ok.args[0][0].token);
//                     assert(!!ok.args[0][0].client_id);
//                     assert.equal(ok.args[0][0].client_id, cred.client_id);
//                     assert.equal(ok.args[0][0].client_type, cred.client_type);
//                     assert(!json.called);
//                     done();
//                 }
//             })
//             it('should save token into credentials model', function(done) {
//                 var ok = sinon.spy(cb);
//                 var json = sinon.spy(cb);
//                 authorizationCntrl.signIn({body:cred}, {json:json, ok:ok});

//                 function cb() {
//                     assert(!json.called);
//                     assert(ok.called);
//                     requestsDB.findOne('Credentials', {email: cred.email}, function(err,response){
//                         assert.equal(err, null);
//                         assert.notEqual(response, null);
//                         assert.equal(response.token, ok.args[0][0].token);
//                         done();
//                     })
//                 }
//             })
//         })
        
//     })
// })
