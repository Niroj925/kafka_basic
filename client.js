import { Kafka } from "kafkajs";

export const kafka = new Kafka({
  clientId: "mero-app",
  brokers: ["192.168.221.176:9092"],
});