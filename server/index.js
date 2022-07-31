import { createServer } from 'http';
import { config } from 'dotenv';
import mongoose from 'mongoose';

// Load environment variables from .env file
config();

const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/mews';

// setup mongodb connection
mongoose.Promise = global.Promise;
mongoose.connect(MONGO_URL);
mongoose.connection.on('error', () => console.log(`cannot connect to database: ${MONGO_URL}\n ${e}`));

// setup server
const server = createServer();

// start server
server.listen(PORT);

server.on('listening', () => console.log(`server started on ${PORT}`));