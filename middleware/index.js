module.exports = ({}) => {
    const authenticateRequest = (req, res, next) => {
        next();
    };
    return {authenticateRequest};
};