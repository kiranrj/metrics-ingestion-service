import { IMetric } from "../models/metrics/IMetric";
import { Utils } from "../utils/Utils";
import { IMetricsDao } from "./IMetricsDao";

export class MetricsInmemoryDao implements IMetricsDao {
    inMemoryCache: Map<string, IMetric> = new Map();
    
    list(): IMetric[] {
        return [...this.inMemoryCache.values()];
    }

    get(name: string): IMetric | undefined {
        return this.inMemoryCache.get(name);
    }

    put(metric: IMetric): boolean {
        const key = Utils.getMetricKey(metric);
        return this.inMemoryCache.set(key, metric).has(key);
    }

    delete(name: string): boolean {
        return this.inMemoryCache.delete(name);
    }
}