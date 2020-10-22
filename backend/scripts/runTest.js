const chromeLauncher = require('chrome-launcher');
const puppeteer = require('puppeteer');
const lighthouse = require('lighthouse');
const defautConfig = require('lighthouse/lighthouse-core/config/lr-desktop-config.js');
const reportGenerator = require('lighthouse/lighthouse-core/report/report-generator');
const request = require('request');
const util = require('util');
const chromium = require('chromium');
require('chromedriver');

exports.getJSONLighthouseReport = async (url, customConfig, cookies) => {
    try {
        const options = {
            logLevel: 'error',
            output: 'json',
            chromePath: chromium.path,
            disableDeviceEmulation: false,
            defaultViewport: {
                width: 1200,
                height: 900
            },
            chromeFlags: []
        };

        const chrome = await chromeLauncher.launch(options);
        options.port = chrome.port;

        const response = await util.promisify(request)(`http://localhost:${options.port}/json/version`);
        const {webSocketDebuggerUrl} = JSON.parse(response.body);
        const browser = await puppeteer.connect({browserWSEndpoint: webSocketDebuggerUrl});

        const page = (await browser.pages())[0];
        await page.setViewport({
            width: options.defaultViewport.width,
            height: options.defaultViewport.height
        });
        const cookiesWithUrl = cookies.map(cookieObject => ({...cookieObject, url: url}));
        await page.setCookie(...cookiesWithUrl);
        await page.goto(url, {waitUntil: 'networkidle2'});
        const lighthouseConfig = {...defautConfig, ...customConfig};
        const report = await lighthouse(page.url(), options, lighthouseConfig).then(results => results);
        const json = reportGenerator.generateReport(report.lhr, 'json');
        await browser.disconnect();
        await chrome.kill();
        return json;
    } catch (error) {
        throw Error(error);
    }
};

const hasScore = (categories, key) =>  Object.keys(categories).indexOf(key) !== -1;

exports.getLighthouseScores = (report) => {
    try {
        const scores = {};
        if (hasScore(report.categories, 'performance')) {
            scores.Performance = report.categories.performance.score;
        }
        if (hasScore(report.categories, 'accessibility')) {
            scores.Accessibility = report.categories.accessibility.score;
        }
        if (hasScore(report.categories, 'best-practices')) {
            scores["Best Practices"] = report.categories["best-practices"].score;
        }
        if (hasScore(report.categories, 'seo')) {
            scores.SEO = report.categories.seo.score;
        }
        if (hasScore(report.categories, 'pwa')) {
            scores.PWA = report.categories.pwa.score;
        }
        return scores;
    } catch {
        throw new Error('Error while getting lighthouse scores')
    }
};

const getMetricsFromAuditRefs = (auditRefs, audits) => {
    try {
        const metrics = [];
        auditRefs.forEach(({id, weight}) => {
            const audit = fixKeys(audits[id]);
            metrics.push({
                ...audit, weight
            });
        });
        return metrics;
    } catch {
        throw new Error('Error while getting metrics from audits')
    }

};

const isObject = (variable) => {
    return Object.prototype.toString.call(variable) === '[object Object]'
}

// MongoDB driver not allow '.' to be in keys
const fixKeys = (object) => {
    const newObject = {...object}
    Object.keys(newObject).forEach(key => {
        let newKey = key;
        while (newKey.indexOf('.') >= 0) {
            newKey = newKey.replace('.', '[dot]');
        }
        if (key !== newKey) {
            newObject[newKey] = isObject(newObject[key]) ? {...newObject[key]} : newObject[key];
            delete newObject[key];
        }
        if (isObject(newObject[newKey])) {
            newObject[newKey] = fixKeys(newObject[newKey]);
        }
    })
    return newObject;
}

exports.getMetrics = (report) => {
    const audits = report.audits;
    const categories = report.categories;
    const metrics = {};
    Object.keys(categories).forEach((categoryKey) => {
        const {id, auditRefs} = categories[categoryKey]
        metrics[id] = getMetricsFromAuditRefs(auditRefs, audits);
    })
    return metrics;
}