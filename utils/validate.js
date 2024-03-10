const { isValidObjectId } = require('mongoose');

exports.validate =
  (schema, params = false) =>
  (req, res, next) => {
    const { error, value } = schema.validate(params ? req.params : req.body);

    if (error) {
      return res.status(422).json({
        message: 'Validation Failed',
        error: error.details[0].message,
      });
    }

    if (params) req.params = value;
    else req.body = value;

    next();
  };

exports.validateObjectId = (id, helpers) => {
  if (!isValidObjectId(id)) return helpers.error('any.invalid');
  return id;
};
