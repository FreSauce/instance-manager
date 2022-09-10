const os = require("os");
const si = require("systeminformation");
var cpus = os.cpus();

const data = {
  cpu: {
    model: "Intel",
    speed: 2400,
    cores: 8,
  },
  memory: {},
};
si.currentLoad().then(console.log);

async function fetchMachineData() {
  const data = {};
  let cpuData = await si.cpu();
  data = {
    ...data,
    cpu: {
      name: {
        manufacturer: cpuData.manufacturer,
        brand: cpuData.brand,
        vendor: cpuData.vendor,
      },
      speed: cpuData.speed,
      processors: cpuData.processors,
      cores: {
        physical: cpuData.physicalCores,
        performance: cpuData.performanceCores,
        efficiency: cpuData.efficiencyCores,
        total: cpuData.cores,
      },
    },
  };
}

// for (var i = 0, len = cpus.length; i < len; i++) {
//   console.log("CPU %s:", i);
//   var cpu = cpus[i],
//     total = 0;

//   for (var type in cpu.times) {
//     total += cpu.times[type];
//   }

//   for (type in cpu.times) {
//     console.log("\t", type, Math.round((100 * cpu.times[type]) / total));
//   }
// }
// console.log("Total memory: " + os.totalmem() / 1024 / 1024 + "MB");
// console.log("Free Memory: " + os.freemem() / 1024 / 1024 + "MB");
// console.log("CPU Uptime: " + os.uptime() / 60 / 60 + "hrs");
// console.log("User Info: " + JSON.stringify(os.userInfo(), null, 2));
