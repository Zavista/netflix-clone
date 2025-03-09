import { User } from "../models/user.model.js";
import bcrypt, { hash } from "bcryptjs";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";

export const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ message: "All fields are required", success: false });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res
        .status(400)
        .json({ message: "Invalid email format", success: false });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters",
        success: false,
      });
    }

    const existingUserByEmail = await User.findOne({ email: email });
    if (existingUserByEmail) {
      return res.status(400).json({
        message: "User with this email already exists",
        success: false,
      });
    }

    const existingUserByUsername = await User.findOne({ username: username });
    if (existingUserByUsername) {
      return res.status(400).json({
        message: "User with this username already exists",
        success: false,
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    const PROFILE_PICS = ["/avatar1.png", "/avatar2.png", "/avatar3.png"];
    const random = Math.floor(Math.random() * PROFILE_PICS.length);
    newUser.image = PROFILE_PICS[random];

    if (newUser) {
      generateTokenAndSetCookie(newUser._id, res);

      await newUser.save();

      const userResponse = newUser.toObject();
      userResponse.password = "";

      res.status(201).json({
        message: "User registered successfully",
        success: true,
        user: { userResponse },
      });
    } else {
      res.status(400).json({
        message: "Failed to register user",
        success: false,
      });
    }
  } catch (error) {
    console.log("Error in signup controller: ", error);
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "All fields are required", success: false });
    }

    const user = await User.findOne({ email: email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "Invalid credentials", success: false });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ message: "Invalid credentials", success: false });
    }

    generateTokenAndSetCookie(user._id, res);
    const userResponse = user.toObject();
    userResponse.password = "";

    res.status(201).json({
      message: "User logged in successfully",
      success: true,
      user: { userResponse },
    });
  } catch (error) {
    console.log("Error in login controller: ", error);
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("jwt-netflix");
    res.status(200).json({ message: "Logged out successfully", success: true });
  } catch (error) {
    console.log("Error in logout controller: ", error);
    res.status(500).json({ message: "Internal server error", success: false });
  }
};
