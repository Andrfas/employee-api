
module.exports = function(mongoose) {
 
	var schema = new mongoose.Schema({
	 
		firstName : { type: String, required : true },
		secondName : { type: String },
		lastName : { type: String, required : true },
		languages : { type: Array },
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
			description: {type: String} 
		}],
		adverts : { type: Array },
		contacts : { type: String },
		achievements : [{ 
			title: {type: String},
			degree: {type:String},
			yearsFrom: {type: Date},
			yearsTo: {type: Date}
		}],
		birthDate: {type: String},
		currentCity : {type: String}
	})
 
return mongoose.model('employee', schema)
 
}
