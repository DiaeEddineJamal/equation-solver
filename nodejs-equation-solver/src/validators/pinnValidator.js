import Joi from 'joi';

const pinnSchema = Joi.object({
    equation: Joi.string().required(),
    domain: Joi.array().items(Joi.number()).length(4).required(),
    initialConditions: Joi.object({
        points: Joi.array().items(Joi.number()).required(),
        values: Joi.array().items(Joi.number()).required()
    }).required(),
    boundaryConditions: Joi.object({
        points: Joi.array().items(Joi.number()).required(),
        values: Joi.array().items(Joi.number()).required()
    }).required(),
    config: Joi.object({
        learningRate: Joi.number().required(),
        epochs: Joi.number().required(),
        batchSize: Joi.number().required(),
        networkArchitecture: Joi.array().items(
            Joi.object({
                units: Joi.number().required(),
                activation: Joi.string().valid('tanh', 'relu', 'sigmoid', 'linear').required()
            })
        ).required()
    }).required(),
});

const validatePINNInput = (req, res, next) => {
    const { error } = pinnSchema.validate(req.body);
    
    // If validation fails, return an error response
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    
    // If validation passes, move to the next middleware/route handler
    next();
};

export { validatePINNInput };
