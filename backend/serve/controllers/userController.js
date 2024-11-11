const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

const registerUser = asyncHandler(async (req, res) => {
  const { first_name, last_name, age, town, gender, email, password } =
    req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("Please enter your email and password");
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    first_name,
    last_name,
    age,
    town,
    gender,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});

const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  if (user) {
    user.first_name = req.body.first_name || user.first_name;
    user.last_name = req.body.last_name || user.last_name;
    user.age = req.body.age || user.age;
    user.town = req.body.town || user.town;
    user.gender = req.body.gender || user.gender;
    user.email = req.body.email || user.email;

    const updatedUser = await user.save();

    res.status(200).json({
      _id: updatedUser._id,
      first_name: updatedUser.first_name,
      last_name: updatedUser.last_name,
      age: updatedUser.age,
      town: updatedUser.town,
      gender: updatedUser.gender,
      email: updatedUser.email,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const getLoggedInUser = asyncHandler(async (req, res) => {
  const { _id, first_name, last_name, age, town, gender, email } =
    await User.findById(req.user.id);
  res.status(200).json({
    id: _id,
    first_name,
    last_name,
    age,
    town,
    gender,
    email,
  });
});

const forgotPassword = asyncHandler(async (req, res) => {
  if (process.env.GOOGLE_APP_EMAIL && process.env.GOOGLE_APP_PW) {
    const email = req.body.email;
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ error: "User with this email does not exist" });
      }

      const token = jwt.sign(
        { _id: user._id },
        process.env.RESET_PASSWORD_KEY,
        { expiresIn: "15m" },
      );

      let mailTransporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.GOOGLE_APP_EMAIL,
          pass: process.env.GOOGLE_APP_PW,
        },
      });

      const data = {
        to: email,
        subject: "Reset Account Password Link",
        html: `
        <h3>Please click the link below to reset your password</h3>
        <p>${process.env.CLIENT_URL}/reset?token=${token}</p>
        <p>The link expires in 15 minutes</p>
        `,
      };

      const updatedUser = await user.updateOne({ resetLink: token });

      await mailTransporter.sendMail(data);

      return res.status(200).json({
        message: "Email has been sent, please follow the instructions",
      });
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  } else {
    return res.status(400).json({
      error:
        "You have not set up an account to send an email or a reset password key for jwt",
    });
  }
});

const updatePassword = asyncHandler(async (req, res) => {
  const { token, password } = req.body;
  if (token) {
    try {
      const decodedData = jwt.verify(token, process.env.RESET_PASSWORD_KEY);
      const user = await User.findOne({ resetLink: token });
      if (!user) {
        return res
          .status(400)
          .json({ error: "User with this token does not exist" });
      }

      // hash the new password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      user.password = hashedPassword;
      const result = await user.save();
      return res
        .status(200)
        .json({ message: "Your password has been changed" });
    } catch (error) {
      if (error.name === "JsonWebTokenError") {
        return res
          .status(400)
          .json({ error: "Incorrect token or it is expired" });
      } else {
        console.log(error);
        return res.status(400).json({ error: "Reset Password Error" });
      }
    }
  } else {
    return res.status(401).json({ error: "Authentication Error" });
  }
});

module.exports = {
  registerUser,
  loginUser,
  updateUser,
  getLoggedInUser,
  forgotPassword,
  updatePassword,
};
