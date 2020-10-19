const path = require('path');
require('dotenv').config();
const express = require('express');

const helmet = require('helmet');
const bodyParser = require('body-parser');
const mainRouter = require('./Routes/main');
const apiRouter = require('./Routes/api');
const middlewares = require('./utils/middlewares');

const startServer = () => {
    const app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(helmet());
    app.use('/static', express.static(path.join(__dirname, 'public')));
    app.set('view engine', 'ejs');
    app.set('views', './views');

    app.use("/", middlewares.logger);
    app.use("/", middlewares.cors);

    app.use("/api/", apiRouter);
    app.use("/", mainRouter);
    app.use("*", (req, res) => {
        res.status(404);
        res.send('404 - Page not found')
    });

    const PORT = process.env.PORT || 8000;

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });

}


module.exports = {startServer};