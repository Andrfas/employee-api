var employee = require('../../../api/controllers/EmployeeController.js');

var sinon = require('sinon');
var assert = require('assert');
var requestsDB = require('../../../api/services/requestsDB.js');

// describe("api/EmployeeController", function(){ 

//     describe('createEmployee.', function(){

//             it("Should create employee with first name, lastname, languages", function(done){   

//                 var ok = sinon.spy(cb);
//                 var json = sinon.spy(cb);               
//                 employee.createEmployee({body:testData.employee}, {ok:ok, json:json});
//                 function cb() { 
//                     if(json.called) {
//                         console.error(json.args);
//                     }
//                     assert(!json.called);
//                     assert(ok.called); 
//                     assert(ok.calledWith({status: 200}));
//                     done();
//                 }           
//             });
//     });
// });

var testData = {
    employee: {
        firstName: "Anton",
        lastName: "The best tester ever",
        languages: ['en','ua'],
        email: "andas@gmail.com",
        password: "12345"    
    }
}