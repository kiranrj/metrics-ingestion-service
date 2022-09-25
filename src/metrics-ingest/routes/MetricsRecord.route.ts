import express, { Express, Request, Response } from 'express';
import { MetricRecordService } from '../services/MetricRecord.service';

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
        this.app.get(`/data/metrics`, async(req: Request, res: Response) => {
            try{
                const records = await this.service.list();
                res.status(200).send(records);
            } catch (e) {
                res.status(500).send(e);
            }
        });

        this.app.get(`/data/metrics/:name`, async(req: Request, res: Response) => {
            try{
                const record = await this.service.get(req.params.name);
                res.status(200).send(record);
            } catch (e) {
                res.status(500).send(e);
            }
        });

        this.app.post(`/data/metrics/`, async(req: Request, res: Response) => {
            try{
                if (!req.body.name) {
                    console.log("Empty input. Skipping");
                    throw new TypeError("ERROR: empty input");
                }
                await this.service.post(req.body);
                res.status(200).send(`Record ${req.body.name} UPDATED`);
            } catch (e: any) {
                res.status(500).send(e.message);
            }
        });

        this.app.delete(`/data/metrics/:name`, async(req: Request, res: Response) => {
            try{
                await this.service.delete(req.params.name);
                res.status(200).send(`Record ${req.params.name} DELETED`);
            } catch (e) {
                res.status(500).send(e);
            }
        });
    }
}