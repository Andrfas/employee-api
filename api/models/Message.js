
module.exports = function(mongoose) {
 
	var schema = new mongoose.Schema({
		proposal_id: {type: String},
		employee_id: {type: String},
		letter: {type: String},
		advertTitle: {type:String},	
		companyName: {type:String},
        status: {type: String, default: null}
	})
 
return mongoose.model('messages', schema)
 
}