import { IMetric } from "../models/metrics/IMetric";
import { Utils } from "../utils/Utils";
import { IMetricsDao } from "./IMetricsDao";
import { createClient } from "@redis/client";
import { MetricFactory } from "../models/metrics/MetricFactory";


export class MetricsRedisDao implements IMetricsDao {
    readonly redis;

    constructor() {
        this.redis = createClient({
            socket: {
                host: process.env.REDIS_HOST as string || "localhost",
                port: parseInt(process.env.REDIS_PORT as string) || 6379
            }
        });

        this.redis.on('connect', () => {
            console.log("Connected to Redis")
        });
        this.redis.on('error', (error: Error) => {
            console.error(`Redis connectio error ${error.message}`);
        });
        this.redis.connect();
    }

    list = async(): Promise<IMetric[]> => {
        let metrics = new Map<string, IMetric>();
        for await (const key of this.redis.scanIterator()) {
            const value = await this.redis.get(key)
            if (value) {
                metrics.set(key, JSON.parse(value));
            }
        }
        return [...metrics.values()];
    }

    get = async(name: string): Promise<IMetric | undefined> => {
        const value: string | null = await this.redis.get(name);
        
        if (value) {
            return MetricFactory.metricFromJson(value);
        }
        return undefined;
    }

    put = async(metric: IMetric): Promise<boolean> => {
        const key = Utils.getMetricKey(metric);
        return (await this.redis.set(key, JSON.stringify(metric)) != null);
    }

    delete = async(name: string): Promise<boolean> => {
        return (await this.redis.del(name) == 1);
    }
}