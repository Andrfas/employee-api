
module.exports = function(mongoose) {
 
	var schema = new mongoose.Schema({
	 
		name          : { type: String, required : true },
		description   : { type: String, required : true },
		image         : { type: String },
		site          : { type: String },
		cities        : { type: Array }
	 
	})
 
return mongoose.model('companies', schema)
 
}