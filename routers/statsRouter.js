const express = require('express');
const statsRouter = express.Router();

module.exports = function(statsController) {
    statsRouter.route('/ridersByMiles')
        .get(statsController.getRidersByMiles);
    statsRouter.route('/ridesByDate')
        .get(statsController.getRidesByDate);

    return statsRouter;
};