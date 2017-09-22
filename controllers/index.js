module.exports = ({}) => {
    const get = (req, res, next) => {
        res.send("hello world!");
    };

    const getMiles = (req, res) => {
        res.send({miles: 1000});
    };
    const post = (req, res, next) => {
        res.send({
            name: 'Dennis'
        });
    };
    return {get, post, getMiles};
};