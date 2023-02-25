const jwt = require("jsonwebtoken");
const { hashPassword, comparePassword } = require("../helpers/api");
const User = require("../models/UserModel");
exports.Signup = async (req, res) => {
  const { name, email, photo, password } = req.body;
  console.log(name);
  if (!name.trim()) {
    return res.status(400).json({ message: "Name is required" });
  }
  if (!email) {
    return res.status(400).json({

      message: "Email is required",
    });
  }
  if (!password || password.length < 6) {
    return res.status(400).json({
      message: "Password must be at least 6 characters long",
    });
  }
  console.log(req.body);
    try {
      // Hashing password
      const hashedPassword = await hashPassword(password);
      // Creating user object with hashed password
     const existingUser =  await User.aggregate([{ $match: { email } }])
      if (existingUser.length>0) {
        return  res.status(400).json({ message: 'This email is already existing!' });

      } else {
        
      const user = await User.create({
        name: name,
        email: email,
        photo: photo,
        password: hashedPassword
    });
    let Payload = {
      exp: Math.floor(Date.now() / 1000) * (24 * 60 * 60),
      data: user["email"],
    };
    let token = jwt.sign(Payload, process.env.JWT_SECRET);
    res.status(201).json({ message: 'User created successfully',data:user ,token});

     

      }

      
      
    } catch (err) {
      res.json({
        status: 400,
        message: "Failed",
        data:err
      })   }
}
  
exports.Login = async(req, res) => {
  const {email,password} = req.body;
  try {
    await User.aggregate([{ $match: { email: email } }], async(err, data) => {
      
      if (data.length > 0) {
        const matchPassword = await comparePassword(password, data[0].password)
        if (matchPassword) {
          let Payload = {
            exp: Math.floor(Date.now() / 1000) * (24 * 60 * 60),
            data: data[0].email,
          };
          let token = jwt.sign(Payload, process.env.JWT_SECRET);
          res.status(200).json({
            message: "Login Successful",
            data: data,
            token:token
           })
        } else {
          res.status(400).json({
            message: "Password Incorrect",
            data:null
           })
        }
      
      } else {
        res.status(400).json({
          message: "User not found!",
          data:err
        })
       }
    })
  } catch (error) {
    res.status(400).json({
      message:"Login Failed"
    })
  }
}

exports.SelectProfile = async(req, res) => {
  const email = req.headers.email;
  try {
     await User.aggregate([{ $match: { email } }], (err, data) => {
    if (!err) {
      res.status(200).json({
        message: "Profile Selected",
        data:data[0]
      })
    }
  })
  } catch (error) {
    res.status(400).json({
      message: "Something went wrong!",
      data:error
    })
  }
 
}