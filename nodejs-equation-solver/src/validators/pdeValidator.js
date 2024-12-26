import Joi from 'joi';

// Create a custom Joi validation to ensure the initial condition is a valid mathematical expression.
const validateInitialCondition = (value, helpers) => {
  try {
    // Try evaluating the expression with math.js or a safe evaluation approach.
    // You could use math.js here, but for simplicity, we assume it's a basic valid expression
    // For more complex validation, consider using math.js like in the previous solution.
    new Function('x', `return ${value}`); // This is just for basic syntax checking (make sure the expression is evaluable).
    return value;
  } catch (err) {
    return helpers.error('any.invalid');
  }
};

const pdeSchema = Joi.object({
  alpha: Joi.number().positive().required(),
  L: Joi.number().positive().required(), // Corrected the key
  T: Joi.number().positive().required(), // Corrected the key
  dx: Joi.number().positive().required(),
  dt: Joi.number().positive().required(),
  initialCondition: Joi.string().custom(validateInitialCondition, 'Initial Condition Validation').required()
}).options({ stripUnknown: true });

export function validatePDEInput(req, res, next) {
  const { error } = pdeSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      status: 'error',
      message: `Validation failed: ${error.details[0].message}`  // More descriptive error message
    });
  }
  next();
}
