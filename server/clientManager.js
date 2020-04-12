const uuid = require("uuid").v4;

const clientManager = () => {
  const clients = new Map();
  const roomName = "chat";

  const getClientName = (id) => (clients.get(id) || {}).clientName;

  const connectHandler = (socketInstance, client, clientName, callBack) => {
    if (clients.get(client.id)) {
      callBack(null, "User has already registered");
    } else {
      clients.set(client.id, { client, clientName, isTyping: false });
      callBack({ id: client.id, name: clientName });

      client.join(roomName, () => {
        socketInstance.to(roomName).emit("message", {
          type: "message:system:joined",
          message: `User ${clientName} has joined to the ${roomName}`,
          id: uuid(),
        });
      });
    }
  };

  const disconnectHandler = (socketInstance, client) => {
    const clientName = getClientName(client.id);
    clients.delete(client.id);
    if (clientName) {
      socketInstance.to(roomName).emit("message", {
        type: "message:system:left",
        message: `User ${clientName} has left the ${roomName}`,
        id: uuid(),
      });
    }
  };

  const sendTypingStateHandler = (socketInstance, client, isTyping) => {
    const clientObj = clients.get(client.id);
    if (!clientObj) return;
    clientObj.isTyping = isTyping;
    clients.set(client.id, clientObj);
    let typingClients = [];
    clients.forEach((clientValue, id) => {
      if (clientValue.isTyping) {
        typingClients.push({
          id,
          name: clientValue.clientName,
        });
      }
    });

    socketInstance.to(roomName).emit("sendTypingClients", typingClients);
  };

  const sendMessageHandler = (socketInstance, client, message) => {
    const clientName = getClientName(client.id);
    if (clientName) {
      socketInstance.to(roomName).emit("message", {
        type: "message:text:new",
        message: message,
        date: new Date(),
        author: client.id,
        authorName: clientName,
        id: uuid(),
        avatar:
          "https://api.adorable.io/avatars/80/abott@adorable.png" + client.id,
      });
    }
  };

  return {
    connectHandler,
    disconnectHandler,
    sendMessageHandler,
    sendTypingStateHandler,
  };
};

module.exports = clientManager;
