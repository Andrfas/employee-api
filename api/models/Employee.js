
module.exports = function(mongoose) {
 
	var schema = new mongoose.Schema({
	 
		firstName : { type: String, required : true },
		secondName : { type: String },
		lastName : { type: String, required : true },
		languages : { type: Array },
		availability : { type: Boolean },
		skills : { type: Array },
		education : { type: Array },
		workExperience : { type: Array },
		portfolio : { type: Array },
		adverts : { type: Array },
		contacts : { type: String },
		achievements : { type: Array }
	 
	})
 
return mongoose.model('employee', schema)
 
}
