var db = require('../../libs/mongoose.js');

module.exports = {
    
    create: function(model, obj, callback) {
    	db[model].create(obj, function(err, res){
    		if (err || res === null) {
    			callback({status: 400, msg:'[requestsDB service] create error'})
    			return;
    		}
    		callback(res)
    	})
    },
    find: function(model, obj, callback) {
    	db[model].find(obj, function(err, res){
    		if (err || res === null) {
    			callback({status: 400, msg:'[requestsDB service] find error'})
    			return;
    		}
    		callback(res)
    	})
    },
    findOne: function(model, obj, callback) {
    	db[model].findOne(obj, function(err, res){

    		if (err || res === null) {
    			callback({status: 400, msg:'[requestsDB service] findOne error'})
    			return;
    		}
    		callback(res)
    	})
    },
    update: function(model, searchFields, updateFields, callback) {
    	db[model].update(searchFields, updateFields, function(err, res){
    		if (err || res === null) {
    			callback({status: 400, msg:'[requestsDB service] update error'})
    			return;
    		}

    		callback(res)
    	})
    }
}