import { MetricRecord } from "../MetricRecord";
import { MetricType } from "./MetricType";
import { MetricBase } from "./MetricBase";

export class Meter extends MetricBase {

    meanRate: number;

    constructor(level: string, name: string, type: MetricType, value?: number, 
        startTime?: number, count?: number, meanRate?: number) {

        super(level, name, type, value, startTime, count);

        this.meanRate = meanRate ?? 0;
    }

    process(record: MetricRecord): void {
        super.process(record);
        this.meanRate = this.getMeanRate();
    }

    getMeanRate(): number {
        return this.count / (Date.now() - this.startTime);
    }
}