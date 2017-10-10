module.exports = function(dbUtil) {
    const getRidersByMiles = function(req, res, next) {
        dbUtil.getRidersByMiles(req.query.year)
        .then(function(results) {
            res.json(results);
        })
        .catch(function(err) {
            res.status(400).send(err);            
        });
    };

    return getRidersByMiles;
};