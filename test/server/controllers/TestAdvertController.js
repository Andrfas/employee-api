var advert = require('../../../api/controllers/AdvertController.js');

var sinon = require('sinon');
var assert = require('assert');
var requestsDB = require('../../../api/services/requestsDB.js');

// describe("api/AdvertController", function(){ 

//     describe('createAdvert', function(){
//             it("Should create advert with all params", function(done){   
//                 var json = sinon.spy(cb);               
//                 advert.createAdvert({body:testData.advert}, {json:json});
//                 function cb() { 
//                     assert(json.called);
//                     assert(json.calledWith({status: 200}));
//                     done();
//                 }           
//             });
//             it("Should be error missed field 'company'", function(done){   
//                 var json = sinon.spy(cb);
//                 delete testData.advert.company;                
//                 advert.createAdvert({body:testData.advert}, {json:json});
//                 function cb() { 
//                     assert(json.called);
//                     assert(json.args[0][0].msg);
//                     done();
//                 }           
//             });
//     });
// });

var testData = {
    advert: {
        company: "MaxCorp",
        category: "IT",
        subcategory: "mobile development",
        title: "Number 2",    
        description: "2 description",    
        short_description: "good",   
        skills: "angularjs",    
        city: "kyiv",    
        isActive: "true" ,   
        hoursPerWeek: "30" ,   
        paid: "true",    
        emplType: "hz"  ,  
        dateSelEnd: ""  ,  
        submitted: "true"    
    }
}