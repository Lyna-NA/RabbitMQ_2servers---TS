import userController from "./controllers/user-controller";
import amqp from "amqplib";

import "./models/User";

async function main() {
  // Connect to RabbitMQ server
  const connection = await amqp.connect("amqp://localhost");
  const channel = await connection.createChannel();

  // Declare queue for users
  const userQueue = "users";
  await channel.assertQueue(userQueue);

  // Consume messages from users queue
  channel.consume(userQueue, async (data) => {

    // Check the queue
    const result = await channel.checkQueue(userQueue);
    console.log("**************************************");
    console.log("Inside the Q: ", result);

    console.log("**************************************");
    console.log("Data Received: ", JSON.parse(data!.content.toString()));

    // Insert the received data into the database
    const userData = JSON.parse(data!.content.toString());

    const user = await userController.store(userData);
    console.log("Data inserted successfully:", user);

  }, {noAck: true});

  console.log("----------------------------------");
  console.log("Connected to RabbitMQ");
  console.log("----------------------------------");
}

main().catch(console.error);