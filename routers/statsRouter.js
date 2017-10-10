const express = require('express');
const statsRouter = express.Router();

module.exports = function(getRidersByMiles) {
    statsRouter.route('/ridersByMiles')
    .get(getRidersByMiles.statsController);

    return statsRouter;
};

// var router = require('statsRouter'); // function(value)
// var statsRouter = router()