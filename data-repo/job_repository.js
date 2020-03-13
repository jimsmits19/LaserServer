class JobRepository {
    constructor(dao) {
        this.dao = dao
    }

    createTable() {
        const sql =
            `CREATE TABLE IF NOT EXISTS Jobs (
                JobID INT NOT NULL AUTO_INCREMENT,
                CompanyID INT NOT NULL,
                LaserID INT NOT NULL,
                JobName TEXT NOT NULL,
                FileName TEXT NOT NULL,
                ApiToken TEXT NOT NULL,
                LastRun DATETIME,
                PRIMARY KEY (JobID),
                CONSTRAINT fk_joblaser
                FOREIGN KEY(LaserID) REFERENCES Lasers(LaserID),
                CONSTRAINT fk_jobcompany
                FOREIGN KEY(CompanyID) REFERENCES Companies(CompanyID)
            )`
    return this.dao.query(sql);
    }

    create(jobName, companyId, apiToken,laserId,fileName) {
        return this.dao.query(
            `INSERT INTO Jobs (JobName, CompanyID, ApiToken, LaserID, FileName)
        VALUES (?,?,?,?,?)`,
            [jobName, companyId, apiToken,laserId,fileName]
        )
    }

    jobCount(fileName, apiToken) {
        return this.dao.query(
            `SELECT COUNT(jobID) as JobCount FROM Jobs WHERE FileName = ? AND ApiToken = ?`,
            [fileName, apiToken]
        )
    }

    read(companyId) {
        return this.dao.query(
            `SELECT * FROM Jobs WHERE CompanyID = ?`,
            [companyId]
        )
    }

    read() {
        return this.dao.query(
            `SELECT * FROM Jobs`
        )

    }

    update(job) {
        const { jobName, companyId, lastRun, jobId } = job
        return this.dao.query(
            `UPDATE Jobs SET JobName = ?, CompanyID = ?, LastRun = ?
            WHERE JobID = ?`,
            [jobName, companyId, lastRun, jobId]
        )
     }

      getJobsByCompanyId (companyId) {
        return this.dao.query(`SELECT * FROM Jobs WHERE CompanyID = ?`, [companyId])
      }

}

module.exports = JobRepository