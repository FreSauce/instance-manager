import io from "socket.io-client";
import { saveDataToFile, readDataFromFile, sleep } from "./utils.js";
import chalk from "chalk";
import http from "http";

export function connectDevice() {
  const socket = io("http://localhost:3000", {
    secure: true,
    reconnect: true,
    auth: {
      token: readDataFromFile("authToken"),
    },
  });
  socket.on("connect", () => {
    console.log(chalk.greenBright("Connected to server"));
    saveDataToFile("isVerified", true);
    saveDataToFile("isConnected", socket.connected);
  });

  socket.on("disconnect", () => {
    console.log(chalk.redBright("Disconnected from server"));
    saveDataToFile("isConnected", socket.connected);
  });

  socket.on("connect_error", (error) => {
    console.log(error);
  });
}
