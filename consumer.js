const { Kafka } = require("kafkajs")

const topicName = process.argv[2]

function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

async function createConsumer() {
    const kafka = new Kafka({
        clientId: "bbtProjectEmail",
        brokers:["localhost:9092"]
    });
    
    const consumer = kafka.consumer({
        groupId:"bbtProjectEMailGroup",
    });
    await consumer.connect();

    await consumer.subscribe({
        topic: topicName,
        fromBeginning: true
    })
    
    await consumer.run({
        eachMessage: async result => {
            // Processing Email Content Here
            console.clear();
            console.log(`Message From EmailTopic4 \n ${result.message.value}`);
            await sleep(1000)
        }
    })
}

createConsumer().then(r => console.log("Created Consumer"));
