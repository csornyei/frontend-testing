const mongoose = require('mongoose');

const schema = mongoose.Schema({
    date: Date,
    url: String,
    scores: {
        "Performance": Number,
        "Accessibility": Number,
        "Best Practices": Number,
        "SEO": Number,
        "PWA": Number
    },
    metrics: {
        "performance": Array,
        "accessibility": Array,
        "best-practices": Array,
        "seo": Array,
        "pwa": Array
    },
    config: Object,
    cookies: Array
})

module.exports = mongoose.model("TestResult", schema);