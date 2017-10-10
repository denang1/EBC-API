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
    getRidersByMiles: function(year) {
        return new Promise(function(resolve, reject) {
            connection.query(
                `SELECT a.member_number, a.rider_firstName, 
                a.rider_lastName, 
                SUM(c.ride_distance) as total, 
                b.ride_date
                FROM Riders a, Rides b, Rode_In c
                WHERE b.isValid = 0 
                AND a.member_number = c.member_number 
                AND b.ride_id = c.ride_id 
                AND b.ride_date like "%${year}-%" 
                GROUP BY member_number 
                ORDER BY total DESC,
                a.rider_lastName ASC`, 
                function(err, results) {
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

                resolve(results[0] || null);
            });
        });
    }
};