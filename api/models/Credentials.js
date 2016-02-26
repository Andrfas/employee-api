var bcrypt = require('bcryptjs')

module.exports = function(mongoose) {
 
	var credentialsSchema = new mongoose.Schema({
	 
		email         : { type: String, unique : true, required : true },
		password	  : { type: String, required : true },
		token         : { type: String },
		client_type   : { type: String, enum:['company', 'employee'], required : true },
		client_id     : { type: String, required : true },
		last_activity : { type: Date },
		status 		  : { type: String, enum:['notConfirmed', 'notActivated', 'activated'], required : true, default: 'notConfirmed'}
	 
	})

	credentialsSchema.methods.validPass = function(password) {
	    return bcrypt.compareSync(password, this.password);
	};

	credentialsSchema.methods.getCrypted = function(password) {
	    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
	};

	return mongoose.model('credentials', credentialsSchema)
}