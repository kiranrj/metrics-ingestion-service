
import { Kafka, Producer } from "kafkajs";
import { MetricsRecord } from "../models/MetricsRecord";

export class KafkaProducer {
    private kafka: Kafka;
    private producer: Producer; 

    constructor() {
        // const { KAFKA_USER: kafkaUser, KAFKA_PASSWORD: kafkaPassword } = process.env
        // const sasl = kafkaUser && kafkaPassword ? {username: kafkaUser, password: kafkaPassword, mechanism: 'plain' } : null;

        console.log(`Kafka bootstrap server ${process.env.KAFKA_BOOTSTRAP_SERVERS}`);
        this.kafka = new Kafka({
            brokers: [process.env.KAFKA_BOOTSTRAP_SERVERS as string],
            clientId: "metrics-ingestion-service",
            ssl: false
        });
        this.producer = this.kafka.producer();
        this.producer.connect();
        console.log("Kafka producer connected");
    }

    send = async(metricRecord: MetricsRecord): Promise<void> => {
        const message = JSON.stringify(metricRecord)
        console.log(`Kafka message: ${message}`);
        this.producer.send({
            topic: process.env.KAFKA_TOPIC as string,
            messages: [{
                key: `${metricRecord.level}.${metricRecord.name}`,
                value: message
            }]
        });
    };
}