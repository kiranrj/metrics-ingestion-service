import { MetricRecord } from "../../common/models/MetricRecord";
import { IMetricRecords } from "../../common/models/IMetricRecords";
import { MetricType } from "../../common/models/metrics/MetricType";
import { KafkaProducer } from "./KafkaProducer.service";
import { Utils } from "../../common/utils/Utils";

export class MetricRecordService {
    private readonly kafkaProducer: KafkaProducer = new KafkaProducer();

    post = async(metricRecord: MetricRecord) : Promise<boolean> => {
        return this.kafkaProducer.send(metricRecord);
    }
}