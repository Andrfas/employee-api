var sinon = require('sinon');
var assert = require('assert');
var requestsDB = require('../../../api/services/requestsDB.js');

describe("api/CompanyModel", function(){ 
        it("Should create company with name and description directly in db", function(done){   
                requestsDB.create('Company', testData.company, function(err, res){
                    // console.log(res)
                    assert.strictEqual(err, null);
                    assert.equal(res.name, testData.company.name); 
                    assert.equal(res.description, testData.company.description); 
                    done();
                    })  
        });
})

var testData = {
    company: {
        name: "MaxCorp",
        description: "The best company in the world",
        email: "andrfas@gmail.com",
        password: "testtest"    
    }
}