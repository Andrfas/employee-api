var db = require('../../libs/mongoose.js');

module.exports = {
    
    create: function(model, obj, callback) {
    	db[model].create(obj, function(err, res){
    		if (err) {
    			callback({status: 400, msg:'[requestsDB service] create error'})
    			return;
    		}

    		callback(res)
    	})
    }
}