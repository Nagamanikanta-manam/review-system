import { Injectable, OnModuleInit } from '@nestjs/common';
import * as mqtt from 'mqtt';

@Injectable()
export class MqttService implements OnModuleInit {

  private client: mqtt.MqttClient;

  onModuleInit() {
    this.client = mqtt.connect('mqtt://localhost:1883');

    this.client.on('connect', () => {
      console.log('MQTT connected');
    });

    this.client.on('error', (err) => {
      console.error('MQTT error:', err);
    });
  }

  publish(topic: string, message: any) {
    this.client.publish(
      topic,
      JSON.stringify(message),
      { qos: 1 },
    );
  }
}