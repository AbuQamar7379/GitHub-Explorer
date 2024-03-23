const httpStatus = require("http-status");

/**
 * Middleware to validate query parameters based on a Joi schema.
 * @param {import('@hapi/joi').ObjectSchema} schema - Joi schema for query validation.
 * @returns {Function} Express middleware function.
 */
const validateQuery = (schema) => (req, res, next) => {
  let { error } = schema.query.validate(req.query);

  if (error) {
    return res.status(httpStatus.BAD_REQUEST).send({ message: error });
  }

  next();
};

/**
 * Middleware to validate request body based on a Joi schema.
 * @param {import('@hapi/joi').ObjectSchema} schema - Joi schema for body validation.
 * @returns {Function} Express middleware function.
 */
const validateBody = (schema) => (req, res, next) => {
  let { error } = schema.body.validate(req.body);

  if (error) {
    return res.status(httpStatus.BAD_REQUEST).send({ message: error });
  }

  next();
};

module.exports = { validateQuery, validateBody };
