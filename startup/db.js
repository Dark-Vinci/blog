const mongoose = require('mongoose');
const config = require('config');

module.exports = function () {
    const db = config.get('db');

    mongoose.connect(db, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    })
        .then(() => console.log('connected to db...', db))
        .catch((ex) => console.log('couldnt connect to the db..'));
}