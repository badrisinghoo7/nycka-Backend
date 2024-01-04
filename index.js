const express = require("express");
const cors = require("cors");
const { connection } = require("./db");
const { userRouter } = require("./routes/user.router");
const { productRouter } = require("./routes/product.route");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/users", userRouter);
app.use("/api/products", productRouter);

app.listen(8080, async () => {
  try {
    await connection;
    console.log("Connected to MongoDB");
    console.log("Listening on port 8080");
  } catch (error) {
    console.log(error);
  }
});
