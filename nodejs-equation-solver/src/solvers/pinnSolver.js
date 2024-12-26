import * as tf from '@tensorflow/tfjs';

class PINNSolver {
    constructor(config) {
        this.learningRate = config.learningRate || 0.01;
        this.epochs = config.epochs || 1000;
        this.batchSize = config.batchSize || 32;
        this.networkArchitecture = config.networkArchitecture || [
            { units: 20, activation: 'tanh' },
            { units: 20, activation: 'tanh' },
            { units: 1, activation: 'linear' }
        ];
    }

    // Build the neural network model
    buildModel() {
        const model = tf.sequential();
        this.networkArchitecture.forEach(layerConfig => {
            model.add(tf.layers.dense({
                units: layerConfig.units,
                activation: layerConfig.activation,
                inputShape: layerConfig.inputShape || (model.layers.length === 0 ? [2] : undefined) // First layer input shape
            }));
        });
        model.compile({
            optimizer: tf.train.adam(this.learningRate),
            loss: 'meanSquaredError',
        });
        return model;
    }

    // Solve PDE using PINN
    async solvePDE(diffEq, initialConditions, boundaryConditions, domain) {
        this.problemType = 'pde';
        this.model = this.buildModel();
        const [xMin, xMax, tMin, tMax] = domain;
        const numPoints = 50; // Number of points for grid

        // Create meshgrid of x and t
        const x = tf.linspace(xMin, xMax, numPoints);
        const t = tf.linspace(tMin, tMax, numPoints);

        // Generate meshgrid for x and t
        const [X, T] = tf.meshgrid(x, t);

        // Flatten meshgrid arrays to pass to the model
        const X_flat = X.flatten();
        const T_flat = T.flatten();

        // Stack x and t into a 2D input tensor (shape: [numPoints^2, 2])
        const inputs = tf.stack([X_flat, T_flat], 1); // Shape [2500, 2] -> x, t pairs

        // Prepare initial condition points and values
        const icPoints = tf.tensor2d(initialConditions.points, [initialConditions.points.length / 2, 2]);
        const icValues = tf.tensor2d(initialConditions.values, [initialConditions.values.length, 1]);

        // Prepare boundary condition points and values
        const bcPoints = tf.tensor2d(boundaryConditions.points, [boundaryConditions.points.length / 2, 2]);
        const bcValues = tf.tensor2d(boundaryConditions.values, [boundaryConditions.values.length, 1]);

        const optimizer = tf.train.adam(this.learningRate);

        // Custom training loop
        for (let epoch = 0; epoch < this.epochs; epoch++) {
            await tf.tidy(() => {
                const loss = optimizer.minimize(() => {
                    // Predict the output using the model
                    const pred = this.model.predict(inputs);

                    // Physics loss (from the PDE equation)
                    const physicsLoss = this.computePDELoss(inputs, pred, diffEq);

                    // Initial conditions loss
                    const icPred = this.model.predict(icPoints);
                    const icLoss = tf.losses.meanSquaredError(icValues, icPred);

                    // Boundary conditions loss
                    const bcPred = this.model.predict(bcPoints);
                    const bcLoss = tf.losses.meanSquaredError(bcValues, bcPred);

                    // Total loss
                    return tf.add(physicsLoss, tf.add(icLoss, bcLoss));
                }, true);

                // Log progress every 100 epochs
                if (epoch % 100 === 0) {
                    loss.data().then((lossValue) => {
                        console.log(`Epoch ${epoch}: loss = ${lossValue}`);
                    });
                }
            });
        }

        // Return the results (predictions)
        const pred = this.model.predict(inputs);

        // Reshape the output to match the grid shape for visualization
        const predReshaped = await pred.reshape([numPoints, numPoints]).array();

        return {
            x: await x.array(),
            t: await t.array(),
            u: predReshaped,
        };
    }

    // Compute PDE loss (implement based on your specific equation)
    computePDELoss(inputs, predictions, diffEq) {
        // Assuming diffEq is a function of the form: (x, t, u, ux, uxx, ut)
        const [x, t] = inputs.split(1);  // Extract x and t from inputs
        const u = predictions;  // Predicted u
        // Compute the derivatives (ux, uxx, ut) using automatic differentiation (tf.gradients)
        const ux = tf.gradients(u, x);
        const uxx = tf.gradients(ux, x);
        const ut = tf.gradients(u, t);

        // Evaluate the PDE residual (ut - uxx) for each point
        const pdeResidual = diffEq(x, t, u, ux, uxx, ut);

        // Return loss as mean squared error
        return tf.losses.meanSquaredError(tf.zerosLike(pdeResidual), pdeResidual);
    }
}

export default PINNSolver;
