const prisma = require("../config/prisma");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate body
    if (!email) {
      return res.status(400).json({ message: "Email is required!!" });
    }
    if (!password) {
      return res.status(400).json({ message: "password is required!!" });
    }

    // Chack Email in DB already!
    const user = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });
    if (user) {
      return res.status(400).json({ message: "Email already exits!!" });
    }
    // HashPassword
    const HashPassword = await bcrypt.hash(password, 10);
    console.log(HashPassword);

    // Register
    await prisma.user.create({
      data: {
        email: email,
        password: HashPassword,
      },
    });

    res.send("Register Success!!");
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "server Error" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check Email
    const user = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });
    if (!user || !user.enabled) {
      return res.status(500).json({ message: "User Not found or not Enabled" });
    }
    // Check Password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(500).json({ message: "Password Invalid!!" });
    }
    
    // Create Payload
    const payload = {
      id: user.id,
      email: user.email,
      role: user.role,
    };

    // Generate Token
    jwt.sign(payload, process.env.SECRET, { expiresIn: "1d" }, (err, token) => {
      if (err) {
        return res.status(500).json({ message: "Server Error" });
      }
      res.json({ payload, token });
    });
    console.log(payload);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "server Error" });
  }
};

exports.currentUser = async (req, res) => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        email: req.user.email,
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
      },
    });
    res.json({ user });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "server Error" });
  }
};
