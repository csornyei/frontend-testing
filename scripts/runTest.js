const chromeLauncher = require('chrome-launcher');
const puppeteer = require('puppeteer');
const lighthouse = require('lighthouse');
const config = require('lighthouse/lighthouse-core/config/lr-desktop-config.js');
const reportGenerator = require('lighthouse/lighthouse-core/report/report-generator');
const request = require('request');
const util = require('util');

exports.getJSONLighthouseReport = async (url) => {
    console.log('lighthouse report')
    const options = {
        logLevel: 'error',
        output: 'json',
        disableDeviceEmulation: true,
        defaultViewport: {
            width: 1200,
            height: 900
        },
        chromeFlags: ['--disable-mobile-emulation', '--headless']
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
    await page.goto(url, {waitUntil: 'networkidle2'});

    const report = await lighthouse(page.url(), options, config).then(results => results);
    const json = reportGenerator.generateReport(report.lhr, 'json');

    await browser.disconnect();
    await chrome.kill();
    console.log('returning json')
    return json;
};

exports.getLighthouseScores = (report) => {
    const scores = {};
    scores.Performance = report.categories.performance.score;
    scores.Accessibility = report.categories.accessibility.score;
    scores["Best Practices"] = report["categories"]["best-practices"]["score"];
    scores.SEO = report.categories.seo.score;
    scores.PWA = report.categories.pwa.score;
    return scores;
};

const getMetricsFromAuditRefs = (auditRefs, audits) => {
    const metrics = [];
    auditRefs.forEach(({id, weight}) => {
        const audit = fixKeys(audits[id]);
        metrics.push({
            ...audit, weight
        });
    });
    return metrics;
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