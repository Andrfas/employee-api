var sendgridAuth = require('../../config/authData/sendgrid.js')
var mailingParams = {
    company: "http://localhost:1337/confirm/company/",
    employee: "http://localhost:1337/confirm/employee/",
    mailFrom: 'noreply@employee.com.ua'
}
var sendgrid = require("sendgrid")(sendgridAuth.username, sendgridAuth.password);
module.exports = {
    sendConfirmLetter: sendConfirmLetter
}

function sendConfirmLetter(user, userId, emailTo, cb) {
    var email = {
        to:       emailTo || '',
        from:     mailingParams.mailFrom,
        subject:  "Account activation",
        text:     "Confirm account activation "+mailingParams[user]+userId
    };

    sendgrid.send(email, function(err, res) {
        if (err) { 
            return cb(err)
        }
        return cb(null, res);
    });
}

