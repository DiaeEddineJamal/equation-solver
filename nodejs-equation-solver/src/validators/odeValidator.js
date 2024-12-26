import Joi from 'joi';

const odeSchema = Joi.object({
  equation: Joi.string().required(),
  x0: Joi.number().required(),
  y0: Joi.number().required(),
  h: Joi.number().positive().required(),
  steps: Joi.number().integer().positive().required()
});

export function validateODEInput(req, res, next) {
  const { error } = odeSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      status: 'error',
      message: error.details[0].message
    });
  }
  next();
}