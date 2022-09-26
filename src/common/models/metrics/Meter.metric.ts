import { MetricRecord } from "../MetricRecord";
import { MetricType } from "./MetricType";
import { MetricBase } from "./MetricBase";
import { IMetric } from "./IMetric";

export class Meter extends MetricBase {

    meanRate: number;

    constructor(level: string, name: string, type: MetricType, value?: number, 
        startTime?: number, count?: number, meanRate?: number, updateTime?: number) {

        super(level, name, type, value, startTime, count, updateTime);

        this.meanRate = meanRate ?? 0;
    }

    process(record: MetricRecord): void {
        super.process(record); 
        this.meanRate = (this.count == 1) ? 0 : this.getMeanRate();
    }

    getMeanRate(): number {
        return this.count / (Date.now() - this.startTime);
    }
}