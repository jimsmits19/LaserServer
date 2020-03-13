const CompanyRepository = require('../data-repo/company_repository')
const dao = require('../data-repo/dao')
const companyRepo = new CompanyRepository(dao());
const uuid = require('uuid/v1')

class CompanyModel {
    constructor(dataObject) {
        if (!dataObject) dataObject = {};
        this.Company = {
            CompanyID: dataObject.CompanyID,
            Enabled: dataObject.Enabled,
            Name: dataObject.Name,
            CreatedDate: dataObject.CreatedDate,
            ApiToken: dataObject.ApiToken
        }
    }

    create(name, enabled) {
        try {
            return companyRepo.create(name, uuid(), enabled);
        } catch (error) {
            throw error;
        }
    }


    update(company) {
        try {
            return companyRepo.update(company);
        } catch (error) {
            throw error;
        }
    }

    async apiTokenCount(token) {
        try {
            let count = await companyRepo.apiTokenCount(token);
            console.log(count)
            return count[0].TokenCount;
        } catch (error) {
            throw error;
        }
    }

    async getById(id) {
        try {
            const companyData = await companyRepo.getById(id);
            return new CompanyModel(companyData[0]).Company;            
        } catch (error) {
            throw error;
        }
    }

    async getAll() {
        try {
            let companies = []
            let data = await companyRepo.getAll();

            for (let i = 0; i < data.length; i++) {
                companies.push(new CompanyModel(data[i]).Company);
            }

            return companies;

        } catch (error) {
            throw error;
        }
    }

    async getByToken(token) {
        try {
            const data =  await companyRepo.getByToken(token);
            return new CompanyModel(data[0]).Company
        } catch (error) {
            throw error;
        }
    }
}

module.exports = CompanyModel
