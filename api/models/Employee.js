
module.exports = function(mongoose) {
 
	var schema = new mongoose.Schema({
	 
		firstName : { type: String, required : true },
		secondName : { type: String },
		lastName : { type: String, required : true },
		languages : { type: Array },
		availability : { type: Boolean },
		skills : { 
			title: {type: Array},
			description: {type: Array}
		},
		education : { 
			uni: {type: Array},
			faculty: {type:Array},
			degree: {type:Array},
			yearsFrom: {type: Array},
			yearsTo: {type: Array}
		},
		workExperience : { 
			title: {type: Array},
			degree: {type:Array},
			yearsFrom: {type: Array},
			yearsTo: {type: Array}
		},
		portfolio : { type: Array },
		adverts : { type: Array },
		contacts : { type: String },
		achievements : { type: Array },
		birthDate: {type: String},
		currentCity : {type: String}
	})
 
return mongoose.model('employee', schema)
 
}
