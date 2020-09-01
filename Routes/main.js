const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    console.log('MAIN PAGE');
    res.send('MAIN PAGE')
});


module.exports = router;