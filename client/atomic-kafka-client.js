import io from "socket.io-client";

class AtomicKafkaClient {
  constructor(kafkaServer){
    this.socket = io(kafkaServer);
    // this.io = require('socket.io-client')(kafkaServer, {
		// 	cors: {
		// 		origin: '*',
		// 	}
		// });
  }

  clientSocketConsume (state, setState) {
    console.log('in clientSocketConsume()');
    console.log('state in clientSocketConsume(): ', state);
    // console.log('setState in clientSocketConsume(): ', setState);
    this.socket.on("newMessage", (arg) => {
      console.log("new data: ", arg);
      // console.log("data type: ", typeof arg);
      console.log("new truck state: ", truck);
      return setState([...state, arg]);
    });
  }
}



export default AtomicKafkaClient;
