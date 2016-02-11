
module.exports = function(mongoose) {
 
	var schema = new mongoose.Schema({
	 
		company          : { type: String, required : true },
		category   : { type: String, required : true },
		subcategory         : { type: String },
		title          : { type: String },
		description        : { type: Array },
		short_description         : { type: String },
		skills         : { type: Array },
		city         : { type: Array },
		isActive         : { type: String },
		hoursPerWeek         : { type: String },
		paid         : { type: Boolean },
		needPay         : { type: Boolean },
		emplType         : { type: String },
		dateSelEnd         : { type: String },
		submitted         : { type: String },
	 
	})
 
return mongoose.model('adverts', schema)
 
}