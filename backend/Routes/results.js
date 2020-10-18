const express = require('express');
const router = express.Router();
const Result = require("../models/testResult");
const Log = require("../models/logs");
const testRunner = require("../scripts/runTest");

router.get('/', async (req, res) => {
    const url = req.query.url;
    const filters = {}
    if (url) {
        filters.url = url;
    }
    const results = await Result.find(filters);
    res.send(results);
});

router.post('/', async (req, res) => {
    const {url, categories, mobile, mobileDataSpeed, cookies} = req.body;

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
    const config = {
        extends: 'lighthouse:default',
        settings: {
            ...categoriesConfig,
            emulatedFormFactor: mobile ? 'mobile' : 'desktop',
            throttlingMethod: 'devtools',
            throttling: throttlingSettings
        }
    }

    const jsonReport = await testRunner.getJSONLighthouseReport(url, config, cookies).catch(async (reason) => {
        await new Log({
            date: Date.now(),
            route: req.url,
            ip: req.ip,
            error: reason
        }).save();
        res.status(500);
        res.send({
            "Error": "Error while generating lighthouse report"
        });
    });
    const parsedReport = JSON.parse(jsonReport);
    try {
        const results = new Result({
            date: Date.now(),
            url: parsedReport.finalUrl,
            scores: {
                ...testRunner.getLighthouseScores(parsedReport)
            },
            metrics: {
                ...testRunner.getMetrics(parsedReport)
            }
        })
        await results.save();
        res.send(results)
    } catch (e) {
        const log = new Log({
            date: Date.now(),
            route: req.url,
            ip: req.ip,
            error: e
        });
        await log.save();
        res.status(500);
        res.send(e);
    }


});

router.get('/urls', async (req, res) => {
    try {
        const result = await Result.distinct('url');
        res.send(result);
    } catch(error) {
        const log = new Log({
            date: Date.now(),
            route: req.url,
            ip: req.ip,
            error: error
        });
        await log.save();
        res.status(500);
        res.send({error: "Server Error"});
    }
});

router.get('/:id', async (req, res) => {
    try {
        const result = await Result.findOne({_id: req.params.id});
        if (result == null) {
            res.status(404);
            res.send({error: "Result doesn't exists!"})
            return
        }
        res.send(result);
    } catch {
        res.status(404);
        res.send({error: "Result doesn't exists!"})
    }
});

module.exports = router;