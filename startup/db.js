const mongoose = require('mongoose');

module.exports = function () {
    mongoose.connect('mongodb://localhost/bloggie',{
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    })
        .then(() => console.log('connected to db...'))
        .catch((ex) => console.log('couldnt connect to the db..'));
}