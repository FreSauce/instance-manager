const Device = require("../models/device");
const AppError = require("../AppError");
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");

const generateToken = (deviceId) => {
  return jwt.sign({ deviceId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.checkVerification = async (token) => {
  try {
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    const device = await Device.findById(decoded.deviceId);
    if (!device) return new AppError("Invalid device id", 400);
    if (!device.isVerified) {
      new AppError("Device not verified", 400);
      return undefined;
    }
    return device;
  } catch (err) {
    new AppError(err.message, 500);
    return undefined;
  }
};

exports.generateCode = async (req, res, next) => {
  try {
    const code = uuidv4();
    let device;
    if (req.body.deviceId) {
      device = await Device.findById(req.body.deviceId);
      if (device)
        device = await Device.findByIdAndUpdate(
          device._id,
          { generatedCode: code },
          { new: true }
        );
      else return next(new AppError("Invalid device id", 400));
    } else
      device = await Device.create({
        generatedCode: code,
      });
    const token = generateToken(device._id);
    res.status(201).json({
      status: "success",
      device,
      token,
    });
  } catch (err) {
    next(new AppError(err.message, 500));
  }
};

exports.verifyCode = async (req, res, next) => {
  try {
    const { code } = req.body;
    const device = await Device.findOne({ generatedCode: code });
    if (!device) {
      return next(new AppError("Invalid code", 400));
    }
    console.log(device);
    const updatedDevice = await Device.findByIdAndUpdate(
      device._id,
      {
        isVerified: true,
        // user: req.user._id,
      },
      { new: true }
    )
    // .populate({
    //   path: "user",
    // });
    res.status(200).json({
      status: "success",
      updatedDevice,
    });
  } catch (err) {
    next(new AppError(err.message, 500));
  }
};
