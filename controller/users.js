/** curd operations
 * create user
 * get all users
 * get user id
 * update user
 * delete user
 */

//upload image 

//authentication & autherization

//validation 
const express=require('express');
const User=require("../models/users")
const imagekit=require('../utils/imagekit')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const signup = async (req, res) => {
  try {
    const { name, email, password, age, role } = req.body; 
    if (!name || !email || !password) {
      return res.status(400).json({
        status: "fail",
        message: "Missing required fields"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    let imageUrl = null;// add to middleware***********************************
    if (req.file) {
      const uploadedImage = await imagekit.upload({
        file: req.file.buffer,
        fileName: req.file.originalname,
      });
      imageUrl = uploadedImage.url;
    }

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      age,
      role: role || 'user',
      photo: imageUrl
    });

    res.status(201).json({
      status: "success",
      data: user
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message
    });
  }
};


const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }


    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

 
    const token = jwt.sign(
      { id: user.id, role: user.role }, 
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

  
    res.status(200).json({
      status: 'success',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role 
      }
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};



const getallusers=async(req,res)=>{
        const users = await User.find();

        res.status(200).json({
            status: "success",
            data: users
        });
    } 

    const getUserById=async(req,res)=>{
        const user=await User.findById(req.params.id);
            res.status(200).json({
            status: "success",
            data: user
        });
    }
const updateUser = async (req, res) => {
  console.log(req.body)
 
    const user = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      
      {
        new: true,
        runValidators: true 
      }
      
    );
    if (!user) {
      return res.status(404).json({ status: "fail", message: "User not found" });
    }
    res.status(200).json({ status: "success", data: user });
  
};

const deleteUser = async (req, res) => {
  console.log("DELETE route hit");
  console.log("ID to delete:", req.params.id);
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ status: "fail", message: "User not found" });
    }
    res.status(200).json({ status: "success", message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ status: "fail", message: err.message });
  }
};


module.exports= {
signup,
getallusers,
getUserById,
updateUser,
deleteUser,
login
}