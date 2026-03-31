import Users from "../models/Users.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ message: "all fields are required" });
  }

  try {
    const verifyUser = await Users.findOne({ where: { email } });
    if (verifyUser) {
      return res.status(400).json({ message: "user already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = await Users.create({
      username,
      email,
      password: hashedPassword,
    });

    return res
      .status(200)
      .json({ message: `User: ${newUser.username} created successfully.` });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "error creating user" });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "all fields are required" });
  }

  try {
    const verifyUser = await Users.findOne({ where: { email } });
    if (!verifyUser) {
      return res.status(400).json({ message: "wrong email or password" });
    }

    const verfiyPassword = await bcrypt.compare(password, verifyUser.password);
    if (!verfiyPassword) {
      return res.status(400).json({ message: "wrong email or password" });
    }

    const token = jwt.sign({ id: verifyUser.id }, process.env.JWT_SECRET, {
      expiresIn: "2d",
    });

    res.status(200).json({ token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "error login" });
  }
};
