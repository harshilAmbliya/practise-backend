const Joi = require('joi');

const userSchema = Joi.object({
    name: Joi.string().required().messages({
        'string.empty': 'name is required.',
        'any.required': 'name is required.'
    }),
    email: Joi.string().email().required().messages({
        'string.empty': 'email is required.',
        'any.required': 'email is required.',
        'string.email': 'email is not valid.'
    }),
    password: Joi.string().required().messages({
        'string.empty': 'password is required.',
        'any.required': 'password is required.'
    }),
    posts: Joi.array().items(Joi.string())
},{
    timestamps: true,
});

module.exports = userSchema