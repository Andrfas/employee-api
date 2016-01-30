var db = require('../../libs/mongoose.js');

module.exports = {
    
    create: function(model, obj, callback) {
    	db[model].create(obj, function(err, res){
    		if (err) {
    			callback({status: 400, msg:'[requestsDB service] create error: '+err.errmsg})
    			return;
    		}
    		callback(res)
    	})
    },
    find: function(model, obj, callback) {
    	db[model].find(obj, function(err, res){
    		if (err) {
    			callback({status: 400, msg:'[requestsDB service] find error: '+err.errmsg})
    			return;
    		}
    		callback(res)
    	})
    },
    findOne: function(model, obj, callback) {
    	db[model].findOne(obj, function(err, res){
    		if (err) {
    			callback({status: 400, msg:'[requestsDB service] findOne error: '+err.errmsg})
    			return;
    		}
    		callback(res)
    	})
    },
    update: function(model, searchFields, updateFields, callback) {
    	db[model].update(searchFields, updateFields, function(err, res){
    		if (err) {
    			callback({status: 400, msg:'[requestsDB service] update error: '+err.errmsg})
    			return;
    		}

    		callback(res)
    	})
    },
    changePass: function(obj, callback){
        var dbModel = new db.Credentials(obj)
        dbModel.changePass(obj.password)
        dbModel.save(function(err, res){
        	if (err) {
    			callback({status: 400, msg:'[requestsDB service] create error: '+err.errmsg})
    			return;
    		}
        	callback(res)
        })
    }
}