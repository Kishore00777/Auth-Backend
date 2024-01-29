const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../Model/UserModel");

exports.signup = async (req, res) => {
  try {
    const { userName, email, password } = req.body;
    let user = await User.findOne({ email }); // checking weather email is already existing or not
    if (user) {
      return res.status(400).json({ message: "Email already exists" });
    }
    if (!password) {
      return res.status(400).json({ message: "password is required" });
    }
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds); // random value used as additional input to hash password
    const hashedpassword = await bcrypt.hash(password, salt); // hashes password using salt
    user = new User({ userName, email, password: hashedpassword });

    await user.save();
    res.status(201).json({ message: "Registered Successfully", userName: user.userName });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error haha" });  
  }
};
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ message: "Invalid email" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({ message: "Invalid password" });
    }
    const payload = { user: { id: user.id, userName: user.userName } };
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
      (err, token) => {
        if (err) throw err;
        res.json({ token , userName: user.userName });
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "server eror" });
  }
};
exports.logout = async (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: "Error on logout" });
    } else {
      res.status(200).json({ message: "Logged out Successfully" });
    }
  });
};
