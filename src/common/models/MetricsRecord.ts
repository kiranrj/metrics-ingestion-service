import { MetricsType } from "./MetricsType";

export class MetricsRecord {
    readonly level: string;
    readonly name: string;
    readonly type: MetricsType;
    readonly value: number;

    constructor(level: string, name: string, type: MetricsType, value: number) {
        this.level = level;
        this.name = name;
        this.type = type;
        this.value = value;
    }
}