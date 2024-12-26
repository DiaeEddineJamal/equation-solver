import express from 'express'; // Utilisation d'import pour Express
import cors from 'cors'; // Utilisation d'import pour cors
import { errorHandler } from './middleware/errorHandler.js'; // Ajout de l'extension .js pour les fichiers locaux
import odeRouter from './routes/odeRouter.js'; // Ajout de l'extension .js
import pdeRouter from './routes/pdeRouter.js'; // Ajout de l'extension .js
import pinnRouter from './routes/pinnRouter.js'; // Ajout de l'extension .js

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// API routes
app.use('/api/v1/ode', odeRouter);
app.use('/api/v1/pde', pdeRouter);
app.use('/api/v1/pinn', pinnRouter); // Add the PINN router to handle PINN-specific requests

// Error handling middleware
app.use(errorHandler);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
