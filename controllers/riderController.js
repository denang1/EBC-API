module.exports = function(dbUtil) {
    const getRiders = function(req, res, next) {
        dbUtil.getAllRiders()
        .then(function(riders) {
            res.json(riders);
        })
        .catch(function(err) {
            res.status(400).send(err); 
        });
    };
    
    const getRider = function(req, res, next) {
        dbUtil.getRider(parseInt(req.params.riderId))
        .then(function(rider) {
            res.json(rider);
        })
        .catch(function(err) {
            res.status(400).send(err);
        });
    };

    return {getRiders, getRider};
};
