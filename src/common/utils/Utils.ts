import { MetricRecord } from "../models/MetricRecord";
import { IMetric } from "../models/metrics/IMetric";

export class Utils {
    public static getRecordKey(record: MetricRecord) {
        return record ? `${record.level}.${record.name}` : "null";
    }

    public static getMetricKey(metric: IMetric) {
        return metric ? `${metric.level}.${metric.name}` : "null";
    }
}