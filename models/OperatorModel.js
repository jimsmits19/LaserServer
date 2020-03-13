const OperatorRepository = require('../data-repo/operator_repository')
const dao = require('../data-repo/dao')
const operatorRepo = new OperatorRepository(dao());

class OperatorModel {
    constructor(dataObject) {
        if (!dataObject) dataObject = {};
        this.Operator = {
            OperatorID: dataObject.OperatorID,
            Name: dataObject.Name,
            CompanyID: dataObject.CompanyID
        }
    }

    create(name, companyId) {
        try {
            return operatorRepo.create(name, companyId);
        } catch (error) {
            throw error;
        }
    }

    update(operator) {
        try {
            return operatorRepo.update(operator);
        } catch (error) {
            throw error;
        }
    }

    async getById(id) {
        try {
            const data = await operatorRepo.getById(id);
            return new OperatorModel(data[0]).Operator;
        } catch (error) {
            throw error;
        }
    }

    async getByCompanyId(id) {
        try {
            let operators = [];
            let data = await operatorRepo.getByCompanyId(id);
            for (let index = 0; index < data.length; index++) {
                operators.push(new OperatorModel(data[index]).Operator);
            }
            return operators;

        } catch (error) {
            
        }
    }

}

module.exports = OperatorModel