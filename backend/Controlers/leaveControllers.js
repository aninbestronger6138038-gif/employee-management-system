import mongoose from 'mongoose';
console.log('✅ EXACT leaveControllers.js LOADED');

import Employee from "../models/EmployeeModel.js";
import Leave from '../models/Leave.js';

const addLeave = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("USER:", req.user);

    const { userId, leaveType, startDate, endDate, reason } = req.body;

    if (!userId || !leaveType || !startDate || !endDate || !reason) {
      return res.status(400).json({
        success: false,
        error: "Please fill all required fields"
      });
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        success: false,
        error: "Invalid userId"
      });
    }

   const employee = await Employee.findOne({ userId });
   console.log("LOOKUP userId:", userId);
   console.log("EMPLOYEE FOUND:", employee);

    if (!employee) {
      return res.status(404).json({
        success: false,
        error: "Employee not found"
      });
    }

    const newLeave = new Leave({
      employeeId: employee._id,
      leaveType,
      startDate,
      endDate,
      reason,
      status: "Pending"
    });

    const savedLeave = await newLeave.save();
console.log("SAVED LEAVE:", savedLeave);

return res.status(201).json({
  success: true,
  message: "Leave added successfully",
  leave: savedLeave
});
  } catch (error) {
   console.error("ADD LEAVE ERROR OBJECT:", error);
  console.error("ADD LEAVE ERROR STACK:", error.stack);

  return res.status(500).json({
    success: false,
    error: error.message
  });
  }
};

const getLeaves = async (req, res) => {
  try {
    const employee = await Employee.findOne({ userId: req.user._id });

    if (!employee) {
      return res.status(404).json({
        success: false,
        error: "Employee not found"
      });
    }

    const leaves = await Leave.find({ employeeId: employee._id });

    return res.status(200).json({
      success: true,
      leaves
    });
  } catch (error) {
    console.error("ADD LEAVE ERROR OBJECT:", error);
  console.error("ADD LEAVE ERROR STACK:", error.stack);

  return res.status(500).json({
    success: false,
    error: error.message
  });
  }
};

export { addLeave, getLeaves };