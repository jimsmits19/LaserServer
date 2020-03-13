//the tao of dao
const mysql = require('mysql');


class DAO {
    constructor() {

        this.connect();

    }

    query(sql, params = []) {
        return new Promise((resolve, reject) => {
            
            this.connection.query(sql, params, function (error, results, fields) {
                if (error) {
                    // error will be an Error if one occurred during the query
                    console.log("Error running SQL: " + sql);
                    console.log(error)
                    if (error.fatal) {
                        new DAO();
                    }
                    reject(error);
                } else {
                    // results will contain the results of the query
                    resolve(results);
                }
            });
        });

    }

    connect() {
        
        this.connection = mysql.createConnection({
            host: '162.214.66.193',
            //host: 'localhost',
            user: 'lasermanager',
            password: 'Laserman2127862288',
            database: 'laserman_data'
        });
        
        
        this.connection.connect(function (err) {
            if (err) {
                console.error('error connecting: ' + err.stack);
                return;
            }
        });
    }



}

let dao;

function getDAO() {
    if (dao) return dao;

    dao = new DAO();

    return dao;
}


module.exports = getDAO;
