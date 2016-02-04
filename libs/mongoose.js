var Mongoose = require('mongoose').Mongoose;
var mongoose = new Mongoose();
var dbConf = require('../config/connections.js').connections;
var dbData = dbConf[dbConf.mode];

 

/**
 * We check if the connection is ok
 * If so we will continue to load everything ...
 */
// var db = mongoose.connection;


// db.on('error', function() {
//     console.log('Mongoose connection error');
// });
// db.once('open', function callback() {
 
//     console.log('Connected to MongoDB !');
 
// });

var models = require('../api/models/models.js');
var mong = {};
for(key in models) {
    mong[key] = models[key](mongoose);
}

mongoose.connect(dbData.host+dbData.dbName, function(err) {
    console.error(2, err)
});
 
module.exports = mong;

/**
 * Mongodb Schemas/Models
 */
 // module.exports = {
 
 //     Company: require('../api/models/Company.js')(mongoose),
 //     Credentials: require('../api/models/Credentials.js')(mongoose),
 
 // }
