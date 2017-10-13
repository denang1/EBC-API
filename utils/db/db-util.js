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
        return new Promise(function(resolve, reject) {
            connection.query(
                `SELECT member_number AS memberNumber,
                rider_firstName AS firstName,
                rider_lastName AS lastName,
                isMember 
                FROM Riders`,
                function(err, results) {
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
                `SELECT a.member_number AS memberNumber, 
                a.rider_firstName AS firstName, 
                a.rider_lastName AS lastName, 
                SUM(c.ride_distance) AS totalMiles, 
                b.ride_date AS date
                FROM Riders a, Rides b, Rode_In c
                WHERE b.isValid = 0 
                AND a.member_number = c.member_number 
                AND b.ride_id = c.ride_id 
                AND b.ride_date like "%${year}-%" 
                GROUP BY memberNumber 
                ORDER BY totalMiles DESC,
                lastName ASC`, 
                function(err, results) {
                    if(err) {
                        return reject(err);
                    }
                    resolve(results);
                });
        });
    },
    getRidesByDate: function(year) {
        return new Promise(function(resolve, reject) {
            connection.query(
                `SELECT DISTINCT
                c.ride_id AS id,
                c.ride_date AS date,
                c.ride_name AS name,
                c.ride_destination AS destination,
                c.num_riders AS numRiders,
                c.distance,
                c.pace,
                a.rider_firstName AS leaderFirstName,
                a.rider_lastName AS leaderLastName,
                b.rider_firstName AS sweepFirstName,
                b.rider_lastName AS sweepLastName
                FROM 
                Riders a, Riders b, Rides c,
                (SELECT
                a.ride_id,
                a.member_number AS leaderMemberNumber
                FROM Led_Ride a) LeaderTable,
                (SELECT
                a.ride_id,
                a.member_number AS sweepMemberNumber
                FROM Swept_Ride a) SweepTable
                WHERE a.member_number = LeaderTable.leaderMemberNumber 
                AND b.member_number = SweepTable.sweepMemberNumber
                AND LeaderTable.ride_id = SweepTable.ride_id
                AND SweepTable.ride_id = c.ride_id
                AND c.ride_date like "%${year}-%"
                ORDER BY c.ride_date DESC, c.ride_id ASC`, 
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
            connection.query(
                `SELECT member_number AS memberNumber,
                rider_firstName AS firstName,
                rider_lastName AS lastName,
                isMember 
                FROM Riders 
                WHERE member_number = ${member_number}`, 
                function(err, results){
                if(err) {
                    return reject(err);
                }

                resolve(results[0] || null);
            });
        });
    }
};