const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// @desc Register
// @route POST /auth
// @access Public
const register = async (req, res, next) => {
    const { email, password } = req.body;
    bcrypt
      .hash(password, 10)
      .then((hashedPw) => {
        const user = new User({
          email,
          password: hashedPw,
        });
        return user.save();
      })
      .then((result) => {
        res.status(201).json({ message: "User created!", userId: result._id });
      })
      .catch((err) => {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
      });
  };


  // @desc Login
// @route POST /auth
// @access Public
const login = async (req, res) => {
    const { username, password } = req.body;
  
    if (!username || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
  
    const foundUser = await User.findOne({ username }).exec();
  
    if (!foundUser || !foundUser.active) {
      return res.status(401).json({ message: "Unauthorized" });
    }
  
    // const match = await bcrypt.compare(password, foundUser.password);
    // can user custom defined schema func also below is the example
    const match = await foundUser.isCorrectPassword(password, foundUser.password);
  
    if (!match) return res.status(401).json({ message: "Unauthorized" });
  
    const accessToken = jwt.sign(
      {
        UserInfo: {
          username: foundUser.username,
          roles: foundUser.roles,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );
  
    const refreshToken = jwt.sign(
      { username: foundUser.username },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "7d" }
    );
  
    // Create secure cookie with refresh token
    res.cookie("jwt", refreshToken, {
      httpOnly: true, //accessible only by web server
      secure: true, //https
      sameSite: "None", //cross-site cookie
      maxAge: 7 * 24 * 60 * 60 * 1000, //cookie expiry: set to match rT
    });
  
    // Send accessToken containing username and roles
    res.json({ accessToken });
  };
  
  // @desc Refresh
  // @route GET /auth/refresh
  // @access Public - because access token has expired
  const refresh = (req, res) => {
    const cookies = req.cookies;
  
    if (!cookies?.jwt) return res.status(401).json({ message: "Unauthorized" });
  
    const refreshToken = cookies.jwt;
  
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      async (err, decoded) => {
        if (err) return res.status(403).json({ message: "Forbidden" });
  
        const foundUser = await User.findOne({
          username: decoded.username,
        }).exec();
  
        if (!foundUser) return res.status(401).json({ message: "Unauthorized" });
  
        const accessToken = jwt.sign(
          {
            UserInfo: {
              username: foundUser.username,
              roles: foundUser.roles,
            },
          },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "15m" }
        );
  
        res.json({ accessToken });
      }
    );
  };

const getLogin = (req, res) =>{
  res.json({success:"200"})
}

const logout = (req, res) =>{
  res.json({success:"200"})
}

module.exports = {
    refresh,
    register,
    login,
    logout,
    getLogin,
    
}