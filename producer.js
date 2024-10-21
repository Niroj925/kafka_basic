import { kafka } from "./client.js";
import readline from "readline";

const rl=readline.createInterface({
    input:process.stdin,
    output:process.stdout,
})

async function init() {
  const producer = kafka.producer();
  console.log("producer create");

  await producer.connect();
  console.log("producer connected");

  //get input from user
  rl.setPrompt('> ');
  rl.prompt();

  rl.on('line',async function (line) {

    const [riderName,location]=line.split(' ');

    await producer.send({
        topic: "rider_updates",
        messages: [
          {
            partition: location.toLowerCase()==="north"?0:1,
            key: "location_update",
            value: JSON.stringify({ name:riderName, location:location }),
          },
        ],
      });

      console.log(`Sent update for rider: ${riderName}, location: ${location}`);
      rl.prompt();
    
  }).on("close",async()=>{
    await producer.disconnect();
    console.log('producer disconnected')
  })



//   await producer.send({
//     topic: "rider_updates",
//     messages: [
//       {
//         partition: 0,
//         key: "location_update",
//         value: JSON.stringify({ name: "Thapa", location: "North" }),
//       },
//     ],
//   });

 
}

init();
