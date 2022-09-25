import { MetricType } from "./MetricType";

export class MetricRecord {
    readonly level: string;
    readonly name: string;
    readonly type: MetricType;
    readonly value: number;

    constructor(level: string, name: string, type: MetricType, value: number) {
        this.level = level;
        this.name = name;
        this.type = type;
        this.value = value;
    }
}