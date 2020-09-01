const express = require('express');
const router = express.Router();
const Result = require("../models/testResult");

router.get('/', async (req, res) => {
    const results = await Result.find();
    res.send(results);
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

router.post('/', async (req, res) => {
    const result = new Result({
        title: req.body.title,
        date: Date.now()
    });
    await result.save();
    res.send(result)
});

module.exports = router;