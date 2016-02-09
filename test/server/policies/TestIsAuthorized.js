var sinon = require('sinon');
var assert = require('assert');
var requestsDB = require('../../../api/services/requestsDB.js');
var isAuthorized = require('../../../api/policies/isAuthorized.js');
var credentialsCntrl = require('../../../api/controllers/CredentialsController.js');
var authorizationCntrl = require('../../../api/controllers/AuthorizationController.js');

describe('/api/policies/isAuthorized', function() {
    var credentials;
    before(function(done) {
        credentialsCntrl.createCredentials(testData.credentials, function(err, res) {
            if(err) {
                return done(err);
            }
            credentials = res;
            done();
        })

    })
    // describe.skip('status is notConfirmed', function() {
    //     it('should return forbidden', function(done) {
    //         // isAuthorized.
    //     })
    // })
    describe('token is valid', function(){
        it('should pass request farther', function(done) {
            var forbidden = sinon.spy(cb);
            var json = sinon.spy(cb);
            var next = sinon.spy(cb);
            isAuthorized(testData.validReq, {json:json, forbidden:forbidden}, next);
            function cb() {
                assert(!json.called);
                assert(!forbidden.called);
                assert(next.called);
                done();
            }
        })
        it('should update last_activity', function(done) {
            var forbidden = sinon.spy(cb);
            var json = sinon.spy(cb);
            var next = sinon.spy(cb);
            isAuthorized(testData.validReq, {json:json, forbidden:forbidden}, next);
            function cb() {
                assert(!json.called);
                assert(!forbidden.called);
                assert(next.called);
                requestsDB.findOne('Credentials', {token:testData.credentials.token}, function(err, res) {
                    assert.notEqual(testData.credentials.last_activity, res.last_activity)
                    done();
                })
                
            }
        })
    })
    describe('token is expired', function(){
        it('should return forbidden', function(done) {
            var expiredDate = new Date(testData.credentials.last_activity);
            expiredDate.setDate(expiredDate.getDate()-1);
            expiredDate.setHours(expiredDate.getHours()-1);

            requestsDB.update('Credentials', {token:testData.credentials.token}, {last_activity:expiredDate}, function(err, res) {
                
                var forbidden = sinon.spy(cb);
                var json = sinon.spy(cb);
                var next = sinon.spy(cb);
                isAuthorized(testData.validReq, {json:json, forbidden:forbidden}, next);
                function cb() {
                    assert(!json.called);
                    assert(forbidden.called);
                    assert(!next.called);
                    done();                    
                }
                
            })
        })
    })
    describe('no such token in db', function(){
        it('should return forbidden', function(done) {
            var forbidden = sinon.spy(cb);
            var json = sinon.spy(cb);
            var next = sinon.spy(cb);
            isAuthorized(testData.invalidReq, {json:json, forbidden:forbidden}, next);
            function cb() {
                assert(!json.called);
                assert(forbidden.called);
                assert(!next.called);
                done();
            }
        })
    })
})

var testData = {
    credentials: {
        'client_id': 1,
        'client_type': 'company',
        token: 'HJGd0789adsg0SAD0asd08ygasd0qdadganakjfdfash',
        last_activity: new Date(),
        'email': 'kdkdsajfsd@vzcvxcv.su',
        'password': 'Ahskd3445429',
        'status': 'notActivated'// | confirmed
    },
    validReq: {
        headers:{
            authorization: 'HJGd0789adsg0SAD0asd08ygasd0qdadganakjfdfash'
        }
    },
    invalidReq: {
        headers:{
            authorization: 'ssssssssssssssssssssssssssssssssssssssssssss'
        }
    }
}