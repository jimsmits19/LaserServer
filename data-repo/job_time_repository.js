class JobTimeRepository {
    constructor(dao) {
        this.dao = dao
    }

    createTable() {
        const sql = 
        `CREATE TABLE IF NOT EXISTS JobTimes (
            JobID INT NOT NULL AUTO_INCREMENT,
            LaserID INT NOT NULL,
            JobName TEXT NOT NULL,
            IsRunning BIT NOT NULL,
            RunTime TIME NULL,
            PRIMARY KEY (JobID)
        )`
        return this.dao.query(sql);
    }

    create (jobName, laserId, isRunning, runTime) {
        return this.dao.query(
            `INSERT INTO JobTimes (JobName, LaserID, IsRunning, RunTime)
            VALUES (?,?,?, ?)`, 
            [jobName, laserId, isRunning, runTime]
        )
    }

    getMaxId(jobName,laserId) {
        return this.dao.query(
            `SELECT MAX(JobID) as maxID FROM JobTimes WHERE JobName = ? AND LaserID = ?`, [jobName, laserId]
        )
    }

    update (job) {
        const { isRunning, runTime, jobId } = job;
        return this.dao.query(
            `UPDATE JobTimes SET isRunning = ?, RunTime = ? WHERE JobID = ?`,
            [isRunning, runTime, jobId]
        )
    }

    select (jobId) {
        return this.dao.query(
            `SELECT * FROM JobTimes WHERE JobID = ?`
        )
    }

    count(laserId, jobName) {
        return this.dao.query(
            `SELECT COUNT(JobID) as count FROM JobTimes WHERE LaserID = ? AND jobName = ?`, [laserId, jobName]
        )
    }

    getAll() {
        return this.dao.query(
            `SELECT * FROM JobTimes`
        )
    }

}

module.exports = JobTimeRepository