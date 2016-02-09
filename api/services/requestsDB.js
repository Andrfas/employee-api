var db = require('../../libs/mongoose.js');

module.exports = {
    
    create: function(model, obj, callback) {
    	db[model].create(obj, function(err, res){
    		if (err) {
    			callback({msg:'[requestsDB service] create error'})
    			return;
    		}
    		callback(null,res)
    	})
    },
    find: function(model, obj, callback) {
    	db[model].find(obj, function(err, res){
    		if (err) {
    			callback({msg:'[requestsDB service] find error'})
    			return;
    		}
    		callback(null,res)
    	})
    },
    findOne: function(model, obj, callback) {
    	db[model].findOne(obj, function(err, res){

    		if (err) {
    			callback({msg:'[requestsDB service] findOne error'})
    			return;
    		}
    		callback(null,res)
    	})
    },
    update: function(model, searchFields, updateFields, options, callback) {
    	db[model].update(searchFields, updateFields, options, function(err, res){
    		if (err) {
    			callback({msg:'[requestsDB service] update error'})
    			return;
    		}

    		callback(null,res)
    	})
    }
}