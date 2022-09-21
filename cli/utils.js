import fs from "fs";

export function saveDataToFile(key, value) {
  const data = fs.readFileSync("config.json");
  const jsonData = JSON.parse(data);
  jsonData[key] = value;
  fs.writeFileSync("config.json", JSON.stringify(jsonData));
}

export function readDataFromFile(key) {
  if (!fs.existsSync("config.json")) return undefined;
  const data = fs.readFileSync("config.json");
  const jsonData = JSON.parse(data);
  return jsonData[key];
}

export function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
