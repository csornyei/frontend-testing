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

exports.logger = logger