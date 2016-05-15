
module.exports = function(mongoose) {
 
	var schema = new mongoose.Schema({
	 
		company          : { type: String, required : true },
		companyName          : { type: String, required : true },
		category   : { type: String, required : true },
		subcategory         : { type: String },
		title          : { type: String },
		description        : { type: String },
		short_description         : { type: String },
		skills         : { type: Array },
		cities         : { type: Array },
		isActive         : { type: String },
		hoursPerWeek         : { type: String, enum:['more_than_30', 'less_than_30', 'of_necessity'] },
		paid         : { type: Boolean },
		needPay         : { type: Boolean },
		emplType         : { type: String, enum:['fulltime', 'underemployment', 'distant_work'] },
		dateSelEnd         : { type: String },
		submitted         : { type: String },
	 	viewedNumber	  : { type:Number, default:0}
	})
 
return mongoose.model('adverts', schema)
 
}