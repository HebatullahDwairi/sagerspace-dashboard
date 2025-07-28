import mqtt from 'mqtt';

const host = import.meta.env.VITE_MQTT_HOST || 'ws://localhost:8080';
const port = import.meta.env.VITE_MQTT_PORT || '8080';
const clientId = import.meta.env.VITE_MQTT_CLIENT_ID || `sagerspace_client_${Math.random().toString(16).substring(2, 10)}`;
const username = import.meta.env.VITE_MQTT_USERNAME;
const password = import.meta.env.VITE_MQTT_PASSWORD;

const url = `${host}:${port}`;

const options = {
  clientId,
  clean: true,
  connectTimeout: 4000,
  reconnectPeriod: 1000,
};


if (username) {
  options.username = username;
}

if (password) {
  options.password = password;
}

const client = mqtt.connect(url, options);

export default client;
