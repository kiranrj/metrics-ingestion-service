import express, { Express, Request, Response} from 'express';
import dotenv from "dotenv";
import { KafkaConsumer } from './services/KafkaConsumer.service';

dotenv.config();
const port: number = parseInt(process.env.PORT as string);
if (!port) {
    console.log("PORT not specified. Exiting!");
    process.exit(1);
}

const kafkaConsumer = new KafkaConsumer();
kafkaConsumer.start();