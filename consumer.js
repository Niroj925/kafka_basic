import {kafka} from './client.js';

//specify which group to join
const group=process.argv[2];//if we do node consumer.js user-1 then it take user-1


async function init() {
    const consumer=kafka.consumer({groupId:group});
    await consumer.connect();

    await consumer.subscribe({topics:["rider_updates"],fromBeginning:true});

    await consumer.run({
        eachMessage:async({topic,partition,message,heartbeat,pause})=>{
            console.log(`[${group}:${topic}]:partition:${partition}:`, message.value.toString());
        }
    });

    // await consumer.disconnect();
    // console.log('consumer disconnected');
}

init();