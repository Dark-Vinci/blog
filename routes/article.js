const express = require('express');
const { Article, validate } = require('../model/articleM');
const router = express.Router();
const mongoose = require('mongoose');

const val = mongoose.Types.ObjectId;

router.get('/new', async (req, res) => {
    res.render('articles/new', { article: new Article() })
})

router.get('/:slug', async (req, res) => {
    const { slug } = req.params;

    const article = await Article.findOne({ slug });
    if (!article) {
        return res.redirect('/')
    } else {
        res.render('articles/show', article)
    }

});

router.get('/edit/:id' , async (req, res) => {
    const article = await Article.findById(req.params.id);
    res.render('articles/edit', { article });
});

router.put('/:id', async (req, res) => {
    const { error } = validate(req.body);

    if (error) {
        return res.status(400).send(error.details[0].message)
    } else {
        const { title, body1, body2, body3, quote } = req.body;
        const article = await Article.findById(req.params.id);
        article.set({
            title,
            body1,
            body2,
            body3,
            quote
        })

        try {
            await article.save();
            res.redirect(`/article/${ article.slug }`)
        } catch (ex) {
            res.render('articles/edit', { article: article })
        }
    }
})

router.post('/', async (req, res) => {
    const { error } = validate(req.body);

    if (error) {
        return res.status(400).send(error.details[0].message)
    } else {
        const { title, body1, body2, body3, quote } = req.body;

        const article = new Article({ 
            title,
            body1,
            body2,
            body3,
            quote
        });

        try {
            await article.save();
            res.redirect(`/article/${ article.slug }`)
        } catch (ex) {
            res.render('articles/new', { article: article })
        }
    }
})


router.put('/:id', async (req, res) => {

});

router.delete('/:id', async (req, res) => {
    await Article.findByIdAndRemove(req.params.id);
    res.redirect('/');
})

module.exports = router;