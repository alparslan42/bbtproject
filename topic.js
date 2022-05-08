const {Kafka, logLevel} = require("kafkajs")

async function createTopic(){
    try {
        const kafka = new Kafka({
            clientId: "bbtProjectEmail",
            brokers: ["192.168.1.198:9092"]
        });

        const admin = kafka.admin();
        await admin.connect();
        
        await admin.createTopics({
            topics:[
                {
                    topic: "EMailTopic4",
                    numPartitions:1
                }
            ]
        });
        await admin.disconnect();
    }   catch (e) {
        console.log(`Error => ${e}`);
    } 
    finally {
        process.exit(0);
    }
}

createTopic().then(r => console.log("Topic Created"));
