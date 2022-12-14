import { MetricRecord } from "../MetricRecord";
import { MetricType } from "./MetricType";
import { MetricBase } from "./MetricBase";
import { IMetric } from "./IMetric";

export class Counter extends MetricBase {
    constructor(level: string, name: string, type: MetricType, value?: number, 
        startTime?: number, count?: number, updateTime?: number) {

        super(level, name, type, value, startTime, count, updateTime);
    }

    process(record: MetricRecord): IMetric {
        // We don't want the base overwriting the value. Hence don't tell super.process()
        this.value += record.value;

        this.updateTime = Date.now();

        return this;
    }
}