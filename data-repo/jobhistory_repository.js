class JobHistoryRepository {
    constructor(dao) {
        this.dao = dao
    }

    createTable() {
        const sql =
            `CREATE TABLE IF NOT EXISTS JobHistory (
            JobHistoryID INT NOT NULL AUTO_INCREMENT,
            JobID INT NOT NULL,
            Settings TEXT NOT NULL,
            RunTime DATETIME NOT NULL,
            PRIMARY KEY (JobHistoryID),
            CONSTRAINT fk_jobhistoryjob
            FOREIGN KEY(JobID) REFERENCES Jobs(JobID)
        )
        `
        return this.dao.query(sql);
    }
    read() {
        //TODO: read(params) and readAll()
        return this.dao.query(
            `SELECT * FROM JobHistory`
        )
    }
}

module.exports = JobHistoryRepository