import express, {Express, Request, Response} from 'express';
import dotenv from 'dotenv';
import { MetricRoutes } from './routes/Metrics.route';
import { MetricsService } from './services/Metrics.service';
import { MetricsDaoFactory } from '../common/dao/MetricsDaoFactory';

dotenv.config();
const port: number = parseInt(process.env.API_PORT as string);
if (!port) {
    console.log("PORT not specified for API service. Exiting!");
    process.exit(1);
}

const app: Express = express();
app.use(express.json());

// Init routes
let metricsDaoFactory: MetricsDaoFactory = new MetricsDaoFactory();
const route = new MetricRoutes(app, new MetricsService(metricsDaoFactory));

app.get("/health/ping", (req: Request, res: Response) => {
    res.status(200).send("pong to API");
})

app.listen(port, () => {
    console.log(`⚡️ [server]: API service running on http://localhost:${port}`);
})

process.on('SIGINT', () => {
    console.log("Interrupted");
    process.exit(0);
});