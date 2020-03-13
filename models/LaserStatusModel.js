const LaserStatusRepository = require('../data-repo/laserstatus_repository')
const dao = require('../data-repo/dao')
const laserStatusRepo = new LaserStatusRepository(dao())
const LaserModel = require('./LaserModel')
const laserModel = new LaserModel();

class LaserStatusModel {
    constructor (dataObject) {
        if (!dataObject) dataObject = {};
        this.Laser = {
            LaserStatusID: dataObject.LaserStatusID,
            LaserID : dataObject.LaserID,
            OperatorID: dataObject.OperatorID,
            MacReady: dataObject.MacReady,
            MacState: dataObject.MacState,
            MacBusy: dataObject.MacBusy,
            JobName: dataObject.JobName,
            UcpIsRunning: dataObject.UcpIsRunning
        }
    }

    async count(laserguid) {
        try {
            let laserId = (await laserModel.getByLaserGuid(laserguid)).LaserID;
            return await laserStatusRepo.count(laserId);
        } catch (error) {
            throw error;
        }
    }

    async create (laserguid, operatorid, macready, macstate, macbusy, jobname, ucpisrunning) {
        try {
            let laserId = (await laserModel.getByLaserGuid(laserguid)).LaserID

            return laserStatusRepo.create(laserId, operatorid, macready, macstate, macbusy, jobname, ucpisrunning);
        } catch (error) {
            throw error;
        }
    }
    async update (laserStatus) {
        try {
            let laserId = (await laserModel.getByLaserGuid(laserStatus.laserguid)).LaserID
            laserStatus.LaserId = laserId; 

            return laserStatusRepo.update(laserStatus);
        } catch (error) {
            throw error;
        }
    }

    async getByLaserId(id) {
        try {
            let lasers = [];
            const data = await laserStatusRepo.getByLaserId(id);
            for (let index = 0; index < data.length; index++) {
                lasers.push(new LaserStatusModel(data[index]).Laser);
            }

            return lasers;

        } catch (error) {
            throw error;
        }
    }

}

module.exports = LaserStatusModel