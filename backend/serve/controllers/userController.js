const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

const registerUser = asyncHandler(async (req, res) => {
  // const { first, email, password } = req.body;
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
      // name: user.name,
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
      email: updatedUser.email
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

const getLoggedInUser = asyncHandler(async (req, res) => {
  const { _id, first_name, last_name, age, town, email } = await User.findById(
    req.user.id
  );
  res.status(200).json({
    id: _id,
    first_name,
    last_name,
    age,
    town,
    email,
  });
});

module.exports = {
  registerUser,
  loginUser,
  updateUser,
  getLoggedInUser,
};
