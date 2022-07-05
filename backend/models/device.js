const mongoose = require("mongoose");

const deviceSchema = new mongoose.Schema({
  isConnected: {
    type: Boolean,
    default: false,
  },
  monitoringData: {
    type: mongoose.Schema.Types.Mixed,
    default: {},
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  generatedCode: {
    type: String,
    default: "",
  },
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  }
});

const Device = mongoose.model("Device", deviceSchema);
module.exports = Device;
