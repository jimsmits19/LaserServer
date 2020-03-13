
class UserRepository {
    constructor(dao) {
        this.dao = dao;
    }

    createTable() {
        const sql = `CREATE TABLE IF NOT EXISTS Users (
                        UserID INT AUTO_INCREMENT,
                        CompanyID INT NOT NULL,
                        UserName VARCHAR(255) NOT NULL UNIQUE, 
                        PasswordHash TEXT NOT NULL,
                        PasswordSalt TEXT NOT NULL,
                        FirstName TEXT NOT NULL,
                        LastName TEXT NOT NULL,
                        Enabled TINYINT NOT NULL,
                        CreatedDate DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                        LastLogin DATETIME,
                        Admin TINYINT NOT NULL,
                        PRIMARY KEY (UserId),
                        CONSTRAINT fk_usercompany
                        FOREIGN KEY(CompanyID) REFERENCES Companies(CompanyID)
                    )`

        return this.dao.query(sql);


    }

    create(companyid, username, passwordhash, passwordsalt, firstname, lastname, enabled, admin) {
        return this.dao.query(
            `INSERT INTO Users (CompanyID,UserName, PasswordHash, PasswordSalt, FirstName, LastName, Enabled, CreatedDate, Admin)
            VALUES (?,?,?,?,?,?,?,?,?)`,
            [companyid, username, passwordhash, passwordsalt, firstname, lastname, enabled, new Date(Date.now()), admin]
        )
    }

    update(user) {
        const { userName, firstName, lastName, enabled, userId } = user;
        return this.dao.query(
            `UPDATE Users SET UserName = ?, FirstName=?, LastName= ?, Enabled = ?
            WHERE UserID = ?`,
            [userName, firstName, lastName, enabled, userId]
        )
    }

    getAll() {
        return this.dao.query(
            `SELECT * FROM Users`
        )
    }

    getByName(name) {
        return this.dao.query(
            `SELECT * FROM Users WHERE LOWER(Username) = ?`,
            [name.toLowerCase()]
        )
    }

    getById(userId) {
        return this.dao.query(
            `SELECT * FROM Users WHERE UserID = ?`,
            [userId]
        )
    }

    count(name) {
        return this.dao.query(`SELECT COUNT(UserName) as Count FROM Users WHERE UserName = ?`, [name])
    }

}

module.exports = UserRepository; 