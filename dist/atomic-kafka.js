"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { Kafka } = require('kafkajs');
const produce = require("./producer");
const consume = require('./consumer.js');
//require in the socket
class atomicKafka {
    constructor() {
        //connect atomicKafka to the kafka client
        this.kafkaAccess = Kafka,
            this.produceSample = produce, //produceFn takes in 2 args: data, callback
            this.consumeSample = consume; //consumeSample takes in 1 arg: callback
        //add consumer and producer functions ehre
        //create the socket object, 
        //this.io = require('socket.io)(server...)
    }
}
module.exports = atomicKafka;
