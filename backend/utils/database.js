const mongoose = require('mongoose');

module.exports = {
    connectToDatabase: async () => {
        await mongoose.connect(process.env.DATABASE_URL,
            { useNewUrlParser: true, useUnifiedTopology: true}).then(() => {
            console.log('Connected to database');
        });
    }
}