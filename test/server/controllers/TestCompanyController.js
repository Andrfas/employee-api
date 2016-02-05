var company = require('../../../api/controllers/CompanyController.js');

var sinon = require('sinon');
var assert = require('assert');
var requestsDB = require('../../../api/services/requestsDB.js');

describe("api/CompanyController", function(){ 

    describe('Successful scenario.', function(){

            it("Should create company with name and description", function(done){   

                var ok = sinon.spy(cb);
                var json = sinon.spy(cb);               
                company.createCompany({body:testData.company}, {ok:ok, json:json});
                function cb() { 
                    if(json.called) {
                        console.error(json.args);
                    }
                    assert(!json.called);
                    assert(ok.called); 
                    assert(ok.calledWith({status: 200}));
                    done();
                }           
            });
    });
});

var testData = {
    company: {
        name: "MaxCorp",
        description: "The best company in the world",
        email: "andrfas@gmail.com",
        password: "testtest"    
    }
}