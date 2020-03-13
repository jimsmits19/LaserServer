const LaserRepository = require('../data-repo/laser_repository')
const dao = require('../data-repo/dao')
const laserRepo = new LaserRepository(dao())
const CompanyModel = require('../models/CompanyModel');
const companyModel = new CompanyModel()

class LaserModel {
    constructor (dataObject) {
        if (!dataObject) dataObject = {};
        this.Laser = {
            LaserID : dataObject.LaserID,
            LaserGuid : dataObject.LaserGuid,
            CompanyID : dataObject.CompanyID,
            Enabled : dataObject.Enabled,
            Name : dataObject.Name,
            PlayVoiceAnnouncements : dataObject.PlayVoiceAnnouncements
        }
    }

    async create (name, laserguid, token, enabled) {
        try {
            let company = await companyModel.getByToken(token);
            return laserRepo.create(name, laserguid, company.CompanyID, enabled);
        } catch (error) {
            throw error;
        }
    }

    update (laser) {
        try {
            return laserRepo.update(laser);
        } catch (error) {
            throw error;
        }
    }

    async getById (id) {
        try {
            const data = await laserRepo.getById(id);
            return new LaserModel(data[0]).Laser;
        } catch (error) {
            throw error;
        }
    }

    async getByCompanyId(id) {
        try {
            let lasers = []
            let data = await laserRepo.getByCompanyId(id);
            for (let i = 0; i < data.length; i++) {
                lasers.push(new LaserModel(data[i]).Laser);
            }
            return lasers;

        } catch (error) {
            throw error;
        }
    }

    async getByNameAndCompanyId(name, companyId) {
        try {
            var data = await laserRepo.getByNameAndCompanyId(name, companyId);
            return new LaserModel(data[0]).Laser;
        } catch (error) {
            throw error;
        }
    }

    async getByLaserGuid(laserGuid) {
        try {
            var data = await laserRepo.getByLaserGuid(laserGuid); 
            return new LaserModel(data[0]).Laser;
        } catch (error) {
            throw error;
        }

    }
}

module.exports = LaserModel
