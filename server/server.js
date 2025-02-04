import express from 'express';
import cors from 'cors';
import records from './routes/record.js'; // Adjust the path as necessary
import invoices from './routes/invoices.js'; // Adjust the path as necessary
import connectToDatabase from './db/connection.js';

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

async function startServer() {
    try {
        console.log("Attempting to connect to the database..."); // Log before connecting
        await connectToDatabase(); // Attempt to connect to the database
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Error starting the server:", error);
    }
}

startServer();
