const Device = require("../models/device");
const AppError = require("../AppError");
const { v4: uuidv4 } = require("uuid");

exports.generateCode = async (req, res, next) => {
  try {
    const code = uuidv4();
    const newDevice = await Device.create({
      generatedCode: code,
    });
    res.status(201).json({
      status: "success",
      newDevice,
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
    );
    res.status(200).json({
      status: "success",
      updatedDevice,
    });
  } catch (err) {
    next(new AppError(err.message, 500));
  }
};
