import { create, all } from 'mathjs'; // Correct import

const math = create(all); // Create a math.js instance
export class PDESolver {
  /**
   * Solves a 1D heat equation using finite differences
   * @param {number} alpha - Thermal diffusivity
   * @param {number} L - Length of domain
   * @param {number} T - Total time
   * @param {number} dx - Space step
   * @param {number} dt - Time step
   * @param {Function} ic - Initial condition function
   * @returns {Object} Solution grid { t: number[], x: number[], u: number[][] }
   */
  static heat1D(alpha, L, T, dx, dt, ic) {
    const nx = Math.floor(L/dx);
    const nt = Math.floor(T/dt);
    
    // Initialize grid
    const x = math.range(0, L + dx, dx).toArray();
    const t = math.range(0, T + dt, dt).toArray();
    const u = Array(nt + 1).fill().map(() => Array(nx + 1).fill(0));
    
    // Set initial condition
    for (let i = 0; i <= nx; i++) {
      u[0][i] = ic(x[i]);
    }
    
    // Solve using explicit scheme
    const r = alpha * dt / (dx * dx);
    for (let n = 0; n < nt; n++) {
      for (let i = 1; i < nx; i++) {
        u[n+1][i] = r * (u[n][i+1] - 2*u[n][i] + u[n][i-1]) + u[n][i];
      }
      // Boundary conditions (assuming zero at boundaries)
      u[n+1][0] = 0;
      u[n+1][nx] = 0;
    }
    
    return { t, x, u };
  }
}
