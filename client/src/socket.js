import io from "socket.io-client";

const socket = () => {
  const client = io.connect("http://192.168.0.100:8000");
  console.log("connecting,,,");
  function registerMessageHandler(onMessageReceived) {
    client.on("message", (data) => {
      onMessageReceived(data);
    });
  }

  client.on("disconnect", (event) => {
    console.log("socket", event);
  });

  const register = (name, callBack) => {
    client.emit("register", name, callBack);
  };

  const sendMessage = (message, callBack) => {
    client.emit("sendMessage", message, callBack);
  };

  return { register, registerMessageHandler, sendMessage };
};

export default socket;
