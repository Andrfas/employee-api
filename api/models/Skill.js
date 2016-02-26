var textSearch = require('mongoose-text-search');
module.exports = function(mongoose) {
 
    var schema = new mongoose.Schema({
     
        name : { type: String, required : true }
     
    })
    schema.plugin(textSearch);
    schema.index({ name: 'text' });
 
return mongoose.model('skill', schema)
 
}
