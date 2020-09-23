const express = require('express');
const router = express.Router();
const Logs = require('../models/logs');

router.get('/', (req, res) => {
    console.log('MAIN PAGE');
    res.send('MAIN PAGE')
});

router.get('/logs', async (req, res) => {
    const logs = await Logs.find().select('route date');
    const routeCounts = await Logs.aggregate(
        [{
            $group: {
                _id: '$route',
                count: {
                    $sum: 1
                }
            }
        }
        ]
    );
    res.render('logs', {
        title: 'Logs',
        logs: logs,
        logsAmount: logs.length,
        distinctRoutes: routeCounts.sort((a, b) => b.count - a.count),
    });
});


module.exports = router;