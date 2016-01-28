module.exports = {
    createCompany: createCompany
}


function createCompany(req, res) {
    var reqFieldsPresent = CommonFunctions.areKeysInObj(reqFields.createCompany, req.body);
    if(reqFieldsPresent !== true) {
        return res.json({error:'Missed requeired field: '+reqFieldsPresent})
    }

    return res.ok();
}

// felds, that are requeired for request. Should be for each function, and should have the same name
var reqFields = {
    createCompany: [
        'name',
        'description'
    ]
}

