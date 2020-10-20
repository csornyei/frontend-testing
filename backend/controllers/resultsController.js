const Result = require("../models/testResult");
const { getLighthouseScores, getMetrics } = require('../scripts/runTest');

const getAllResults = (filters = {}) => {
    return Result.find(filters);
}

const getThrottlingSettings = (mobileDataSpeed = 'none') => {
    switch (mobileDataSpeed) {
        case '2g':
            return {
                throughputKbps: 200,
                requestLatencyMs: 700
            }
        case '3g':
            return {
                throughputKbps: 2 * 1024,
                requestLatencyMs: 200
            }
        case '4g':
            return {
                throughputKbps: 20 * 1024,
                requestLatencyMs: 50
            }
        default: return undefined
    }
}

const createTestConfig = (categories = undefined, mobile = false, mobileDataSpeed = 'none') => {
    const categoriesConfig = !!categories ? {onlyCategories: [...categories]} : {};
    return {
        extends: 'lighthouse:default',
        settings: {
            ...categoriesConfig,
            emulatedFormFactor: mobile ? 'mobile' : 'desktop',
            throttlingMethod: 'devtools',
            throttling: getThrottlingSettings(mobileDataSpeed)
        }
    }
}

const extendConfigFile = (configData = {onlyCategories: {}, mobile: false, mobileDataSpeed: 'none'}) => {
    console.log(configData);
    return {
        extends: 'lighthouse:default',
        settings: {
            onlyCategories: [...configData.onlyCategories],
            emulatedFormFactor: configData.mobile ? 'mobile' : 'desktop',
            throttlingMethod: 'devtools',
            throttling: getThrottlingSettings(configData.mobileDataSpeed)
        }
    }
}

const createResult = (report, config, cookies) => {
    return new Result({
        date: Date.now(),
        url: report.finalUrl,
        scores: {
            ...getLighthouseScores(report)
        },
        metrics: {
            ...getMetrics(report)
        },
        config: {
            ...config
        },
        cookies: [
            ...cookies
        ]
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
    extendConfigFile,
    createResult,
    getResultUrls,
    getResultByID
};