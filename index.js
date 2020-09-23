const path = require('path');

const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const mainRouter = require('./Routes/main');
const apiRouter = require('./Routes/api');
const middlewares = require('./utils/middlewares');
const config = require('./config');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(helmet());
app.use('/static', express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', './views');

console.log(process.env);

mongoose.connect(process.env.DATABASE_URL,
    { useNewUrlParser: true, useUnifiedTopology: true}).then(() => {
    console.log('Connected to database');
})

app.use("/", middlewares.logger);
app.use("/", middlewares.cors);

app.use("/api/", apiRouter);
app.use("/", mainRouter);
app.use("*", (req, res) => {
    res.status(404);
    res.send('404 - Page not found')
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});