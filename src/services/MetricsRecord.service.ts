import { MetricsRecord } from "../models/MetricsRecord";
import { IMetricsRecords } from "../models/IMetricRecords";
import { MetricsType } from "../models/MetricsType";

export class MetricRecordService {
    // dummy data for testing
    private readonly metricRecords: IMetricsRecords = {
        "memory.usedHeap" : {
            level: "base",
            name: "memory.usedHeap",
            type: MetricsType.GAUGE,
            value: 85632912
        }
    };

    list = async(): Promise<IMetricsRecords> => {
        return this.metricRecords;
    }

    get = async(name: string): Promise<MetricsRecord | null> => {
        return this.metricRecords[name] as MetricsRecord;
    }

    post = async(metricRecord: MetricsRecord) : Promise<void> => {
        this.metricRecords[metricRecord.name] = metricRecord;
    }

    delete = async(name: string): Promise<string | null> => {
        const record = await this.get(name);
        if (!record) {
            return null;
        }
        return record.name;
    }
}