import { Router } from "express";
import { userModel } from "../models/user.model.js";

const router = Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ error: "Email and password are required" });

  const user = await userModel.findOne({ email });

  if (!user) return res.status(404).json({ error: "User not found" });

  if (user.password !== password)
    return res.status(401).json({ error: "Invalid password" });

  req.session.user = {
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    age: user.age,
  };

  res.json({ message: "Login successfully" });
});

router.post("/register", async (req, res) => {
  const { first_name, last_name, email, password, age } = req.body;

  if (!first_name || !last_name || !email || !password || !age)
    return res.status(400).json({ error: "All fields are required" });

  const user = await userModel.findOne({ email });

  if (user) return res.status(400).json({ error: "User already exists" });

  const newUser = await userModel.create({
    first_name,
    last_name,
    email,
    password,
    age,
  });

  // req.session.user = {
  //   first_name: newUser.first_name,
  //   last_name: newUser.last_name,
  //   email: newUser.email,
  //   age: newUser.age,
  // };

  res.json({ message: "User created successfully", user: newUser });
});

router.get("/logout", (req, res) => {
  req.session.destroy();

  res.json({ message: "Logout successfully" });
});

export default router;
