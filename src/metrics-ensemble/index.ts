import express, { Express, Request, Response} from 'express';
import dotenv from "dotenv";
import { KafkaConsumer } from './services/KafkaConsumer.service';
import { NewMetricRecordHandler } from './handlers/NewMetricRecordHandler';
import { MetricsDaoFactory } from '../common/dao/MetricsDaoFactory';
import { MetricFactory } from '../common/models/metrics/MetricFactory';

dotenv.config();
const port: number = parseInt(process.env.PORT as string);
if (!port) {
    console.log("PORT not specified. Exiting!");
    process.exit(1);
}

let metricsDaoFactory: MetricsDaoFactory = new MetricsDaoFactory();
let metricFactory: MetricFactory = new MetricFactory()
let newMessageHandler: NewMetricRecordHandler = new NewMetricRecordHandler(metricsDaoFactory, metricFactory);

const kafkaConsumer = new KafkaConsumer();
kafkaConsumer.start(newMessageHandler);