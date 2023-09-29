import express, { Express } from "express";
import dotenv from 'dotenv';

import userRoutes from './routes/userRoutes'
import gameRoutes from './routes/gameRoutes';

import bodyParser from 'body-parser';
import dbConnect from "./util/dbConnect";

dotenv.config();

const app:Express = express();
const port = process.env.PORT;

// Middleware setup
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/user', userRoutes);

//game Routes
app.use('/api/game', gameRoutes);

const startServer = async()=>{
    try{
        await dbConnect(process.env.MONGO_CONNECT_URL as string);
       
       app.listen(port, ()=>{
        console.log(`app listening in port ${port}`)
       })
    }catch(error){

        console.log(error)
    };
    
}
startServer();
