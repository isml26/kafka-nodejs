const { Kafka } = require("kafkajs");

createTopic();

async function createTopic(){
    try {
            // connect to kafka 
    const kafka = new Kafka({
        clientId: "kafka_ex1",
        brokers:["localhost:9092"]
    })
    const  admin =  kafka.admin();
    console.log("Connecting to kafka broker...");
    await admin.connect();
    console.log("Connected to kafka broker...");
    await admin.createTopics({
        waitForLeaders:true,
        topics:[
        {
            topic:'Logs',
            numPartitions:1
        },
        {
            topic:"Logs2",
            numPartitions:2
        }
    ]
    })
    console.log("Topics created successfully");
    await admin.disconnect()
    } catch (error) {
        console.log("topic.js/Something went wrong: ",error);
    }finally{
        process.exit(0);
    }
}   

