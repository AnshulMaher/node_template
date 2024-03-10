const joi = require('joi');
const { validate, validateObjectId } = require('../../utils/validate');

exports.getValidator = validate(
  joi.object({
    id: joi.custom(validateObjectId).required(),
  }),
  true,
);

exports.createValidator = validate(
  joi.object({
    name: joi.string().trim().required(),
    email: joi.string().email().required(),
  }),
);

exports.updateValidator = validate(
  joi.object({
    name: joi.string().trim().required(),
    email: joi.string().email().required(),
  }),
);
