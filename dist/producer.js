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
const { CompressionTypes } = require('kafkajs');
const kafka = require('./kafka');
const producer = kafka.producer();
const executeSend = (data) => __awaiter(void 0, void 0, void 0, function* () {
    // if (callback !== undefined) data = callback(data);
    try {
        // console.log('data in execute send: ', data)
        const responses = yield producer.send({
            topic: process.env.TOPIC,
            messages: [
                data
            ]
        });
        // console.log('Published message, engine_temperature', trucks[idx]
    }
    catch (err) {
        console.log("Error with producing: ", err);
    }
});
const produce = (data, interval = 0) => __awaiter(void 0, void 0, void 0, function* () {
    yield producer.connect();
    // if (!interval) callback ? executeSend(data) : executeSend(data, callback);
    // else setInterval((data, callback) => executeSend(data, callback), interval);
    console.log('executing send with: ', data);
    executeSend(data);
});
module.exports = produce;
// {
//     key : String(3),
//     // value : String(trucks[idx].engine_temperature)
//     value: String(300)
// }
