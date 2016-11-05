var sinon = require('sinon');
var assert = require('assert');
var requestsDB = require('../../../api/services/requestsDB.js');

// describe("api/AdvertModel", function(){ 
//         it("Should create advert with all needed params directly in db", function(done){   
//                 requestsDB.create('Advert', testData.advert, function(err, res){
//                     assert.strictEqual(err, null);
//                     assert.equal(res.company, testData.advert.company); 
//                     assert.equal(res.category, testData.advert.category); 
//                     done();
//                     })  
//         });
// })

var testData = {
    advert: {
        company: "MaxCorp",
        category: "IT",
        subcategory: "mobile development",
        title: "testtest",    
        description: "testtest",    
        short_description: "testtest",   
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
