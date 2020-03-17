const RemoteLogRepository = require('../data-repo/remote_log_repository')
const dao = require('../data-repo/dao');
const remoteLogRepo = new RemoteLogRepository(dao())

class RemoteLogModel {
    constructor(dataObject) {
        if (!dataObject) dataObject = {};
        this.RemoteLog = {
            MessageID : dataObject.MessageID,
            Message: dataObject.Message
        }
    }

    async create (message) {
        try {
            return remoteLogRepo.create(message);
        } catch (error) {
            throw error;
        }
    }

    async getAll() {
        try {
            return remoteLogRepo.getAll();
        } catch (error) {
            throw error;
        }
    }
}

module.exports = RemoteLogModel