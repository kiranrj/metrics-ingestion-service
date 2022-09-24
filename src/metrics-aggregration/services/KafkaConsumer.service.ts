import { Kafka, Consumer, ConsumerSubscribeTopics, EachMessagePayload } from "kafkajs";
import { MetricsRecord } from "../../common/models/MetricsRecord";

export class KafkaConsumer {
    private consumer: Consumer;
    private kafka: Kafka;
    constructor() {
        console.log(`Kafka bootstrap server ${process.env.KAFKA_BOOTSTRAP_SERVERS}`);
        this.kafka = new Kafka({
            brokers: [process.env.KAFKA_BOOTSTRAP_SERVERS as string],
            clientId: "metrics-aggregration",
            ssl: false
        });
        this.consumer = this.kafka.consumer({
            groupId: 'metrics-aggregration-consumner-group'
        });
    }

    start = async(): Promise<void> => {
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
                }
            })
        } catch(e: any) {
            console.log(e.message);
        }
    }
}