
import { Kafka, Producer } from "kafkajs";
import { MetricRecord } from "../../common/models/MetricRecord";
import { Utils } from "../../common/utils/Utils"

export class KafkaProducer {
    private kafka: Kafka;
    private producer: Producer; 

    constructor() {
        // const { KAFKA_USER: kafkaUser, KAFKA_PASSWORD: kafkaPassword } = process.env
        // const sasl = kafkaUser && kafkaPassword ? {username: kafkaUser, password: kafkaPassword, mechanism: 'plain' } : null;

        console.log(`Kafka bootstrap server ${process.env.KAFKA_BOOTSTRAP_SERVERS}`);
        this.kafka = new Kafka({
            brokers: [process.env.KAFKA_BOOTSTRAP_SERVERS as string],
            clientId: "metrics-ingest",
            ssl: false
        });
        this.producer = this.kafka.producer();
        this.producer.connect();
        console.log("Kafka producer connected");
    }

    send = async(metricRecord: MetricRecord): Promise<boolean> => {
        
        const key = Utils.getRecordKey(metricRecord);
        const message = JSON.stringify(metricRecord);

        return this.producer.send({
            topic: process.env.KAFKA_TOPIC as string,
            messages: [{
                key: key,
                value: message
            }]
        })
        .then(rmd => {
            console.log(`Message with key '${key}' written to Kafka '${rmd[0].topicName}##${rmd[0].partition}'`)
            return new Promise<boolean>((resolve, reject) => {
                (rmd != null) ? resolve(true) : reject(false);
            })
        });
    };
}