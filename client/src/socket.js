import io from "socket.io-client";

const socket = () => {
  const client = io.connect("/");
  function registerMessageHandler(onMessageReceived) {
    client.on("message", (data) => {
      onMessageReceived(data);
    });
  }

  client.on("disconnect", (event) => {});

  const register = (name, callBack) => {
    client.emit("register", name, callBack);
  };

  const sendMessage = (message, callBack) => {
    client.emit("sendMessage", message, callBack);
  };

  return { register, registerMessageHandler, sendMessage };
};

export default socket;
