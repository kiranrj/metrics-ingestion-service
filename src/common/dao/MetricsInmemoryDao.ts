import { IMetric } from "../models/metrics/IMetric";
import { Utils } from "../utils/Utils";
import { IMetricsDao } from "./IMetricsDao";

export class MetricsInmemoryDao implements IMetricsDao {
    inMemoryCache: Map<string, IMetric> = new Map();
    
    list = async(): Promise<IMetric[]> => {
        return [...this.inMemoryCache.values()];
    }

    get = async(name: string): Promise<IMetric | undefined> => {
        return this.inMemoryCache.get(name);
    }

    put = async(metric: IMetric): Promise<boolean> => {
        const key = Utils.getMetricKey(metric);
        return this.inMemoryCache.set(key, metric).has(key);
    }

    delete = async(name: string): Promise<boolean> => {
        return this.inMemoryCache.delete(name);
    }
}