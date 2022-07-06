const Device = require("../models/device");
const AppError = require("../AppError");
const { v4: uuidv4 } = require("uuid");

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
    res.status(201).json({
      status: "success",
      device,
    });
  } catch (err) {
    next(new AppError(err.message, 500));
  }
};

exports.verifyCode = async (req, res, next) => {
  try {
    const { code } = req.body;
    console.log(req.user);
    const device = await Device.findOne({ generatedCode: code });
    if (!device) {
      return next(new AppError("Invalid code", 400));
    }
    const updatedDevice = await Device.findByIdAndUpdate(
      device._id,
      {
        isVerified: true,
        user: req.user._id,
      },
      { new: true }
    ).populate({
      path: "user",
    });
    res.status(200).json({
      status: "success",
      updatedDevice,
    });
  } catch (err) {
    next(new AppError(err.message, 500));
  }
};
