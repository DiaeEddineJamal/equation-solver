import express from 'express';
import { validatePDEInput } from '../validators/pdeValidator.js';
import { PDESolver } from '../solvers/pdeSolver.js';
import { create, all } from 'mathjs'; // Correct import

const math = create(all); // Create a math.js instance

const router = express.Router();

router.post('/heat', validatePDEInput, (req, res) => {
  try {
    const { alpha, L, T, dx, dt, initialCondition } = req.body;
    
    // Convert initial condition string to function
    const ic = (x) => {
      return eval(initialCondition.replace(/x/g, x));
    };
    
    const solution = PDESolver.heat1D(alpha, L, T, dx, dt, ic);
    
    res.json({
      status: 'success',
      data: solution,
      metadata: {
        method: 'Finite Differences',
        spatialStep: dx,
        timeStep: dt
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
});

export default router;
