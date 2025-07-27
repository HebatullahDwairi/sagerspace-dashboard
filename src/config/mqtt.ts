import mqtt from 'mqtt';

const client = mqtt.connect(`ws://localhost:8080`, {
  port: 8080,
  username: 'guest',
  password: 'guest',
  clientId: 'mqttjs_' + Math.random().toString(16).substr(2, 8),
});

export default client;