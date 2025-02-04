import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const connectionString = process.env.ATLAS_URI;
console.log("MongoDB Connection String:", connectionString); // Log the connection string
console.log("Attempting to connect to MongoDB..."); // Log before connecting

async function connectToDatabase() {
    try {
        const client = new MongoClient(connectionString); // Removed deprecated options
        await client.connect();
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
        let db = client.db("records");
        return db;
    } catch (err) {
        console.error("Failed to connect to MongoDB:", err.message);
        process.exit(1); // Exit the process if the connection fails
    }
}

export default connectToDatabase;
