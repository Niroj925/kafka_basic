
import {kafka} from './client.js'

async function init() {
  const admin = kafka.admin();
  admin.connect();
  console.log("admin connected");

  await admin.createTopics({
    topics: [
      {
        topic: "rider_updates",
        numPartitions: 2, //it can be location wise or any
      },
    ],
  });
  console.log('topic created successfully rider-updates');
  
  await admin.disconnect();
  console.log('admin disconnected');
}
init();
