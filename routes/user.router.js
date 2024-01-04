const { Router } = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../model/user.model");

const userRouter = Router();

userRouter.post("/register", async (req, res) => {
  const { name, email, password, avatar } = req.body;
  try {
    if (!name || !email || !password) {
      res
        .status(422)
        .json({ error: "Please provide name, email and password." });
    }

    const newEmail = email.toLowerCase();
    const emailExists = await UserModel.findOne({ email: newEmail });

    if (emailExists) {
      res.status(422).json({ error: "Email already exists." });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);

    const newUser = await UserModel.create({
      name,
      email: newEmail,
      avatar,
      password: hashedPass,
      created_at: new Date(),
    });
    res
      .status(201)
      .json(`New user:${newUser} and for this email ${newEmail} is created`);
  } catch (error) {
    res
      .status(422)
      .json({ error: error.message, err: "this is the catch error" });
  }
});

userRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) {
      res.status(401).json({ error: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(401).json({ error: "Invalid credentials" });
    }
    const { _id: id, name } = user;
    const token = jwt.sign({ id, name }, "masai");
    res
      .status(200)
      .json({ message: "Login successful", token: token, ID: id, NAME: name });
  } catch (error) {
    res
      .status(401)
      .json({ error: error.message, err: "this is the catch error" });
  }
});

module.exports = { userRouter };
