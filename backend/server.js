const app = require("./app");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const PORT = process.env.PORT || 3000;

const DB = process.env.DATABASE;

mongoose
  .connect(DB, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log("Database successfully connected"))
  .catch((err) => {
    console.log(err);
  });

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
