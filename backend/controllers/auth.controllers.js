import User from "../models/user.schema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const Register = async (req, res) => {
  try {
    const { userName, email, password, fullName } = req.body;

    if (!userName || !email || !fullName) {
      return res.json({ success: true, message: "all fields are required" });
    }

    const userExist = await User.findOne({ email: email });

    if (userExist) {
      return res.json({
        success: false,
        message: "email already exist",
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      fullName,
      email,
      userName,
      password: hashPassword,
    });

    await newUser.save();

    return res.json({ success: true, message: "register successfully" });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error });
  }
};

export const Login = async (req, res) => {
  try {
    const { userName, password } = req.body;

    if (!userName) {
      return res.json({ success: false, message: "user name required" });
    }
    if (!password) {
      return res.json({ success: false, message: "password required" });
    }

    const userExist = await User.findOne({ userName: userName });

    if (!userExist) {
      return res.json({
        success: false,
        message: "user not found, please register",
      });
    }

    const checkPassword = await bcrypt.compare(password, userExist.password);

    if (!checkPassword) {
      return res.json({ success: false, message: "password wrong" });
    }

    const token = jwt.sign({ userId: userExist._id }, process.env.SECREATKEY);

    return res.json({
      success: true,
      message: "Login Successfully ..",
      userData: {
        user: {
          userId: userExist._id,
          name: userExist.name,
          phone: userExist.phone,
          role: userExist.role,
        },
        token: token,
      },
    });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error });
  }
};

export const GetCurrentUser = async (req, res) => {
  try {
    const { token } = req.body;
    if (!token) {
      return res.json({ success: false });
    }

    const tokenData = jwt.verify(token, process.env.SECREATKEY);
    if (!tokenData) {
      return res.json({ success: false });
    }

    const isUserExists = await User.findById(tokenData.userId);
    if (!isUserExists) {
      return res.json({ success: false });
    }

    return res.json({
      success: true,
      userData: {
        user: {
          userId: isUserExists._id,
          fullName: isUserExists.fullName,
          userName: isUserExists.userName,
        },
      },
    });
  } catch (error) {
    console.log(error, "error in get-current-user api call ..");
    return res.json({ success: false, message: error });
  }
};
