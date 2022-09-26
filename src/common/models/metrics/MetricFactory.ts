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
                throw new Error("createMetric:: Unsupported metrics type");
        }
        return metric;
    }

    public static metricFromJson(json: string): IMetric {
        if(!json) {
            throw new Error("No JSON provided");
        }

        const object = JSON.parse(json);
        if (!object.type) {
            throw new Error("Invalid JSON. Metric type missing");
        }

        let metric;
        switch(object.type) {
            case MetricType.METER:
                metric = new Meter(object.level, object.name, object.type, object.value, 
                    object.startTime, object.count, object.meanRate, object.updateTime);
                break;
            case MetricType.COUNTER:
                metric = new Counter(object.level, object.name, object.type, object.value, 
                    object.startTime, object.count, object.updateTime);
                break;
            case MetricType.TIMER:
                metric = new Timer(object.level, object.name, object.type, object.value, 
                    object.startTime, object.min, object.max, object.mean, object.sum, object.count,  object.updateTime);
                break;
            default:
                throw new Error("metricFromJson:: Unsupported metrics type");
        }
        return metric;
    }
}