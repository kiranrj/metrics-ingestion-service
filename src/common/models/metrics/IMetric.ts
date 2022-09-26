import { MetricRecord } from "../MetricRecord";
import { MetricType } from "./MetricType";

export interface IMetric {
    level: string;
    name: string;
    type: MetricType;

    process(record: MetricRecord) : IMetric;
}