const express = require("express");
const authController = require("../controllers/authController");
const deviceController = require("../controllers/deviceController");

const router = express.Router();

router.post("/generate-code", deviceController.generateCode);
router.post(
  "/verify-code",
  // authController.protect,
  deviceController.verifyCode
);

module.exports = router;
