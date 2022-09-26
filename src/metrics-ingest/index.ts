import express, {Express, Request, Response} from 'express';
import dotenv from 'dotenv';
import { MetricRecordRoutes } from './routes/MetricsRecord.route';
import { MetricRecordService } from './services/MetricsRecord.service';

dotenv.config();
const port: number = parseInt(process.env.INGEST_PORT as string);
if (!port) {
    console.log("PORT not specified INGEST service. Exiting!");
    process.exit(1);
}

const app: Express = express();
app.use(express.json());

// Init routes
const route = new MetricRecordRoutes(app, new MetricRecordService());

app.get("/health/ping", (req: Request, res: Response) => {
    res.status(200).send("(ingestable) pong");
})

app.listen(port, () => {
    console.log(`⚡️ [server]: INGEST service running on http://localhost:${port}`);
})

process.on('SIGINT', () => {
    console.log("Interrupted");
    process.exit(0);
});