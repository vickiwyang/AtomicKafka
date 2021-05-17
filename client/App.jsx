import React, { useState, useEffect , useRef } from "react";
import io from "socket.io-client";
import AtomicKafkaClient from "./atomic-kafka-client.js";

// const socket = io("http://localhost:3001");

function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

function App() {
  const [truck, setTruck] = useState([10]);
  const akc = new AtomicKafkaClient("http://localhost:3001");

  useInterval(() => {
    console.log('In useEffect of App!!');
    akc.clientSocketConsume(truck, setTruck);
    // const socket = io("http://localhost:3001");
      // console.log('In useEffect of App!!');
      // socket.on("newMessage",  (arg) => {
      //   console.log("new data: ", arg);
      //   // console.log("data type: ", typeof arg);
      //   console.log("new truck state: ", truck);
      //   return setTruck([...truck, arg]);
      // });

      return () => {
        console.log("is App ever off?");
        akc.socket.off();
      }
  }, 5000);

  return (
    <div>
      <h1>LIVE DATA:</h1>
      <ul>
        {truck.map((num, indx) => {
          return (
            <li key={indx}>{num}</li>
          )
        })}
      </ul>
    </div>
  );
}

export default App;