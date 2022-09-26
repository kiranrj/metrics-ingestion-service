import { IMetric } from "../models/metrics/IMetric";

export interface IMetricsDao {
    list(): Promise<IMetric[]>;
    get(name: string): Promise<IMetric | undefined>;
    put(metric: IMetric): Promise<boolean>;
    delete(name: string): Promise<boolean>;
}