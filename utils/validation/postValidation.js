

const Joi = require('joi');

const postSchema = Joi.object({
    title: Joi.string().required().max(100).messages({
        'string.empty': 'title is required.',
        'any.required': 'title is required.'
    }),
    description: Joi.string().required().min(10).messages({
        'string.empty': 'description is required.',
        'any.required': 'description is required.'
    }),
    createdBy: Joi.string().required().messages({
        'string.empty': 'post create user is required.',
        'any.required': 'post create user is required.'
    })
}, {
    timestamps: true,
});

module.exports = postSchema