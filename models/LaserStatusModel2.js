const LaserStatusRepository2 = require('../data-repo/laserstatus_repository2')
const dao = require('../data-repo/dao')
const laserStatusRepo = new LaserStatusRepository2(dao())

class LaserStatusModel2 {
    constructor(dataObject) {
        if (!dataObject) dataObject = {};
        this.Laser = {
            LaserID: dataObject.LaserID,
            Status: dataObject.Status
        }
    }

    async create(laserId, status) {
        try {

            return laserStatusRepo.create(laserId, status);
        } catch (error) {
            throw error;
        }
    }
    async update(laserStatus) {
        try {
            // laserStatus.Status = status;
            // laserStatus.LaserId = laserId; 

            return laserStatusRepo.update(laserStatus);
        } catch (error) {
            throw error;
        }
    }

    async count(laserId) {
        try {
            return laserStatusRepo.count(laserId);
        } catch (error) {
            throw error;
        }
    }

    async laserStatus(code) {
        switch (code) {
            case 0:
                return "idle";
            case 1:
                return "paused";
            case 2:
                return "initial";
            case 3:
                return "homing";
            case 4:
                return "manual motion";
            case 5:
                return "engraving";
            case 6:
                return "autofocus";
            case 7:
                return "quit";
            case 8:
                return "job estimate";
            case 9:
                return "process job";
            case 10:
                return "job complete";
            case 11:
                return "engrave error";
            case 12:
                return "preengraving";
            case 14:
                return "DEATH";
            default:
                break;
        }
    }

    async get(laserId) {
        try {
            let statusCode = await laserStatusRepo.getByLaserId(laserId);
            return this.laserStatus(statusCode[0].Status);
        } catch (error) {
            throw error;
        }
    }

    async getAll() {
        try {
            return laserStatusRepo.getAll();
        }
        catch (error) {
            throw error;
        }
    }
}

module.exports = LaserStatusModel2