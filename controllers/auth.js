const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
  try {
    const { name, email, password, isAdmin } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(password, 10);
    } catch (erroe) {
      res.status(400).json({
        success: false,
        message: "Error in hasing",
      });
    }

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      isAdmin,
    });

    return res.status(200).json({
      success: true,
      message: "User created successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      messsage: "signup failed",
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: true,
        message: "Please fill the details",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({
        success: false,
        message: "User not registered",
      });
    }

    const payload = {
      email: user.email,
      id: user._id,
      isAdmin: user.isAdmin,
    };

    if (await bcrypt.compare(password, user.password)) {
      let token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "2h",
      });
      user.token = token;
      user.password = undefined;

      // Creating cookie

      const options = {
        expires: new Date(Date.now() + 5 * 60 * 1000),
        httpOnly: true,
      };
      res.cookie("tpncookie", token, options).status(200).json({
        success: true,
        token,
        user,
        message: "User logged in successfully",
      });
    } else
      res.status(400).json({
        success: false,
        message: "login failure",
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "login failure",
    });
  }
};
