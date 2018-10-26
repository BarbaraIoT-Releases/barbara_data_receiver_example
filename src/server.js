//MongoDB connection data
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://172.16.50.10:37017';
const dbName = 'barbaraIoT';
const mongoClient = new MongoClient(url);

//MQTT required information
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



mongoClient.connect((err) => {
    if (err) {console.error(err)}
    console.log('Connected successfully to MongoDB server');
});

const insertOneDocument = (db, document2Insert) => {
    db.collection(TOPIC).insertOne(JSON.parse(document2Insert), (err, result) => {
        if (err) {console.error(err)}
        console.log('Inserted into the mongoDB collection. \n');
    });
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
        console.log('Received message from device: '+ deviceId + ' \nMessage: ' + message);
        insertOneDocument(mongoClient.db(dbName), message);
    }
});