
module.exports = function(mongoose) {
 
	var schema = new mongoose.Schema({
		proposal_id: {type: String},
		employee_id: {type: String},
		letter: {type: String} 	
	})
 
return mongoose.model('messages', schema)
 
}