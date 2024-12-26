export class ODESolver {
  /**
   * Solves an ODE using the Runge-Kutta 4th order method
   * @param {Function} f - The derivative function dy/dx = f(x, y)
   * @param {number} x0 - Initial x value
   * @param {number} y0 - Initial y value
   * @param {number} h - Step size
   * @param {number} steps - Number of steps
   * @returns {Object} Solution points { x: number[], y: number[] }
   */
  static rungeKutta4(f, x0, y0, h, steps) {
    // Ensure inputs are numbers
    if (
      typeof x0 !== 'number' || 
      typeof y0 !== 'number' || 
      typeof h !== 'number' || 
      !Number.isInteger(steps) || 
      steps < 1
    ) {
      throw new Error('Invalid input: Ensure x0, y0, and h are numbers, and steps is a positive integer.');
    }

    const x = [x0];
    const y = [y0];

    for (let i = 0; i < steps; i++) {
      const k1 = f(x[i], y[i]);
      const k2 = f(x[i] + h / 2, y[i] + k1 * h / 2);
      const k3 = f(x[i] + h / 2, y[i] + k2 * h / 2);
      const k4 = f(x[i] + h, y[i] + k3 * h);

      // Check for non-finite values
      if (!Number.isFinite(k1) || !Number.isFinite(k2) || !Number.isFinite(k3) || !Number.isFinite(k4)) {
        throw new Error(`Non-finite value encountered at step ${i + 1}.`);
      }

      x.push(Number((x[i] + h).toFixed(10))); // Avoid floating-point precision issues
      y.push(Number(((y[i] + (h / 6) * (k1 + 2 * k2 + 2 * k3 + k4)).toFixed(10))));
    }

    return { x, y };
  }
}

// At the end of the file
export default ODESolver;
