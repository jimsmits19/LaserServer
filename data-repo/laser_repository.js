class LaserRepository {
    constructor(dao) {
        this.dao = dao
    }

    createTable() {
        const sql = `
        CREATE TABLE IF NOT EXISTS Lasers (
            LaserID INT NOT NULL AUTO_INCREMENT,
            LaserGuid CHAR(38) NOT NULL,
            Name TEXT NOT NULL,
            CompanyID INT NOT NULL,
            Enabled TINYINT NOT NULL,
            PlayVoiceAnnouncements TINYINT NOT NULL,
            PRIMARY KEY (LaserID),
            CONSTRAINT fk_companylaser
            FOREIGN KEY(CompanyID) REFERENCES Companies(CompanyID)
            )`
        return this.dao.query(sql)
    }

    create(name, laserguid, companyId, enabled) {
        try {
            return this.dao.query(
                `INSERT INTO Lasers (Name, LaserGuid, CompanyID, Enabled)
                VALUES (?, ?, ?, ?)`,
                [name, laserguid, companyId, enabled])
        } catch (error) {
            throw error;
        }
    }

    update(laser) {
        const { name, voiceAnnouncements, laserID } = laser;
        return this.dao.query(
            `UPDATE Lasers SET Name = ?, PlayVoiceAnnouncements = ?
            WHERE LaserID = ?`,
            [name, voiceAnnouncements, laserID]
        )
    }

    getByCompanyId(companyId) {
        return this.dao.query(
            `SELECT * FROM Lasers WHERE CompanyID = ?`,
            [companyId])
    }

    getByNameAndCompanyId(name, companyId) {
        return this.dao.query(
            `SELECT * FROM Lasers WHERE Name = ? AND CompanyID = ?`,
            [name, companyId]
        )
    }

    getById(laserId) {
        return this.dao.query(
            `SELECT * FROM Lasers WHERE LaserID = ?`, [laserId]
        )
    }

    getByLaserGuid(laserGuid) {
        return this.dao.query(
            `SELECT * FROM Lasers WHERE LaserGuid = ?`, [laserGuid]
        )
    }

}

module.exports = LaserRepository;