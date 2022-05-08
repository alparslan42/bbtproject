const { Kafka } = require("kafkajs")
const emailData = require("./dummy.json")

async function createProducer(){
    try {
        const kafka = new Kafka({
            clientId: "bbtProjectEmail",
            brokers: ["192.168.1.198:9092"]
        })

        const producer = kafka.producer();
        await producer.connect();
        
        const emailDataForKafka = emailData.map(data => {
            return {
                value:JSON.stringify(data),
                partition:0
            }
        })
        const messageResult = await producer.send({
            topic: "EMailTopic4",
            messages: emailDataForKafka
        })
        console.log(`Message Result value => ${JSON.stringify(messageResult)}`)

        await producer.disconnect();
    }
    catch (e){
        console.log(`Error ${e}`);
    }
    finally {
        process.exit(0);
    }
}

createProducer().then(r => console.log("Created Producer"))
