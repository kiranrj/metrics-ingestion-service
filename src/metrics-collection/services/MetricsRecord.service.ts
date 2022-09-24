import { MetricsRecord } from "../../common/models/MetricsRecord";
import { IMetricsRecords } from "../../common/models/IMetricRecords";
import { MetricsType } from "../../common/models/MetricsType";
import { KafkaProducer } from "./KafkaProducer.service";

export class MetricRecordService {
    private readonly kafkaProducer: KafkaProducer = new KafkaProducer();

    // dummy data for testing
    private readonly metricRecords: IMetricsRecords = {
        "base.memory.usedHeap" : {
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
        this.metricRecords[`${metricRecord.level}.${metricRecord.name}`] = metricRecord;
        await this.kafkaProducer.send(metricRecord);
    }

    delete = async(name: string): Promise<string | null> => {
        const record = await this.get(name);
        if (!record) {
            return null;
        }
        return record.name;
    }
}