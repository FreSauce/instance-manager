const path = require("path");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const userRouter = require("./routes/userRoute");
const app = express();

if (process.env.NODE_ENV === "development") app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use("/api/users", userRouter);

app.use("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  console.log(err);
  res.status(statusCode).json({
    status: "error",
    message: statusCode === 500 ? "Something went wrong" : message,
  });
});

module.exports = app;
