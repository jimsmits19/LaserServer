
class CompanyRepository {
    constructor(dao) {
        this.dao = dao
    }

    createTable() {
        const sql = `CREATE TABLE IF NOT EXISTS Companies (
                        CompanyID INT NOT NULL AUTO_INCREMENT , 
                        Name TEXT NOT NULL , 
                        Enabled TINYINT NOT NULL , 
                        ApiToken TEXT NOT NULL , 
                        CreatedDate DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP , 
                        PRIMARY KEY (CompanyID))`
        return this.dao.query(sql);
    }

    create(name, apiToken, enabled) {
        return this.dao.query(
            `INSERT INTO Companies (Name, ApiToken, Enabled, CreatedDate)
            VALUES (?,?,?,?)`,
            [name, apiToken, enabled, new Date(Date.now())]
        )
    }

    getByToken(token) {
        return this.dao.query(
            `SELECT * FROM Companies WHERE ApiToken = ?`, [token]
        )
    }

    apiTokenCount(token) {
        return this.dao.query(
            `SELECT Count(ApiToken) as TokenCount FROM Companies WHERE ApiToken = ?`, [token]
        )
    }

    update(company) {
        const { CompanyID, Name, Enabled } = company;
        return this.dao.query(
            `UPDATE Companies
            SET Name = ?,
            Enabled = ?
            WHERE CompanyID = ?
            `,
            [Name, Enabled, CompanyID]
        )
    }

    getAll() {
        return this.dao.query(
            `SELECT * FROM Companies`
        )
    }

    getNameId() {
        return this.dao.query(
            `SELECT CompanyId value, Name text FROM Companies`
        )
    }

    getById(companyId) {
        return this.dao.query(
            `SELECT * FROM Companies WHERE CompanyID = ?`,
            [companyId]
        )
    }

    getByName(companyName) {
        return this.dao.query(
            `SELECT * FROM Companies WHERE CompanyName = ?`,
            [companyName])
    }

}

module.exports = CompanyRepository;