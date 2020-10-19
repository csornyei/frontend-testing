const Result = require("../models/testResult");
const { getLighthouseScores, getMetrics } = require('../scripts/runTest');

const getAllResults = (filters = {}) => {
    return Result.find(filters);
}

const createTestConfig = (categories = undefined, mobile = false, mobileDataSpeed = 'none') => {
    let throttlingSettings = undefined;
    switch (mobileDataSpeed) {
        case '2g':
            throttlingSettings = {
                throughputKbps: 200,
                requestLatencyMs: 700
            }
            break;
        case '3g':
            throttlingSettings = {
                throughputKbps: 2 * 1024,
                requestLatencyMs: 200
            }
            break;
        case '4g':
            throttlingSettings = {
                throughputKbps: 20 * 1024,
                requestLatencyMs: 50
            }
            break;
    }
    const categoriesConfig = !!categories ? {onlyCategories: [...categories]} : {};
    return {
        extends: 'lighthouse:default',
        settings: {
            ...categoriesConfig,
            emulatedFormFactor: mobile ? 'mobile' : 'desktop',
            throttlingMethod: 'devtools',
            throttling: throttlingSettings
        }
    }
}

const createResult = (report) => {
    return new Result({
        date: Date.now(),
        url: report.finalUrl,
        scores: {
            ...getLighthouseScores(report)
        },
        metrics: {
            ...getMetrics(report)
        }
    }).save();
}

const getResultUrls = () => {
    return Result.distinct('url');
}

const getResultByID = (id) => {
    return Result.findOne({_id: id});
}

module.exports = {
    getAllResults,
    createTestConfig,
    createResult,
    getResultUrls,
    getResultByID
};