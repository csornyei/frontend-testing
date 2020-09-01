const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const mainRouter = require('./Routes/main');
const apiRouter = require('./Routes/api');
const middlewares = require('./utils/middlewares');
const config = require('./config');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect(config.mongoDBString,
    { useNewUrlParser: true, useUnifiedTopology: true}).then(() => {
    console.log('Connected to database')
})

app.use("/", middlewares.logger);

app.use("/api/", apiRouter);
app.use("/", mainRouter);
app.use("*", (req, res) => {
    console.log("404");
    res.status(404);
    res.send('404 - Page not found')
})

app.listen(3000, () => {
    console.log('Server running on port 3000');
});