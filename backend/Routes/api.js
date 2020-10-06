const express = require('express');
const resultsRoutes = require('./results');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('API HOME')
});

router.post('/', (req, res) => {
    res.send('API POST')
});

router.use('/results/', resultsRoutes);

module.exports = router;