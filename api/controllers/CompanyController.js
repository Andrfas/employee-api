var requestsDB = require('../../api/services/requestsDB.js')
var CommonFunctions = require('../../api/services/CommonFunctions.js')
var _ = require('lodash')

module.exports = {
    createCompany: createCompany
}


function createCompany(req, res) {
    var reqFieldsPresent = CommonFunctions.areKeysInObj(reqFields.createCompany, req.body);
    if(reqFieldsPresent !== true) {
        return res.json({status: 400, msg:'[CompanyController createCompany] Missed requeired field: '+reqFieldsPresent})
    }

    var company = _.cloneDeep(req.body)
    delete company.email 
    delete company.password
     
    requestsDB.create('Company', req.body, function(response){
        if (response.status) {
            return res.json({status:response.status, msg:'[CompanyController createCompany company] '+response.msg})
        }

        var credentials = {
            company_id: response._id,
            email: req.body.email,
            password: req.body.password
        }

        requestsDB.create('Credentials', credentials, function(response){
            if (response.status) {
                return res.json({status:response.status, msg:'[CompanyController createCompany credentials] '+response.msg})
            }

            return res.ok();
        })
            
    })
}

// felds, that are requeired for request. Should be for each function, and should have the same name
var reqFields = {
    createCompany: [
        'name',
        'description',
        'email',
        'password'
    ]
}

