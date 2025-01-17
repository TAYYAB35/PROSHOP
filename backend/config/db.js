import mongoose from 'mongoose'
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';


// Get the current directory of this file
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env file explicitly with relative path
dotenv.config({ path: path.resolve(__dirname, '../../.env') });


const MONGODB_URL = process.env.MONGO_URI;



const connectDB = async () => {
    try {
        const conn = await mongoose.connect(MONGODB_URL);
        console.log('mongodb connected', conn.connection.host);

    } catch (error) {
        console.log(`Erorr : ${error}`);
        process.exit(1);
    }
}
export default connectDB