var bcrypt = require('bcryptjs')

module.exports = function(mongoose) {
 
	var credentialsSchema = new mongoose.Schema({
	 
		email         : { type: String, unique : true, required : true },
		password	  : { type: String, required : true },
		token         : { type: String },
		company_id    : { type: String },
		employee_id   : { type: String },
		last_activity : { type: Date }
	 
	})

	credentialsSchema.methods.validPass = function(password) {
	    return bcrypt.compareSync(password, this.password);
	};

	credentialsSchema.methods.getCrypted = function(password) {
	    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
	};

	return mongoose.model('credentials', credentialsSchema)
}