import { MetricRecord } from "../MetricRecord";
import { MetricType } from "./MetricType";
import { MetricBase } from "./MetricBase";

export class Timer extends MetricBase {
    min: number;
    max: number;
    mean: number;
    sum: number;

    constructor(level: string, name: string, type: MetricType, value?: number, 
        startTime?: number, min?: number, max?: number, mean?: number, sum?: number, count?: number) {

        super(level, name, type, value, startTime, count);

        this.min = min ?? Number.MAX_SAFE_INTEGER;
        this.max = max ?? Number.MIN_SAFE_INTEGER;
        this.mean = mean ?? 0;
        this.sum = sum ?? 0;
        this.count = count ?? 0;
    }

    process(record: MetricRecord): void {
        super.process(record);

        this.min = Math.min(this.min, this.value);
        this.max = Math.max(this.max, this.value);
        this.sum += this.value;
        this.mean = this.sum/this.count;
    }
}