const {Kafka, logLevel} = require("kafkajs")

const topicName = process.argv[2]

async function createTopic(){
    try {
        const kafka = new Kafka({
            clientId: "bbtProjectEmail",
            brokers: ["localhost:9092"]
        });

        const admin = kafka.admin();
        await admin.connect();
        
        await admin.createTopics({
            topics:[
                {
                    topic: topicName,
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
