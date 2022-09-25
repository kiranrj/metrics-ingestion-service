import { IMetric } from "../models/metrics/IMetric";

export interface IMetricsDao {
    list(): IMetric[];
    get(name: string): IMetric | undefined;
    put(metric: IMetric): boolean;
    delete(name: string): boolean;
}