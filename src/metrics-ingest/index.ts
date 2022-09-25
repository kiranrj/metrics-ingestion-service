import express, {Express, Request, Response} from 'express';
import dotenv from 'dotenv';
import { MetricRecordRoutes } from './routes/MetricRecord.route';
import { MetricRecordService } from './services/MetricRecord.service';

dotenv.config();
const port: number = parseInt(process.env.PORT as string);
if (!port) {
    console.log("PORT not specified. Exiting!");
    process.exit(1);
}

const app: Express = express();
app.use(express.json());

// Init routes
const route = new MetricRecordRoutes(app, new MetricRecordService());

app.get("/health/ping", (req: Request, res: Response) => {
    res.status(200).send("pong");
})

const server = app.listen(port, () => {
    console.log(`⚡️ [server]: Server is running http://localhost:${port}`);
})
console.log("Server started");

process.on('SIGINT', () => {
    console.log("Interrupted");
    process.exit(0);
});