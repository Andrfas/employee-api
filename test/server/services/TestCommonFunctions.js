var sinon = require('sinon');
var assert = require('assert');
var commonFuncs = require('../../../api/services/CommonFunctions.js');

describe('api/service/CommonFunctions', function() {
    describe('areKeysInObj', function() {
        it('should return true if all keys present in obj', function(done) {
            var res = commonFuncs.areKeysInObj(testData.keys, testData.obj1);
            assert.equal(res, true);
            done();
        })
        it('should return missed key', function(done) {
            var res = commonFuncs.areKeysInObj(testData.keys, testData.obj2);
            assert.equal(res, 'c');
            done();
        })
    })
})

var testData = {
    keys: ['a', 'b', 'c'],
    obj1: {a:true, b:false, c:undefined},
    obj2: {a:true, b:false}
}