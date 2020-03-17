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
            IsRunning: dataObject.IsRunning,
            RunTime: dataObject.RunTime
        }
    }

    async create (jobName, laserId, isRunning) {
        try {
            isRunning = parseInt(isRunning);
            return jobTimeRepo.create(jobName, laserId, isRunning);
        } catch (error) {
            throw error;
        }
    }

    async getMaxId (jobName, laserId) {
        try {
            return jobTimeRepo.getMaxId(jobName, laserId);
        } catch (error) {
            throw error;
        }
    }

    async update (job) {
        try {
            job.isRunning = parseInt(job.isRunning);
            return jobTimeRepo.update(job);
        } catch (error) {
            throw error;
        }
    }

    async select(jobId) {
        try {
            return jobTimeRepo.select(jobId);
        } catch (error) {
            throw error;
        }
    }

    async count(laserId, jobName) {
        try {
            return jobTimeRepo.count(laserId, jobName);
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
