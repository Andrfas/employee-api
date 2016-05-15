
module.exports = function(mongoose) {
 
	var schema = new mongoose.Schema({
	 
		firstName : { type: String, required : true },
		secondName : { type: String },
		lastName : { type: String, required : true },
		languages : [{name: {type: String},
			level: {type: String}}],
		availability : { type: Boolean, default: true },
		skills : 
			[{name: {type: String},
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
		portfolio : [{ 
			title: {type: String},
			description: {type: String},
			image : { type: String }
		}],
		adverts : { type: Array },
		contacts : { type: String },
		achievements : [{ 
			title: {type: String},
			description: {type:String},
			yearsFrom: {type: Date},
			yearsTo: {type: Date}
		}],
		birthDate: {type: String},
		currentCity : {type: String},
		image : { type: String }
	})
 
return mongoose.model('employee', schema)
 
}
