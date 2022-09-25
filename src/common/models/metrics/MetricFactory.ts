import { MetricRecord } from "../MetricRecord";
import { IMetric } from "./IMetric";
import { Meter } from "./Meter.metric";
import { MetricType } from "./MetricType";

export class MetricFactory {
    createMetric(record: MetricRecord): IMetric {
        if(!record) {
            throw new Error("No record provided");
        }

        console.log("MetricRecord #### ");
        console.log(record);

        let metric;
        switch(record.type) {
            case MetricType.METER:
                metric = new Meter(record.level, record.name, record.type, record.value);
                break;
            default:
                throw new Error("Unsupported metrics type");
        }
        return metric;
    }
}