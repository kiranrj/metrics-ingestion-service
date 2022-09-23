import express, {Express, Request, Response} from 'express';
import dotenv from 'dotenv';
import { MetricsRecordRoutes } from './routes/MetricsRecord.route';
import { MetricRecordService } from './services/MetricsRecord.service';

dotenv.config();
const port: number = parseInt(process.env.PORT as string);
if (!port) {
    console.log("PORT not specified. Exiting!");
    process.exit(1);
}

const app: Express = express();
app.use(express.json());

// Init routes
const route = new MetricsRecordRoutes(app, new MetricRecordService());

app.get("/health/ping", (req: Request, res: Response) => {
    res.status(200).send("pong");
})

app.listen(port, () => {
    console.log(`⚡️ [server]: Server is running http://localhost:${port}`);
})
