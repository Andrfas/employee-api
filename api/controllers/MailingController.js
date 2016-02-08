var mailingParams = {
    company: "http://localhost:1337/confirm/company/",
    employee: "http://localhost:1337/confirm/employee/",
    mailFrom: 'noreply@employee.com.ua'
}
var sendgrid = require("sendgrid")("andrfas", "andrfas5972");

module.exports = {
    sendConfirmLetter: sendConfirmLetter
}

function sendConfirmLetter(user, userId, emailTo, cb) {
    var email = {
        to:       emailTo,
        from:     mailingParams.mailFrom,
        subject:  "Account activation",
        text:     "Confirm account activation <a href="+mailingParams[user]+userId+">"+mailingParams[user]+userId+"</a>"
    };

    sendgrid.send(email, function(err, res) {
        if (err) { return cb(err) }
        return cb(null, res);
    });
}

