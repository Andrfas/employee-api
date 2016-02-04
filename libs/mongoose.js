var Mongoose = require('mongoose').Mongoose;
var mongoose = new Mongoose();
var dbConf = require('../config/connections.js').connections;
var dbData = dbConf[dbConf.mode];


var models = require('../api/models/models.js');
var mongooseModels = {};
for(key in models) {
    mongooseModels[key] = models[key](mongoose);
}

mongoose.connect(dbData.host+dbData.dbName, function(err) {
    if(err) {
        console.log('Error: ', err);
    } else {
        console.log('Connected to MongoDB !');
    }
});
 
module.exports = mongooseModels;
