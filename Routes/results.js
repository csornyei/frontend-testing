const express = require('express');
const router = express.Router();
const Result = require("../models/testResult");
const testRunner = require("../scripts/runTest");

router.get('/', async (req, res) => {
    const results = await Result.find();
    res.send(results);
});

router.post('/', async (req, res) => {
    // TODO - test if url is correct
    const {url} = req.body;
    jsonReport = await testRunner.getJSONLighthouseReport(url).catch((reason) => {
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
        res.status(500);
        console.log(e);
        res.send(e);
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
})

module.exports = router;