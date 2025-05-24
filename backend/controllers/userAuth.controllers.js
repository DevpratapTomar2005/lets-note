import {
  generateUserAccessToken,
  generateUserRefreshToken,
} from "../utils/generateUserTokens.js";
import User from "../models/userSchema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const userRegister = async (req, res) => {
  const { fullname, email, password } = req.body;

  try {
    const userExists = await User.findOne({
      fullname: fullname,
      email: email,
    }).select("-refreshToken -todos -notes -createdAt -updatedAt");

    if (userExists) {
      return res
        .status(400)
        .json({ message: "User already exists! Try to login" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      fullname,
      email,
      password: hashedPassword,
    });

    const accessToken = generateUserAccessToken(user);
    const refreshToken = generateUserRefreshToken(user);
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return res
      .status(201)
      .cookie("current_session_token", accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "Strict",
        maxAge: 7 * 24 * 60 * 60 * 1000 
      })
      .cookie("max_session_token", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "Strict",
        maxAge: 7 * 24 * 60 * 60 * 1000 
      })
      .json({ message: "User registered successfully!",user:{fullname:user.fullname,email:user.email,pfp:user.pfpUrl} });
  } catch (error) {
    
    return res.status(500).json({ message: "Something went wrong!" });
  }
};

const userLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email }).select(
      "-refreshToken -createdAt -updatedAt"
    );
    if (!user) {
      return res
        .status(400)
        .json({ message: "User doesn't exist! Try to register" });
    }
    if (!(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const accessToken = generateUserAccessToken(user);
    const refreshToken = generateUserRefreshToken(user);
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return res
      .status(201)
      .cookie("current_session_token", accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "Strict",
        maxAge: 7 * 24 * 60 * 60 * 1000 
      })
      .cookie("max_session_token", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "Strict",
        maxAge: 7 * 24 * 60 * 60 * 1000 
      })
      .json({ message: "User logged in successfully!",user:{fullname:user.fullname,email:user.email,todos:user.todos,notes:user.notes,pfp:user.pfpUrl} });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong!" });
  }
};

const userLogout = async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.user._id, { $set: { refreshToken: "" } });
    return res
      .status(201)
      .clearCookie("current_session_token", {
        httpOnly: true,
        secure: true,
        sameSite: "Strict",
      })
      .clearCookie("max_session_token", {
        httpOnly: true,
        secure: true,
        sameSite: "Strict",
      })
      .json({ message: "Logged out successfully!" });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong!" });
  }
};

const refreshUserToken = async (req, res) => {
  const refreshToken = req.cookies.max_session_token;
  try {
    if (!refreshToken) {
      return res.status(400).json({ message: "Unauthorized user" });
    }

    const decodedToken = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const user = await User.findById(decodedToken.id).select(
      "-todos -notes -createdAt -updatedAt"
    );

    if (!user) {
      return res.status(400).json({ message: "Unauthorized user"  });
    }
    if (user.refreshToken !== refreshToken) {
      
      return res.status(400).json({ message: "Unauthorized user"  });
    }

    const accessToken = generateUserAccessToken(user);
    return res
      .status(201)
      .cookie("current_session_token", accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "Strict",
        maxAge: 7 * 24 * 60 * 60 * 1000 
        
      })
      .json({ message: "Token refreshed successfully!" });
  } catch (error) {
    
    if(error.name==="TokenExpiredError"){
        return res.status(401) .clearCookie("current_session_token", {
          httpOnly: true,
          secure: true,
          sameSite: "Strict",
        })
        .clearCookie("max_session_token", {
          httpOnly: true,
          secure: true,
          sameSite: "Strict",
        })
        .json({ message: "Token expired" });
    }
    return res.status(500).json({ message: "Something went wrong!" });
  }
};

const persistUserNextVisit = async (req, res) => {
  const { current_session_token, max_session_token } = req.cookies;

  try {
    if (!current_session_token || !max_session_token) {
      return res
        .status(400)
        .clearCookie("current_session_token", {
          httpOnly: true,
          secure: true,
          sameSite: "Strict",
        })
        .clearCookie("max_session_token", {
          httpOnly: true,
          secure: true,
          sameSite: "Strict",
        })
        .json({ message: "User Logged Out" });
    }

    const decodedAccessToken = jwt.verify(
      current_session_token,
      process.env.ACCESS_TOKEN_SECRET
    );
    const decodedRefreshToken = jwt.verify(
      max_session_token,
      process.env.REFRESH_TOKEN_SECRET
    );

    

    if (decodedRefreshToken && decodedAccessToken) {
      const user=await User.findById(decodedAccessToken.id).select('-refreshToken -password -createdAt -updatedAt')
      return res.status(200).json({ message: "User Logged In",user:{fullname:user.fullname,email:user.email,todos:user.todos,notes:user.notes,pfp:user.pfpUrl} });
    } else {
      return res
        .status(400)
        .clearCookie("current_session_token", {
          httpOnly: true,
          secure: true,
          sameSite: "Strict",
        })
        .clearCookie("max_session_token", {
          httpOnly: true,
          secure: true,
          sameSite: "Strict",
        })
        .json({ message: "User Logged Out" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong!" });
  }
};
export default {
  userRegister,
  userLogin,
  userLogout,
  refreshUserToken,
  persistUserNextVisit,
};
