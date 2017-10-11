const express = require('express');
const riderRouter = express.Router();

module.exports = function(riderController) {
  riderRouter.route('/')
    .get(riderController.getRiders);
  riderRouter.route('/:riderId')
    .get(riderController.getRider);
    
    return riderRouter;
};
