const app = require("./app");
const mongoose = require("mongoose");
const httpServer = require('http').Server(app);
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

const SocketService = require("./service/SocketService");

const PORT = process.env.PORT || 3000;

const DB = process.env.DATABASE;

mongoose
  .connect(DB, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    const socketService = new SocketService();
    socketService.attachServer(httpServer);
    console.log("Database successfully connected");
    httpServer.listen(PORT, () => {
      console.log(`App running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
