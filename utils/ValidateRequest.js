//* Include joi to check error type
// const Joi = require('joi')
//* Include all validators
const { errorResponse } = require('./prepareResponse')
const Validators = require('./validation')

module.exports = function (validator) {
  //! If validator is not exist, throw err
  if (!Validators.hasOwnProperty(validator)) {
    throw new Error(`'${validator}' validator is not exist`)
  }

  return async function (req, res, next) {
    try {
      const validated = await Validators[validator].validateAsync(req.body)
      req.body = validated
      next()
    } catch (error) {
      if (error.isJoi) {
        return res.status(422).json(errorResponse(error.message,422))
      }
      return next(error)
    }
  }
}