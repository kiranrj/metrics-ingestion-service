import express, { Express, Request, Response} from 'express';
import dotenv from "dotenv";
import { KafkaConsumer } from './services/KafkaConsumer.service';
import { NewMetricRecordHandler } from './handlers/NewMetricRecordHandler';
import { MetricsDaoFactory } from '../common/dao/MetricsDaoFactory';
import { MetricFactory } from '../common/models/metrics/MetricFactory';

dotenv.config();

let metricsDaoFactory: MetricsDaoFactory = new MetricsDaoFactory();
let metricFactory: MetricFactory = new MetricFactory()
let newMessageHandler: NewMetricRecordHandler = new NewMetricRecordHandler(metricsDaoFactory, metricFactory);

const kafkaConsumer = new KafkaConsumer();
kafkaConsumer.start(newMessageHandler);