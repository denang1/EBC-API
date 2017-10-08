var express = require('express');
var riderRouter = express.Router();

module.exports = ({riderController}) => {
  riderRouter.route('/')
    .get(riderController.getRiders);
  riderRouter.route('/:riderId')
    .get(riderController.getRider);
    
    return riderRouter;
};
