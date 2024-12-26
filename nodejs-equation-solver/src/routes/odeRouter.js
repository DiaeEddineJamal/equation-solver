import express from 'express';
import { validateODEInput } from '../validators/odeValidator.js';
import { ODESolver } from '../solvers/odeSolver.js';


const router = express.Router();

router.post('/solve', validateODEInput, (req, res) => {
  try {
    const { equation, x0, y0, h, steps } = req.body;

    // Convert equation string to function
    const f = new Function('x', 'y', `return ${equation};`);

    const solution = ODESolver.rungeKutta4(f, x0, y0, h, steps);

    res.json({
      status: 'success',
      data: solution,
      metadata: {
        method: 'Runge-Kutta 4th order',
        steps,
        stepSize: h
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
