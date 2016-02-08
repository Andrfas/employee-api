var db = require('../../libs/mongoose.js');
var requestsDB = require('../../api/services/requestsDB.js');
var async = require('async');
var CommonFunctions = require('../../api/services/CommonFunctions.js');
var fs = require('fs');
var skipper = require('skipper-gridfs');
var dbConfigs = require('../../config/connections.js').connections;
var dbConfig = dbConfigs[dbConfigs.mode];


module.exports = {
    uploadImage: function(req, res){
        req.file('file').upload({
            adapter: skipper,
            uri: 'mongodb://localhost:27017/employeeDB.images'
        }, function (err, filesUploaded) {
            console.log(dbConfig.host+dbConfig.dbName);
            console.log('asd', filesUploaded[0].fd);

            res.json({status:200,file:filesUploaded});
        });
    }
}

var reqFields = {
    
}

