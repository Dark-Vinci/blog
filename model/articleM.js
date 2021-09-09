const mongoose = require('mongoose');
const { Schema } = require('mongoose');
const Joi = require('joi');
const slugify = require('slugify');

const articleSchema = new Schema({
    title: {
        type: String,
        minlength: 1,
        maxlength: 30,
        required: true
    },

    body1: {
        type: String,
        minlength: 1,
        maxlength: 3000,
        required: true
    },

    body2: {
        type: String,
        minlength: 1,
        maxlength: 3000
    },

    body3: {
        type: String,
        minlength: 1,
        maxlength: 3000
    },

    quote: {
        type: String,
        minlength: 1,
        maxlength: 100,
        trim: true
    },

    slug: {
        type: String,
        minlength: 2,
        maxlength: 30
    },

    createdAt: {
        type:  Date,
        required: true,
        default: Date.now,
        unique: true
    }
});

articleSchema.pre('validate', function (next) {
    if (this.title) {
        this.slug = slugify(this.title, { lower: true, strict: true })
    }

    next();
})

const Article = mongoose.model('Article', articleSchema);

function validate(inp) {
    const schema = Joi.object({
        title: Joi.string()
            .required()
            .min(1)
            .max(30),

        body1: Joi.string()
            .required()
            .min(1)
            .max(30000),

        body2: Joi.string()
            .min(1)
            .max(3000),

        body3: Joi.string()
            .min(5)
            .max(3000),

        quote: Joi.string()
            .min(1)
            .max(30)
    });

    const result = schema.validate(inp);
    return result;
}

module.exports.Article = Article;
module.exports.validate = validate;