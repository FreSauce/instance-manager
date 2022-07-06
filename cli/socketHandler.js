import { io } from "socket.io-client";
import { saveDataToFile } from "./utils.js";

export async function connectDevice() {
  const socket = io();
  console.log(socket);
  socket.on("connect", () => {
    console.log(chalk.bgGreenBright("Connected to server"));
    saveDataToFile("isConnected", socket.connected);
  });
  socket.on("disconnect", () => {
    console.log(chalk.bgRedBright("Disconnected from server"));
    saveDataToFile("isConnected", socket.connected);
  });
  
}
