import { expect, test } from 'vitest';
import ODESolver from '../solvers/odeSolver';

test('solves simple linear ODE dy/dx = x', () => {
  const f = (x, y) => x;
  const solution = ODESolver.rungeKutta4(f, 0, 0, 0.1, 10);
  
  expect(solution.x).toHaveLength(11);
  expect(solution.y).toHaveLength(11);
  // y should approximate x²/2
  expect(solution.y[10]).toBeCloseTo(Math.pow(solution.x[10], 2) / 2, 2);
});