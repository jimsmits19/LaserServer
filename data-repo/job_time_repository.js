class JobTimeRepository {
    constructor(dao) {
        this.dao = dao
    }

    createTable() {
        const sql = 
        `CREATE TABLE IF NOT EXISTS JobTimes (
            JobTimeID INT NOT NULL AUTO_INCREMENT,
            LaserID INT NOT NULL,
            JobName TEXT NOT NULL,
            JobBeginEnd TEXT NOT NULL,
            Timestamp DATETIME NULL,
            PRIMARY KEY (JobTimeID)
        )`
        return this.dao.query(sql);
    }

    create (jobName, laserId, jobBeginEnd, timestamp) {
        return this.dao.query(
            `INSERT INTO JobTimes (JobName, LaserID, JobBeginEnd, Timestamp)
            VALUES (?,?,?, ?)`, 
            [jobName, laserId, jobBeginEnd, timestamp]
        )
    }

    getAll() {
        return this.dao.query(
            `SELECT * FROM JobTimes`
        )
    }

}

module.exports = JobTimeRepository