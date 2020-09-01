const express = require('express');
const resultsRoutes = require('./results');
const router = express.Router();

router.get('/', (req, res) => {
    console.log('API GET');
    res.send('API HOME')
});

router.post('/', (req, res) => {
    console.log(req.body);
    res.send('API POST')
});

router.use('/results/', resultsRoutes);

module.exports = router;