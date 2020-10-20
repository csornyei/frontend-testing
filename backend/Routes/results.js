const express = require('express');
const router = express.Router();
const { getAllResults, createTestConfig, createResult, getResultUrls, getResultByID } = require('../controllers/resultsController');
const { createErrorLog } = require('../controllers/logController');
const testRunner = require("../scripts/runTest");

router.get('/', async (req, res) => {
    const url = req.query.url;
    const filters = {}
    if (url) {
        filters.url = url;
    }
    res.send(await getAllResults(filters));
});

router.post('/', async (req, res) => {
    const {url, categories, mobile, mobileDataSpeed, cookies} = req.body;
    const config = createTestConfig(categories, mobile, mobileDataSpeed);
    const jsonReport = await testRunner.getJSONLighthouseReport(url, config, cookies).catch((error) => {
        createErrorLog(req.url, req.ip, error);
        res.status(500);
        res.send({
            "Error": "Error while generating lighthouse report"
        });
        return;
    });
    let parsedReport;
    try {
        parsedReport = JSON.parse(jsonReport);
    } catch (error) {
        createErrorLog(req.url, req.ip, error);
        res.status(500);
        res.send({
            "Error": "Error while parsing report"
        });
        return;
    }
    try {
        res.send(await createResult(parsedReport, config, cookies));
    } catch (error) {
        createErrorLog(req.url, req.ip, error);
        res.status(500);
        res.send({
            ...error,
            "Error": "Error while creating result object"
        });
        return;
    }
});

router.get('/urls', async (req, res) => {
    try {
        res.send(await getResultUrls());
    } catch(error) {
        createErrorLog(req.url, req.ip, error)
        res.status(500);
        res.send({error: "Server Error"});
    }
});

router.get('/:id', async (req, res) => {
    try {
        const result = await getResultByID(req.params.id);
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