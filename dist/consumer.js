var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const kafka = require('./kafka');
const consumer = kafka.consumer({
    groupId: 'truck-group'
});
// const callBack = ({ message })=> {
//   io.sockets.emit('newMessage', { message })
//   console.log('socket emit message ', { message })
// };
const consume = (cb) => __awaiter(this, void 0, void 0, function* () {
    yield consumer.connect();
    // io.sockets.emit('connected', "Consumer Connected")
    yield consumer.subscribe({
        topic: process.env.TOPIC,
        // topic: process.env.TOPIC,
        fromBeginning: true
    });
    yield consumer.run({
        eachMessage: ({ topic, partition, message }) => __awaiter(this, void 0, void 0, function* () {
            console.log('Received message');
            console.log('Recived message', {
                topic,
                partition,
                key: message.key.toString(),
                value: message.value.toString()
                // value: message.value
            });
            cb(message);
        })
    });
});
// consume().catch(async error => {
//   console.error(error)
//   try {
//     await consumer.disconnect()
//   } catch (e) {
//     console.error('Failed to gracefully disconnect consumer', e)
//   }
//   process.exit(1)
// })
module.exports = consume;
