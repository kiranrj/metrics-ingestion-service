import { Kafka, Consumer, ConsumerSubscribeTopics, EachMessagePayload } from "kafkajs";
import { MetricRecord } from "../../common/models/MetricRecord";
import { NewMetricRecordHandler } from "../handlers/NewMetricRecordHandler";

export class KafkaConsumer {
    readonly consumer: Consumer;
    readonly kafka: Kafka;

    constructor() {
        console.log(`Kafka bootstrap server ${process.env.KAFKA_BOOTSTRAP_SERVERS}`);
        this.kafka = new Kafka({
            brokers: [process.env.KAFKA_BOOTSTRAP_SERVERS as string],
            clientId: "metrics-ensemble",
            ssl: false
        });
        this.consumer = this.kafka.consumer({
            groupId: 'metrics-ensemble-consumner-group'
        });
    }

    start = async(newRecordHandler: NewMetricRecordHandler): Promise<void> => {
        const topic: ConsumerSubscribeTopics = {
            topics: [process.env.KAFKA_TOPIC as string],
            fromBeginning: true
        }

        try {
            await this.consumer.connect();
            await this.consumer.subscribe(topic);
            
            await this.consumer.run({
                eachMessage: async(kafkaMessage: EachMessagePayload) => {
                    const {topic, partition, message} = kafkaMessage;
                    const prefix = `${topic}[${partition} | ${message.offset}] / ${message.timestamp}`
                    console.log(`- ${prefix} ${message.key}#${message.value}`)
                    await newRecordHandler.handleNewMessage(message.key?.toString(), message.value?.toString());
                }
            })
        } catch(e: any) {
            console.log(e.message);
        }
    }
}