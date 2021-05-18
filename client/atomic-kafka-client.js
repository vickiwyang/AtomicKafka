import io from "socket.io-client";

class AtomicKafkaClient {
  constructor(kafkaServer){
    this.address = kafkaServer;
    // this.io = require('socket.io-client')(kafkaServer, {
		// 	cors: {
		// 		origin: '*',
		// 	}
		// });
  }


  consumer(state, setState){
    const socket = io(this.address);
    // const socket = io(this.address);
    console.log('in clientSocketConsume()');
    console.log('state in clientSocketConsume(): ', state);
    // console.log('setState in clientSocketConsume(): ', setState);
    socket.on("newMessage", (arg) => {
      console.log("new data: ", arg);
      // console.log("data type: ", typeof arg);
      console.log("new truck state: ", state);
      return setState([...state, arg]);
    });
    return () => {
      console.log("is App ever off?");
      socket.off();
    }
  }
}



export default AtomicKafkaClient;
