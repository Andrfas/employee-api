var sinon = require('sinon');
var assert = require('assert');
var requestsDB = require('../../../api/services/requestsDB.js');

describe("api/EmployeeModel", function(){ 
    describe('Successful scenario.', function(){
        it("Should create employee with name and description directly in db", function(done){   
                requestsDB.create('Employee', testData.employee, function(err, res){
                    // console.log(res)
                    assert.strictEqual(err, null);
                    assert.equal(res.name, testData.employee.name); 
                    assert.equal(res.lastName, testData.employee.lastName); 
                    done();
                    })  
        });
    })
})

var testData = {
    employee: {
        firstName: "Lolka",
        lastName: "Ivan",
        email: "lolka@gmail.com",
        password: "12345"    
    }
}