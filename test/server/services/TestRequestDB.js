var sinon = require('sinon');
var assert = require('assert');
var requestsDB = require('../../../api/services/requestsDB.js');

describe('/api/service/requestDB.js', function(){
    describe('Successful scenario', function() {
        it('Should create record', function(done){
            requestsDB.create('testCollection', testData.create, function(err, res) {
                assert.strictEqual(err, null);
                assert.notEqual(res, null);
                assert.equal(res.nonRequiredStr, testData.create.nonRequiredStr)
                assert.equal(res.requiredStr, testData.create.requiredStr)
                done();
            })
        })
        it('Should find records', function(done){
            requestsDB.find('testCollection', {}, function(err, res) {
                assert.strictEqual(err, null);
                assert.notEqual(res, null);
                assert.equal(res.length, 1);
                done();
            })
        })
        it('Should findOne record', function(done){
            requestsDB.findOne('testCollection', {}, function(err, res) {
                assert.strictEqual(err, null);
                assert.notEqual(res, null);
                assert.equal(res.nonRequiredStr, testData.create.nonRequiredStr)
                assert.equal(res.requiredStr, testData.create.requiredStr)
                done();
            })
        })
        it('Should update record', function(done){
            requestsDB.update('testCollection', testData.create, testData.update, function(err, res) {
                assert.strictEqual(err, null);
                assert.notEqual(res, null);
                assert.equal(res.ok, 1);
                done();
            })
        })
    })
})

var testData = {
    create: {
        nonRequiredStr:'lorem ipsum',
        requiredStr:'lorem ipsum data'
    },
    update: {
        nonRequiredStr:'lorem ipsum_updated',
        requiredStr:'lorem ipsum data_updated'
    }
}