import axios from "axios";
import chalk from "chalk";
import inquirer from "inquirer";
import figlet from "figlet";
import { saveDataToFile, readDataFromFile, sleep } from "./utils.js";
import { connectDevice } from "./socketHandler.js";

const URL = "http://localhost:3000/api/devices";

async function init() {
  console.log(
    figlet.textSync("Instance  Manager", {
      horizontalLayout: "default",
      verticalLayout: "default",
      width: 160,
      whitespaceBreak: true,
    })
  );
  console.log(chalk.blue("Welcome to Instance Manager"));
  console.log(chalk.blue("Which action would you like to perform? "));
  inquirer
    .prompt([
      {
        type: "list",
        name: "action",
        message: chalk.green("Please select an option: "),
        choices: ["Pair Device", "Exit"],
      },
    ])
    .then(async (answers) => {
      switch (answers.action) {
        case "Pair Device":
          await pairDevice();
          break;
        case "Exit":
          process.exit();
          break;
      }
    });
}

async function pairDevice() {
  let deviceId = readDataFromFile("deviceId");
  if (deviceId) {
    console.log(chalk.blue(`Device ID: ${deviceId}`));
  }
  axios
    .post(URL + "/generate-code", {
      deviceId: deviceId,
    })
    .then(async (res) => {
      console.log(res.data);
      saveDataToFile("deviceId", res.data.device._id);
      console.log(
        chalk.bgGreenBright("The code is: " + res.data.device.generatedCode)
      );
      await verificationPrompt();
    });
}

async function verificationPrompt() {
  let isConnected = false;
  while (!isConnected) {
    let result = await inquirer.prompt([
      {
        type: "input",
        name: "verify",
        message: chalk.cyan(
          `Type "confirm" after you have verified the code on the website: `
        ),
      },
    ]);
    if (result.verify === "confirm") {
      connectDevice();
      await sleep(2000);
      isConnected = readDataFromFile("isConnected");
      if (isConnected) {
        console.log(chalk.bgGreenBright("Device connected"));
      } else {
        console.log(chalk.bgRedBright("Device not connected. Try again"));
      }
    } else {
      console.log(
        chalk.redBright("Type " + chalk.cyan("confirm") + " to continue")
      );
    }
  }
}

init();
