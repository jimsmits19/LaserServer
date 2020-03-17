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
            database: 'laserman_data',
            typeCast: function castField( field, useDefaultTypeCasting ) {
                // https://www.bennadel.com/blog/3188-casting-bit-fields-to-booleans-using-the-node-js-mysql-driver.htm
                // We only want to cast bit fields that have a single-bit in them. If the field
                // has more than one bit, then we cannot assume it is supposed to be a Boolean.
                if ( ( field.type === "BIT" ) && ( field.length === 1 ) ) {
        
                    var bytes = field.buffer();
        
                    // A Buffer in Node represents a collection of 8-bit unsigned integers.
                    // Therefore, our single "bit field" comes back as the bits '0000 0001',
                    // which is equivalent to the number 1.
                    return( bytes[ 0 ] === 1 );
        
                }
        
                return( useDefaultTypeCasting() );
        
            }
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
