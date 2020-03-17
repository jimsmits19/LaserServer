class RemoteLogRepository {
    constructor (dao) {
        this.dao = dao;
    }

    createTable() {
        const sql = `CREATE TABLE IF NOT EXISTS RemoteLog (
            MessageID INT AUTO_INCREMENT, 
            Message TEXT NOT NULL, 
            PRIMARY KEY (MessageID)
        )`
        return this.dao.query(sql);
    }

    create (message) {
        return this.dao.query (
            `INSERT INTO RemoteLog (Message) VALUES (?)`, [message]
        )
    }

    getAll () {
        return this.dao.query(
            `SELECT * FROM RemoteLog`
        )
    }


}

module.exports = RemoteLogRepository;