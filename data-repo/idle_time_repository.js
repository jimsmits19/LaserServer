class IdleTimeRepository {
    constructor(dao) {
        this.dao = dao
    }

    createTable() {
        const sql =
            `CREATE TABLE IF NOT EXISTS IdleTime (
            ID INT NOT NULL AUTO_INCREMENT, 
            LaserID INT NOT NULL,
            IdleTime TIME NOT NULL,
            CreatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY (ID)
            )`
            return this.dao.query(sql);

    }

    create(laserId, idleTime) {
        return this.dao.query(
            `INSERT INTO IdleTime (LaserID, IdleTime)
            VALUES (?,?)`,
            [laserId, idleTime]
        )
    }

    getAll() {
        return this.dao.query(
            `SELECT * FROM IdleTime`
        )
    }
}

module.exports = IdleTimeRepository;