var mailingParams = {
    confirmCompanyLink: "http://localhost:1337/confirm/company/",
    confirmEmployeeLink: "http://localhost:1337/confirm/employee/"
}
var sendgrid = require("sendgrid")("andrfas", "andrfas5972");

module.exports = {
    sendCompanyConfirm: sendCompanyConfirm
}

function sendCompanyConfirm(companyId, emailTo, cb) {
    var email = {
        to:       emailTo,
        from:     mailingParams.mailFrom,
        subject:  "Account activation",
        text:     "Confirm account activation <a href="+mailingParams.confirmCompanyLink+companyId+">"+mailingParams.confirmCompanyLink+companyId+"</a>"
    };

    sendgrid.send(email, function(err, res) {
        if (err) { return cb(err) }
        return cb(null, res);
    });
}
