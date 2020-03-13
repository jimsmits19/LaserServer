class LaserStatusRepository {
    constructor(dao) {
        this.dao = dao
    }

    createTable() {
        const sql =
            `CREATE TABLE IF NOT EXISTS LaserStatus (
            LaserStatusID INT AUTO_INCREMENT,
            LaserID INT NOT NULL,
            OperatorID INT NOT NULL,
            MacReady INT,
            MacState INT,
            MacBusy INT,
            JobName TEXT,
            UcpIsRunning TINYINT,
            PRIMARY KEY (LaserStatusID),
            CONSTRAINT fk_laserstatuslaser
            FOREIGN KEY(LaserID) REFERENCES Lasers(LaserID),
            CONSTRAINT fk_laserstatusoperator
            FOREIGN KEY(OperatorID) REFERENCES Operators(OperatorID)
            )`
            return this.dao.query(sql);

    }

    create(laserId, operatorId, macReady, macState, macBusy, jobName, ucpisrunning) {
        return this.dao.query(
            `INSERT INTO LaserStatus (LaserID, OperatorID, MacReady, MacState, MacBusy, JobName, UcpIsRunning)
            VALUES (?,?,?,?,?,?,?)`,
            [laserId, operatorId, macReady, macState, macBusy, jobName, ucpisrunning]
        )
    }

    update(laserStatus) {
        const { operatorId, macReady, macState, macBusy, jobName, ucpisrunning, laserId } = laserStatus;
        return this.dao.query(
            `UPDATE LaserStatus SET OperatorID = ?, MacReady = ?, MacState = ?, MacBusy = ?, JobName = ?, UcpIsRunning = ?
            WHERE LaserID = ?`,
            [operatorId, macReady, macState, macBusy, jobName, ucpisrunning, laserId]
        )
    }

    count(laserId) {
        return this.dao.query(
            `SELECT COUNT(LaserID) AS Count FROM LaserStatus WHERE LaserId = ?`, [laserId]
        )
    }

    getByLaserId(laserId) {
        return this.dao.query(
            `SELECT * FROM LaserStatus WHERE LaserID = ?`,
            [laserId]
        )
    }
    
    getByLaserStatusId(laserStatusId) {
        return this.dao.query(
            `SELECT * FROM LaserStatus WHERE LaserStatusID = ?`,
            [laserStatusId]
        )
    }
}

module.exports = LaserStatusRepository;