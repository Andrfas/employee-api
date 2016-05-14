
module.exports = function(mongoose) {
 
	var schema = new mongoose.Schema({
	 
		firstName : { type: String, required : true },
		secondName : { type: String },
		lastName : { type: String, required : true },
		languages : { type: Array },
		availability : { type: Boolean },
		skills : 
			[{title: {type: String},
			description: {type: String}}]
		,
		education : [{ 
			uni: {type: String},
			faculty: {type:String},
			degree: {type:String},
			yearsFrom: {type: Date},
			yearsTo: {type: Date}
		}],
		workExperience : [{ 
			title: {type: String},
			degree: {type:String},
			yearsFrom: {type: Date},
			yearsTo: {type: Date}
		}],
		portfolio : { type: Array },
		adverts : { type: Array },
		contacts : { type: String },
		achievements : { type: Array },
		birthDate: {type: String},
		currentCity : {type: String}
	})
 
return mongoose.model('employee', schema)
 
}
