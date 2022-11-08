const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel.js");

//@Desc   Post User
//@Route  Post /api/users/register
//@access Private

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }
  // kullanıcının var olup olmadığını kontrol edin
  const userExists = await User.findOne({ email });
  if (userExists) {
    // kullanıcı zaten bu yüzden kayıt olmazsınız
    res.status(400);
    throw new Error("User Allready exists");
  }
  // şifreyi şifreleme hash
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt); //password şifrelendi

  //Create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id), // token olusturma
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

//@Desc   Post User
//@Route  Post /api/users/login
//@access Private

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  // user emaili varmı?
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    // anlamadım

    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id), // token olusturma
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});

//@Desc   Get User data
//@Route  Get /api/users/me
//@access Private

const getMe = asyncHandler(async (req, res) => {
  res.status(200).json(req.user);
});

// Generate jwt
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    //env ne ıse yarıyor && sign methodu nedir
    expiresIn: "30d", // what is this
  });
};

module.exports = {
  registerUser,
  loginUser,
  getMe,
};
