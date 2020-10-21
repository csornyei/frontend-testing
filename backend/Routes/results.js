const express = require('express');
const router = express.Router();
const { getAllResults, getFilteredResults, createTestConfig, createResult, getResultUrls, getResultByID, getCookiesByUrl, getThrottlingSettings } = require('../controllers/resultsController');
const { createErrorLog } = require('../controllers/logController');
const testRunner = require("../scripts/runTest");

router.get('/', async (req, res) => {
    const {
        url
    } = req.query;
    let filters = {};
    if (url) {
        filters.url = url;
    }
    res.send(await getAllResults(filters));
});

router.get('/filtered', async (req, res) => {
    const {
        url,
        categories,
        mobile,
        dataSpeed,
        cookies
    } = req.query;
    const filters = [];
    if (!!url) {
        filters.push({$match: {url:url}});
    }
    if (!!categories) {
        const categoriesArray = categories.split(',');
        filters.push({$match: {"config.settings.onlyCategories": { $all: categoriesArray}}})
    }
    if (!!mobile) {
        filters.push({$match: {"config.settings.emulatedFormFactor": mobile === "mobile" ? "mobile" : "desktop"}});
    }
    if (!!dataSpeed) {
        filters.push({$match: {"config.settings.throttling": getThrottlingSettings(dataSpeed) }});
    }
    if (!!cookies) {
        const cookiesObject = cookies.split(',').map(cookieString => {
            const splittedCookie = cookieString.split("=");
            return {
                name: splittedCookie[0],
                value: splittedCookie[1]
            }
        });
        filters.push({$match: {"cookies": {$all: cookiesObject}}})
    }
    res.send(await getFilteredResults(filters));
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
        return;
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

router.get('/cookies/', async (req, res) => {
    const url = req.query.url;
    if (url === undefined) {
        res.status(400);
        res.send({
            "Error": "Please send an url"
        })
        return;
    }
    try {
        const cookies = await getCookiesByUrl(url)
        res.send(cookies);
    } catch (error) {
        res.status(500);
        res.send({
            "Error": "Server error"
        })
    }
})

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