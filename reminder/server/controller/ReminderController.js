const express = require("express");
const list = require("../model/ReminderList");
const user = require("../model/User");

const router = express.Router();

const addReminder= async (req, res) => {
    try {
      const { title, description, date, time, id } = req.body;
  
      const existingUser = await user.findById(id);
      if (existingUser) {
        const reminder = new list({
          title,
          description,
          date,
          time,
          user: existingUser,
        });
        await reminder.save().then(() => res.status(200).json({ reminder }));
        existingUser.save();
      }else{
        res.status(404).json({ error: "User not found" });
      }
    } catch (error) {
      console.error(error);
    }
  }


  const updateReminder=async (req, res) => {
    try {
      const { title, description, date, time } = req.body;
      const updateList = await list.findByIdAndUpdate(req.params.id, { title, description, date, time });
      
      if (updateList) {
        res.status(200).json({ message: "Task Updated successfully!!!", updateList});
      } else {
        res.status(404).json({ message: "Task not found"});
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error"});
    }
  }


  const deleteReminder=async (req, res) => {
    try {
     const deleteReminder= await list.findByIdAndDelete(req.params.id);
     if (deleteReminder) {
      res.status(200).json({ message: " Reminder Deleted successfully" });
     } else {
      res.status(404).json({ message: " Reminder Not found" });
     }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  const getReminder=async (req, res) => {
    const getList = await list.find({ user: req.params.id });
    if (getList.length !== 0) {
      res.status(200).json({ getList: getList });
    } else {
      res.status(200).json({ message: "No Reminder" });
    }
  }

  module.exports = {
    addReminder:addReminder,
    updateReminder:updateReminder,
    deleteReminder:deleteReminder,
    getReminder:getReminder
};