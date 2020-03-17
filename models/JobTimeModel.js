const JobTimeRepository = require('../data-repo/job_time_repository')
const dao = require('../data-repo/dao')
const jobTimeRepo = new JobTimeRepository(dao())

class JobTimeModel {
    constructor(dataObject) {
        if (!dataObject) dataObject = {};
        this.JobTime = {
            JobID: dataObject.JobID,
            LaserID: dataObject.LaserID,
            JobName: dataObject.JobName,
            IsRunning: dataObject.JobBeginEnd,
            RunTime: dataObject.Timestamp
        }
    }

    async create (jobName, laserId, jobBeginEnd, timestamp) {
        try {
            isRunning = parseInt(isRunning);
            return jobTimeRepo.create(jobName, laserId, jobBeginEnd, timestamp);
        } catch (error) {
            throw error;
        }
    }

    async getAll() {
        try {
            return jobTimeRepo.getAll();
        } catch (error) {
            throw error;
        }
    }

}

module.exports = JobTimeModel
