const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const path = require("path");
const Sockets = require("./sockets");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    this.server = http.createServer(this.app);

    //configuraciones de sockets
    this.io = socketio(this.server, {});
  }

  middlewares() {
    this.app.use(express.static(path.resolve(__dirname, "../public")));
  }

  configurarSockets() {
    new Sockets(this.io);
  }

  execute() {
    // inicializar middlewares
    this.middlewares();

    // Inicializar sockets
    this.configurarSockets();

    // Inicializar el server
    this.server.listen(this.port, () => {
      console.log(`Server corriendo en puerto :${this.port}`);
    });
  }
}

module.exports = Server;