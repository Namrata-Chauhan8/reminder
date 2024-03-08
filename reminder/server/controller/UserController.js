const express = require("express");
const User = require("../model/User"); 
const bcrypt = require('bcrypt'); 



const signupUser=async (req, res) => {
    try {
      const { username, email, password } = req.body;
  
      let existingUser = await User.findOne({ email : req.body.email });
      if (existingUser) {
        return res.status(400).json({ error: "Email already exists" });
      }else{
  
      const hashedPassword = await bcrypt.hash(password, 10); 
  
      const newUser = new User({ username, email, password: hashedPassword });
      await newUser.save();
  
      res.status(201).json({ message: "User signed up successfully", newUser: newUser});
    }
    } catch (error) {
      console.error("Error signing up user:", error);
      res.status(500).json({ error: "An error occurred while signing up" });
    }
  }


  const loginUser=async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(400).json({ msg: 'Email does not exist' });
      }
      else{
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: 'Invalid password' });
      } else {
        res.json({ msg: 'Login successful', user });
      }
    }
    } catch (error) {
      console.error('Error logging in user:', error);
      res.status(500).send('Server Error');
    }
  }

  module.exports = {
    signupUser: signupUser,
    loginUser: loginUser
  };