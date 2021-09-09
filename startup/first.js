const { Article } = require('../model/articleM');

module.exports = function (app) {
    app.get('/', async (req, res) => {
        const articles = await Article.find()
            .sort('-createdAt');
        res.render('articles/index', { articles: articles });
    })
}