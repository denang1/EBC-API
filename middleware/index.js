module.exports = ({}) => {
    const authenticateRequest = (req, res, next) => {
        const isValidApiKey = req.headers.hasOwnProperty('authorization') && req.headers['authorization'] === 'api-key';
        if(isValidApiKey)
            next();
        else
            res.status(400).send('invalid api key'); 
    };
    return {authenticateRequest};
};