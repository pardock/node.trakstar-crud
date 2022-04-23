const Joi = require("joi");

const idValidator = Joi.number().min(1).required()

module.exports = {
    idValidator
}