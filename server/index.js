const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const http = require("http");
const socketIO = require("socket.io");
const clientManger = require("./clientManager");

const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const port = process.env.PORT || 8000;
const {
  connectHandler,
  disconnectHandler,
  sendMessageHandler,
} = clientManger();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send({ express: "Hello From Express" });
});

io.on("connect", (client) => {
  console.log("connected client", client.id);

  client.on("register", (...args) => connectHandler(io, client, ...args));

  client.on("sendMessage", (...args) =>
    sendMessageHandler(io, client, ...args)
  );

  client.on("disconnect", () => {
    disconnectHandler(io, client);
  });
});

// For production static serving
if (process.env.NODE_ENV === "production") {
  // Serve any static files
  app.use(express.static(path.join(__dirname, "client/build")));

  // Handle React routing, return all requests to React app
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

server.listen(port, () => console.log(`Listening on port ${port}`));
