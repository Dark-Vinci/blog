
module.exports = function (app) {
    require('./startup/db')();
    require('./startup/routes')(app);
    require('./startup/first')(app);
}