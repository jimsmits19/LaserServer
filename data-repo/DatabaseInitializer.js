const CompanyRepository = require('./company_repository')
const JobRepository = require('./job_repository')
const JobHistoryRepository = require('./jobhistory_repository')
const LaserRepository = require('./laser_repository')
const LaserStatusRepository = require('./laserstatus_repository')
const LaserStatusRepository2 = require('./laserstatus_repository2')
const IdleTimeRepository = require('./idle_time_repository')
const OperatorRepository = require('./operator_repository')
const UserRepository = require('./user_repository')
const JobTimeRepository = require('./job_time_repository')
const dao = require('./dao');

function initializeDatabase() {

    const companyRepo = new CompanyRepository(dao());
    const jobRepo = new JobRepository(dao());
    const jobHistoryRepo = new JobHistoryRepository(dao());
    const laserRepo = new LaserRepository(dao());
    const laserStatusRepo = new LaserStatusRepository(dao());
    const laserStatusRepo2 = new LaserStatusRepository2(dao());
    const idleTimeRepo = new IdleTimeRepository(dao());
    const operatorRepo = new OperatorRepository(dao());
    const userRepo = new UserRepository(dao());
    jobTimeRepo = new JobTimeRepository(dao());

    companyRepo.createTable().then(()=>{
        userRepo.createTable(); 
        operatorRepo.createTable();
        idleTimeRepo.createTable();
        jobTimeRepo.createTable();
        laserRepo.createTable().then(()=>{
            laserStatusRepo.createTable();
            laserStatusRepo2.createTable();
        });
        jobRepo.createTable().then(()=>{
            jobHistoryRepo.createTable();
        });
    })
}

initializeDatabase();

module.exports = initializeDatabase;