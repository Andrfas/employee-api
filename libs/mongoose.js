var mongoose = require('mongoose');
 
mongoose.connect('mongodb://localhost/employeeDB');
 
/**
 * We check if the connection is ok
 * If so we will continue to load everything ...
 */
var db = mongoose.connection;
 
 
db.on('error', console.error.bind(console, 'Mongoose connection error:'));
db.once('open', function callback() {
 
    console.log('Connected to MongoDB !');
 
});
 
/**
 * Mongodb Schemas/Models
 */
 module.exports = {
 
     Company: require('../api/models/Company.js')(mongoose),
     Credentials: require('../api/models/Credentials.js')(mongoose),
 
 }