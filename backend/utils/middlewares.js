const { createSimpleLog } = require('../controllers/logController');

const logger = (req, _, next) => {
    createSimpleLog(req.url, req.ip);
    next();
}

const cors = async (_, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
}

exports.logger = logger
exports.cors = cors;