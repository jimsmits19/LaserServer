class LaserStatusRepository2 {
    constructor(dao) {
        this.dao = dao
    }

    createTable() {
        const sql =
            `CREATE TABLE IF NOT EXISTS LaserStatus2 (
            LaserID INT NOT NULL,
            Status INT NOT NULL,
            PRIMARY KEY (LaserID)
            )`
            return this.dao.query(sql);

    }

    create(laserId, status) {
        return this.dao.query(
            `INSERT INTO LaserStatus2 (LaserID, Status)
            VALUES (?,?)`,
            [laserId, status]
        )
    }

    update(laserStatus) {
        const { status, laserId } = laserStatus;
        return this.dao.query(
            `UPDATE LaserStatus2 SET Status = ?
            WHERE LaserID = ?`,
            [status, laserId]
        )
    }

    getByLaserId(laserId) {
        return this.dao.query(
            `SELECT * FROM LaserStatus2 WHERE LaserID = ?`,
            [laserId]
        )
    }

    getAll() {
        return this.dao.query(
            `SELECT * FROM LaserStatus2`
        )
    }

    count(laserId) {
        return this.dao.query(
            `SELECT COUNT(LaserID) as count FROM LaserStatus2 WHERE LaserID = ?`, [laserId]
        )
    }

}

module.exports = LaserStatusRepository2;