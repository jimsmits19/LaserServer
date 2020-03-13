const IdleTimeRepository = require('../data-repo/idle_time_repository')
const dao = require('../data-repo/dao')
const idleTimeRepo = new IdleTimeRepository(dao());

class IdleTimeModel {
    constructor(dataObject) {
        if (!dataObject) dataObject = {};
        this.IdleTime = {
            LaserId : dataObject.LaserId,
            IdleTime : dataObject.IdleTime,
            CreatedAt : dataObject.CreatedAt
        }
    }

    create(laserId, idleTime) {
        try {
            return idleTimeRepo.create(laserId, idleTime);
        } catch (error) {
            throw error;
        }
    }

    getAll() {
        try {
            return idleTimeRepo.getAll();
        } catch (error) {
            throw error;
        }
    }
}

module.exports = IdleTimeModel