const fs = require('fs');
const mqtt = require('mqtt');

const HOST = process.env.HOST;
const TOPIC = process.env.TOPIC;

if (!TOPIC) {
    console.error('Missing TOPIC environtment variable. You should define it in docker-compose.yaml');
    process.exit();
}
if (!HOST) {
    console.error('Missing HOST environtment variable. You should define it in docker-compose.yaml');
    process.exit();
}

options = {
    port: 8883,
    host: HOST,
    key: fs.readFileSync('./certs/key.pem'),
    cert: fs.readFileSync('./certs/cert.pem'),
    rejectUnauthorized: true,
    ca: fs.readFileSync('./certs/ca.pem'),
    protocol: 'mqtts'
}
mqttClient = mqtt.connect(options);

mqttClient.on('connect', () => {
    mqttClient.subscribe('#');
    console.log('Connected to MQTT server in ' + HOST);
});

mqttClient.on('message',(topic, message)=>{
    if (topic.startsWith(TOPIC+'/')){
        const deviceId = topic.replace(TOPIC+'/','');
        console.log('Received message from device: '+ deviceId + ' \nMessage: ' + message + '\n');
    }
});