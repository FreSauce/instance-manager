const { Server } = require("socket.io");
const AppError = require("../AppError");
const deviceController = require("../controllers/deviceController");

class SocketService {
  constructor() {
    this.socket = null;
    this.serverOptions = { cors: { origin: "*" } };
  }
  attachServer(httpServer) {
    if (!httpServer) throw new AppError("httpServer is not defined", 500);
    var io = new Server(httpServer, this.serverOptions);

    io.use(async (socket, next) => {
      const token = socket.handshake.auth.token;
      if (token) {
        const res = await deviceController.checkVerification(token);
        if (res) {
          next();
        }
        else {
          next(new Error("Invalid token"));
        }
      }
      else {
        next(new Error("Authentication error"));
      }
    });

    io.on("connection", (socket) => {
      console.log("Client connect to socket.", socket.id, new Date());
      this.socket = socket;
      this.socket.emit("connected", socket.id);
      this.socket.on("disconnect", (reason) => {
        console.log(
          "Client disconnected from socket.",
          socket.id,
          reason,
          new Date()
        );
      });
    });
  }
}

module.exports = SocketService;
