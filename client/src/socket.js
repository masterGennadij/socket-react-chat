import io from "socket.io-client";

const socket = () => {
  const client = io.connect("/", { forceNew: false });

  function registerEventsHandlers({ onMessageReceived, onTypingsReceved }) {
    client.on("message", (data) => {
      onMessageReceived(data);
    });

    client.on("sendTypingClients", (data) => {
      onTypingsReceved(data);
    });
  }

  client.on("disconnect", (event) => {});

  const register = (name, callBack) => {
    client.emit("register", name, callBack);
  };

  const sendMessage = (message, callBack) => {
    client.emit("sendMessage", message, callBack);
  };

  const sendTypingState = (isTyping, callBack) => {
    client.emit("sendTypingState", isTyping, callBack);
  };

  return { register, registerEventsHandlers, sendMessage, sendTypingState };
};

export default socket;
