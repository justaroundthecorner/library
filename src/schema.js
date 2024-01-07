const Joi = require('joi');
const schemas = {
  user: Joi.object().keys({
    name: Joi.string().pattern(/^[A-Za-z\s]+$/).trim().required()
  }),
  book: Joi.object().keys({
    name: Joi.string().trim().required()
  })
};
module.exports = schemas;
