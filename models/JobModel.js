const JobRepository = require('../data-repo/job_repository')
const dao = require('../data-repo/dao')
const jobRepo = new JobRepository(dao())
const CompanyModel = require('./CompanyModel')
const LaserModel = require('./LaserModel')
const companyModel = new CompanyModel()
const laserModel = new LaserModel()

class JobModel {
    constructor(dataObject) {
        if (!dataObject) dataObject = {};
        this.Job = {
            JobID: dataObject.JobID,
            CompanyID: dataObject.CompanyID,
            LaserID: dataObject.LaserID,
            JobName: dataObject.JobName,
            FileName: dataObject.FileName,
            ApiToken: dataObject.ApiToken,
            LastRun: dataObject.LastRun
        }
    }

    async create(jobName, apiToken, laserGuid, fileName) {
        try {
            let companyId = (await companyModel.getByToken(apiToken)).CompanyID;
            let laserId = (await laserModel.getByLaserGuid(laserGuid)).LaserID;
            return jobRepo.create(jobName, companyId, apiToken, laserId, fileName);
        } catch (error) {
            throw error;
        }
    }

    async getJobsByCompanyId(id) {
        try {
            let jobs = []
            let data = await jobRepo.getJobsByCompanyId(id);
            for (let index = 0; index < data.length; index++) {
                jobs.push(new JobModel(data[index]).Job);
            }
            return jobs;
        } catch (error) {
            throw error;
        }
    }

    async jobCount(filename, apiToken) {
        try {
            const count = await jobRepo.jobCount(filename, apiToken);
            return count[0].JobCount;
        } catch (error) {
            throw error;
        }
    }

}

module.exports = JobModel