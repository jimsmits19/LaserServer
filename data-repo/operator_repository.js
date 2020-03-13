class OperatorRepository {
    constructor(dao) {
        this.dao = dao
    }

    createTable() {
        const sql =
            `CREATE TABLE IF NOT EXISTS Operators (
                OperatorID INT  AUTO_INCREMENT, 
                Name TEXT NOT NULL, 
                CompanyID INT NOT NULL,
                PRIMARY KEY (OperatorID),
                CONSTRAINT fk_operatorcompany
                FOREIGN KEY (CompanyID) REFERENCES Companies(CompanyID)
        )`
        return this.dao.query(sql);
    }

    create(name, companyId) {
        return this.dao.query(
            `INSERT INTO Operators (Name, CompanyID)
            VALUES (?,?)`,
            [name, companyId]
        )
    }

    update(operator) {
        const { name, operatorId } = operator;
        return this.dao.query(
            `UPDATE Operators SET Name = ?
            WHERE operatorID= ?`,
            [name, operatorId]
        )
    }

    getById(operatorId) {
        return this.dao.query(
            `SELECT * FROM Operators WHERE OperatorID = ?`,
            [operatorId]
        )
    }

    getByCompanyId(companyId) {
        return this.dao.query(
            `SELECT * FROM Operators WHERE CompanyID = ?`,
            [companyId]
        )
    }

}

module.exports = OperatorRepository;