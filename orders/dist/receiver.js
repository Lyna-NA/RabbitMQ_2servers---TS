"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_controller_1 = __importDefault(require("./controllers/user-controller"));
const amqplib_1 = __importDefault(require("amqplib"));
require("./models/User");
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        // Connect to RabbitMQ server
        const connection = yield amqplib_1.default.connect("amqp://localhost");
        const channel = yield connection.createChannel();
        // Declare queue for users
        const userQueue = "users";
        yield channel.assertQueue(userQueue);
        // Consume messages from users queue
        channel.consume(userQueue, (data) => __awaiter(this, void 0, void 0, function* () {
            // Check the queue
            const result = yield channel.checkQueue(userQueue);
            console.log("**************************************");
            console.log("Inside the Q: ", result);
            console.log("**************************************");
            console.log("Data Received: ", JSON.parse(data.content.toString()));
            // Insert the received data into the database
            const userData = JSON.parse(data.content.toString());
            const user = yield user_controller_1.default.store(userData);
            console.log("Data inserted successfully:", user);
        }), { noAck: true });
        console.log("----------------------------------");
        console.log("Connected to RabbitMQ");
        console.log("----------------------------------");
    });
}
main().catch(console.error);
