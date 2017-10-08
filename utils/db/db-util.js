const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Breath328321',
    port: '3306',
    database: 'ebc'
});

module.exports = {
    getAllRiders: function() {
        return new Promise((resolve, reject) => {
            connection.query('select * from riders', (err, results) => {
                if(err) {
                    return reject(err);
                }

                resolve(results);
            });
        });
    },
    getRider: function(member_number) {
        return new Promise(function(resolve, reject){
            connection.query(`select * from riders where member_number = ${member_number}`, function(err, results){
                if(err) {
                    return reject(err);
                }

                resolve(results[0] | null);
            });
        });
    }
};