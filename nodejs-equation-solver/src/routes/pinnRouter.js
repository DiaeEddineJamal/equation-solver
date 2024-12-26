import express from 'express';
import { validatePINNInput } from '../validators/pinnValidator.js';
import PINNSolver from '../solvers/pinnSolver.js';
import * as tf from '@tensorflow/tfjs';

const router = express.Router();

// Middleware to parse and validate equation function
const parseEquationFunction = (req, res, next) => {
    try {
        const { equation } = req.body;
        
        // Validate equation is a string that can be safely evaluated
        if (typeof equation !== 'string') {
            return res.status(400).json({
                success: false,
                message: 'Equation must be a valid function string'
            });
        }

        // Safely create a function from the string
        req.parsedEquation = new Function('x', 't', 'u', 'ux', 'uxx', 'ut', `return ${equation}`);
        
        next();
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Invalid equation format',
            error: error.message
        });
    }
};

// Helper function to validate input structure
const validateInputStructure = (input, type) => {
    if (!input) {
        throw new Error('Input configuration is missing');
    }

    if (!input.domain || !Array.isArray(input.domain)) {
        throw new Error('Domain must be a valid array');
    }

    if (!input.initialConditions || 
        !input.initialConditions.points || 
        !input.initialConditions.values) {
        throw new Error('Initial conditions must include points and values');
    }

    if (type === 'pde' && (!input.boundaryConditions || 
        !input.boundaryConditions.points || 
        !input.boundaryConditions.values)) {
        throw new Error('Boundary conditions must include points and values');
    }
};

// Route for solving ODEs using PINN
router.post('/solve-ode', [
    validatePINNInput, 
    parseEquationFunction
], async (req, res, next) => {
    try {
        const input = { ...req.body, method: 'pinn', type: 'ode' };
        
        // Validate input structure
        validateInputStructure(input, 'ode');

        // Create a new PINN solver instance with the provided configuration
        const solver = new PINNSolver(input.config || {});

        // Solve the ODE using the provided equation, initial conditions, and domain
        const solution = await solver.solveODE(
            req.parsedEquation,  // Use parsed equation function
            input.initialConditions,
            input.domain
        );

        // Return the solution as a JSON response
        res.status(200).json({
            success: true,
            method: 'PINN ODE Solver',
            solution,
        });
    } catch (error) {
        console.error('ODE Solving Error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to solve ODE',
            error: error.message
        });
    }
});

// Route for solving PDEs using PINN
router.post('/solve-pde', [
    validatePINNInput, 
    parseEquationFunction
], async (req, res, next) => {
    try {
        const input = { ...req.body, method: 'pinn', type: 'pde' };

        // Validate input structure
        validateInputStructure(input, 'pde');

        // Create a new PINN solver instance with the provided configuration
        const solver = new PINNSolver(input.config || {});

        // Solve the PDE using the provided equation, initial conditions, boundary conditions, and domain
        const solution = await solver.solvePDE(
            req.parsedEquation,  // Use parsed equation function
            input.initialConditions,
            input.boundaryConditions,
            input.domain
        );

        // Return the solution as a JSON response
        res.status(200).json({
            success: true,
            method: 'PINN PDE Solver',
            solution,
        });
    } catch (error) {
        console.error('PDE Solving Error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to solve PDE',
            error: error.message
        });
    }
});

// Global error handler for TensorFlow-related errors
router.use((err, req, res, next) => {
    if (err instanceof tf.TFError) {
        return res.status(400).json({
            success: false,
            message: 'TensorFlow computation error',
            error: err.message
        });
    }
    next(err);
});

export default router;
