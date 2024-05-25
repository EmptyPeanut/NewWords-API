// Dotenv import
import * as dotenv from 'dotenv';
const dotenvPath = process.env.NODE_ENV === 'development' ? './docker/dev/.env' : './.env';
dotenv.config({path: dotenvPath});

import http from "http";
import sequelize from './database/connection';
import createServer from './utils/server';


sequelize.sync().then(() => {
    console.log('Tables syncronisées');
}).catch((error) => {
    console.log(error);
})



const app = createServer();
const server = http.createServer(app);

server.listen(process.env.NODE_ENV === 'development' ? 3000 : 443, () => {
    console.log("Le serveur tourne sur http://localhost:3000/");
})