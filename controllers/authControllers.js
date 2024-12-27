const UserModel = require("../models/UserModel");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


//Register
exports.registerController = async (req, res) => {
  try {
    const { userName, email, password, phone, address,answer } = req.body;
    if (!userName || !email || !password || !phone || !address || !answer) {
      return res.status(500).send({
        sucess: false,
        message: 'please provide all fields'
      })
    }
    const exisiting = await UserModel.findOne({ email })
    if (exisiting) {
      return res.status(500).send({
        sucess: false,
        message: 'email is already registered please login'
      })
    }
    //hashing password
    var salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(password, salt)
    const user = await UserModel.create({ userName, email, password: hashedPassword, phone, address,answer})
    res.status(200).send({
      sucess: true,
      message: "Registerd successfully"
    });
  } catch (error) {
    console.log(error)
    res.status(500).send({
      sucess: false,
      message: "Error in register api",
      error
    })
  }
}

exports.loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(500).send({
        sucess: false,
        message: "please provide email or password",

      })
    }
    const user = await UserModel.findOne({ email })
    if (!user) {
      return res.status(404).send({
        sucess: false,
        message: "user is not found"
      })
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(500).send({
        sucess: false,
        message: "Invalid credenticals"
      })
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    })
    user.password = undefined;
    res.status(200).send({
      sucess: true,
      message: "login successfully",
      token,
      user
    })
  } catch (error) {
    res.status(500).send({
      sucess: false,
      message: "Error login api",
      error
    })
  }
}
