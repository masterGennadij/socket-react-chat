const uuid = require("uuid").v4;

const clientManager = () => {
  const clients = new Map();
  const roomName = "chat";

  const getClientInfo = (id) => {
    const client = clients.get(id) || {};
    const { clientName, clientImage } = client;

    return {
      clientName,
      clientImage,
    };
  };

  const connectHandler = (socketInstance, client, clientInfo, callBack) => {
    if (clients.get(client.id)) {
      callBack(null, "User has already registered");
    } else {
      clients.set(client.id, {
        client,
        clientName: clientInfo.name,
        clientImage: clientInfo.image,
        isTyping: false,
      });
      callBack({ id: client.id, name: clientInfo.name });

      client.join(roomName, () => {
        socketInstance.to(roomName).emit("message", {
          type: "message:system:joined",
          message: `User ${clientInfo.name} has joined to the ${roomName}`,
          id: uuid(),
        });
      });
    }
  };

  const disconnectHandler = (socketInstance, client) => {
    const { clientName } = getClientInfo(client.id);
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
    const { clientName, clientImage } = getClientInfo(client.id);
    if (clientName) {
      socketInstance.to(roomName).emit("message", {
        type: "message:text:new",
        message: message,
        date: new Date(),
        author: client.id,
        authorName: clientName,
        id: uuid(),
        avatar: clientImage,
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
