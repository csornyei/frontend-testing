const Log = require('../models/logs');

const logger = async (req, _, next) => {
    const log = new Log({
        date: Date.now(),
        route: req.url,
        ip: req.ip
    });
    log.save();
    next()
}

const cors = async (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
}

exports.logger = logger
exports.cors = cors;