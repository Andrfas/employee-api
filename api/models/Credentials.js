
module.exports = function(mongoose) {
 
	var schema = new mongoose.Schema({
	 
		email         : { type: String, unique : true, required : true },
		password	  : { type: String, required : true },
		token         : { type: String },
		company_id    : { type: String },
		employee_id   : { type: Array }
	 
	})
 
return mongoose.model('credentials', schema)
 
}