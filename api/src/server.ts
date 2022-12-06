import * as dotenv from 'dotenv';
import cors from 'cors';
import express from 'express';
import { connectToDatabase } from './database';
import { studentRouter } from './student.routes';

// Load environment variables from the .env file, where the ATLAS_URI is configured 
dotenv.config();

const { ATLAS_URI } = process.env;

if (!ATLAS_URI) {
    console.error('No ATLAS_URI configured');
    process.exit(1)
}

connectToDatabase(ATLAS_URI).then(() => {
    const app = express();
    app.use(cors());
    app.use('/students', studentRouter);
    app.listen(5200, () => {
        console.log('Server running on port http://localhost:5200 ...');
    })
}).catch((error) => {
    console.error(error);
});