import { MetricRecord } from "../MetricRecord";
import { IMetric } from "./IMetric";
import { MetricType } from "./MetricType";

export abstract class MetricBase implements IMetric {
    level: string;
    name: string;
    type: MetricType;

    startTime: number;
    updateTime: number;
    count: number;
    value: number;

    constructor(level: string, name: string, type: MetricType, value?: number,
        startTime?: number, count?: number) {
        this.level = level;
        this.name = name;
        this.type = type;
        this.value = value ?? 0;

        this.startTime = startTime ?? Date.now();
        this.updateTime = this.startTime;
        this.count = count ?? 0;
    }

    process(record: MetricRecord): void {
        // Be sane, update what's yours
        if (this.level != record.level || this.name != record.name) {
            throw new Error("The metric record does not match the stored/cached metric. Check for is it's a key error?");
        }
        this.count++;
        this.value = record.value;

        this.updateTime = Date.now();
    }
}