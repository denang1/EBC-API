var express = require('express');
var router = express.Router();

module.exports = ({controller}) => {
  router.route('/')
    .get(controller.get)
    .post(controller.post);

    router.route('/miles')
      .get(controller.getMiles);
    return router;
};
