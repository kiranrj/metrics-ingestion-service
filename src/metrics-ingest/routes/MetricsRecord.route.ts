import express, { Express, Request, Response } from 'express';
import { MetricRecordService } from '../services/MetricsRecord.service';

export const router = express.Router();

export class MetricRecordRoutes {
    readonly app: Express;
    readonly service: MetricRecordService;

    constructor(app: Express, service: MetricRecordService) {
        this.app = app;
        this.service = service;

        this.configureRoutes();
    }

    configureRoutes() {
        this.app.post(`/ingest/metrics/`, async(req: Request, res: Response) => {
            try{
                if (!req.body.name) {
                    console.log("Empty input. Skipping");
                    throw new TypeError("ERROR: empty input");
                }
                this.service
                    .post(req.body)
                    .then(k => res.status(200).send(`Record ${req.body.name} UPDATED`))
                    .catch(e => {
                        console.error("Failed to write message")
                        res.status(500).send(e.message)
                    });
            } catch (e: any) {
                res.status(500).send(e.message);
            }
        });
    }
}