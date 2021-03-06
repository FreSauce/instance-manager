import os from "os";

var cpus = os.cpus();

for (var i = 0, len = cpus.length; i < len; i++) {
  console.log("CPU %s:", i);
  var cpu = cpus[i],
    total = 0;

  for (var type in cpu.times) {
    total += cpu.times[type];
  }

  for (type in cpu.times) {
    console.log("\t", type, Math.round((100 * cpu.times[type]) / total));
  }
}
console.log("Total memory: " + os.totalmem() / 1024 / 1024);
console.log("Free Memory: " + os.freemem() / 1024 / 1024);
console.log("CPU Uptime: " + os.uptime() / 60 / 60);
console.log("User Info: " + JSON.stringify(os.userInfo(), null, 2));
