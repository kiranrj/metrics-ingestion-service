import { MetricRecord } from "../MetricRecord";
import { Counter } from "./Counter.metric";
import { IMetric } from "./IMetric";
import { Meter } from "./Meter.metric";
import { MetricType } from "./MetricType";
import { Timer } from "./Timer.metric";

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
            case MetricType.COUNTER:
                metric = new Counter(record.level, record.name, record.type, record.value);
                break;
            case MetricType.TIMER:
                metric = new Timer(record.level, record.name, record.type, record.value);
                break;
            default:
                throw new Error("Unsupported metrics type");
        }
        return metric;
    }
}