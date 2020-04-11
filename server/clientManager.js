const clientManager = () => {
  const clients = new Map();
  const roomName = "General room";

  const connectHandler = (socketInstance, client, clientName, callBack) => {
    if (clients.get(client.id)) {
      callBack(null, "User has already registered");
    } else {
      clients.set(client.id, { client, clientName });
      callBack({ id: client.id, name: clientName });

      client.join(roomName, () => {
        let rooms = Object.keys(client.rooms);
        console.log("rooms", rooms);
        socketInstance.to(roomName).emit("message", {
          type: "message:system:joined",
          message: `new user ${clientName} has joined to the ${roomName}`,
        });
      });
    }
  };

  const disconnectHandler = (socketInstance, client) => {
    console.log("disconnect handler", client.id);
    const clientName = (clients.get(client.id) || {}).clientName;
    clients.delete(client.id);
    if (clientName) {
      socketInstance.to(roomName).emit("message", {
        type: "message:system:left",
        message: `User ${clientName} has left the ${roomName}`,
      });
    }
  };

  const sendMessageHandler = (socketInstance, client, message) => {
    const clientName = (clients.get(client.id) || {}).clientName;
    if (clientName) {
      socketInstance.to(roomName).emit("message", {
        type: "message:text:new",
        message: message,
        date: new Date(),
        author: client.id,
        authorName: clientName,
      });
    }
  };

  return {
    connectHandler,
    disconnectHandler,
    sendMessageHandler,
  };
};

module.exports = clientManager;
