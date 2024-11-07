//import jwt
const jwt = require("jsonwebtoken");

//import prisma DB
const prisma = require("../config/prisma");

exports.authCheck = async (req, res, next) => {
  try {
    const headerToken = req.headers.authorization;
    if (!headerToken) {
      return res.status(500).json({ message: "missing Token, Authorization" });
    }
    const token = headerToken.split(" ")[1];

    //verify Token
    const decode = jwt.verify(token, process.env.SECRET);
    req.user = decode;

    //Check in DB
    const user = await prisma.user.findFirst({
      where: {
        email: req.user.email,
      },
    });
    if (!user.enabled) {
      return res.status(400).json({ message: "This account cannot access" });
    }

    next();
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Token Invalid!!" });
  }
};

exports.adminCheck = async (req, res, next) => {
  try {
    const { email } = req.user;
    const adminUser = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });
    if (!adminUser || adminUser.role !== "admin") {
      return res.status(403).json({ message: "Access Denied: Admin only" });
    }

    // console.log("Admin Email = ", adminUser);
    next();
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error Admin access denied" });
  }
};
