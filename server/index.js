import { createServer } from 'http';
import { config } from 'dotenv';
import mongoose from 'mongoose';

import app from './express.js';

// Load environment variables from .env file
config();

const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;

// setup mongodb connection
mongoose.Promise = global.Promise;
mongoose.connect(MONGO_URL);
mongoose.connection.on('error', () => console.log(`cannot connect to database: ${MONGO_URL}\n ${e}`));

// setup server
const server = createServer(app);

// start server
server.listen(PORT);

server.on('listening', () => console.log(`server started on ${PORT}`));