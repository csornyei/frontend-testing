const Log = require("../models/logs");

const createSimpleLog = (url, ip) => {
    new Log({
        type: 'log',
        date: Date.now(),
        route: url,
        ip: ip
    }).save();
}

const createErrorLog = (url, ip, error) => {
    new Log({
        type: 'error',
        date: Date.now(),
        route: url,
        ip: ip,
        error: error
    }).save();
}

module.exports = {
    createSimpleLog,
    createErrorLog
};