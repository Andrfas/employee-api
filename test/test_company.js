var company = require('./../api/controllers/CompanyController.js')
var config = require('./test_company_config.js')
var assert = require('assert')
var requestsDB = require('../api/services/requestsDB.js')

describe("Company Controller Sails", function(){ 

	describe('Successful scenario.', function(){

			it("Should create new company with name and description", function(done){   
			    	requestsDB.create('Company', config.company.body, function(res){
			    		console.log(res)
				    	assert.equal(res.name, config.company.body.name); 
				    	assert.equal(res.description, config.company.body.description); 
				    	done();
				    	})	
		    });

			it("Should create new company with name and description", function(done){   
			    	company.createCompany(config.company, config.res, function(res){
			    		console.log(res)
				    	assert.equal(200, res.status); 
				    	done();
				    	})	
		    });

			it.skip("Should create new company with full info", config.res, function(done){    
			    	company.createCompany(config.companyFull, function(res){
			    		console.log(res)
				    	assert.equal(200, res.status); 
				    	done();
				    	})	
		    });

		describe.skip('Error handling scenario.', function(){
			it("Should throw exception if find without required parameters.", function(done){

			    	lib.getElement('delta', '2016-02-22-10', '2016-02-22-11', null, 'test_config', function(res){
						if (res.status != 400){
							assert.fail("Should return error.");
						} else {
							assert.equal(res.msg, "[getElement function] not enough request params");						
						} 

						done()
			    	})
			});

		});

	});
});
