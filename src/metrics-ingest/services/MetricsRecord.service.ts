import { MetricRecord } from "../../common/models/MetricRecord";
import { IMetricRecords } from "../../common/models/IMetricRecords";
import { MetricType } from "../../common/models/metrics/MetricType";
import { KafkaProducer } from "./KafkaProducer.service";
import { Utils } from "../../common/utils/Utils";

export class MetricRecordService {
    private readonly kafkaProducer: KafkaProducer = new KafkaProducer();

    // dummy data for testing
    private readonly metricRecords: IMetricRecords = {
        "base.memory.usedHeap" : {
            level: "base",
            name: "memory.usedHeap",
            type: MetricType.GAUGE,
            value: 85632912
        }
    };

    list = async(): Promise<IMetricRecords> => {
        return this.metricRecords;
    }

    get = async(name: string): Promise<MetricRecord | null> => {
        return this.metricRecords[name] as MetricRecord;
    }

    post = async(metricRecord: MetricRecord) : Promise<void> => {
        this.metricRecords[Utils.getRecordKey(metricRecord)] = metricRecord;
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