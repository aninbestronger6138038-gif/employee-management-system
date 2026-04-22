import Salary from "../models/Salary.js";
import mongoose from "mongoose";
import Employee from "../models/EmployeeModel.js";

const addSalary = async(req, res) => {
    try{
        console.log("REQ BODY:", req.body);
        const { employeeId , month , year, basicSalary , allowances, deductions} = req.body;
   
        if(!employeeId || !month || !year || !basicSalary){
            return res.status(400).json({
                success: false,
                error: "Please fill all required fields"
            });
        }

        if(!mongoose.Types.ObjectId.isValid(employeeId)){
            return res.status(400).json({
                success: false,
                error: "Invalid employee ID"
            });
        }

    const  newSalary = new Salary ({
        employeeId,
        month,
        year,
        basicSalary,
        allowances: allowances || 0,
        deductions: deductions || 0
    });

    await newSalary.save();

    return res.status(201).json ({
        success: true,
        message: "Salary added successfully",
        salary: newSalary
    });

    }catch(error){
        console.log("ADD Salary error: " , error.message);
        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

const getSalaries =  async (req, res) => {
    try{

        let salaries = await Salary.find().populate({
            path: 'employeeId',
            populate: {
                path: "userId",
                select: "Name Email profileImage"
            },
        })
        .sort({ createdAt: -1});

        return res.status(200).json({ success: true, salaries});
    }catch(error){
        console.log("GET SALARIES ERROR:" , error.message);
        return res.status(500).json({ 
            success: false ,
             error: error.message
            });
        }
};

const getSalaryByEmployeeId = async (req,res) => {
    try{
        const {id} = req.params;
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({
                success: false,
                error:"Invalid employee ID",
            });
        }

        const employee = await Employee.findOne({userId: id});

       if(!employee){
         return res.status(404).json({
            success: false,
            error: "Employee Not found",
         });
       }

       const salaries = await Salary.find({ employeeId: employee._id})
       .populate({
        path: "employeeId",
        populate: {
            path: "userId",
            select: "Name Email profileImage",
        },
       })
       .sort({ createdAt: -1});

       return res.status(200).json({
        success: true,
        salaries,
       });
    }catch(error){
        console.log("GET SALARY BY EMPLOYEE ERROR:" , error.message);
        return res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};

export {addSalary, getSalaries, getSalaryByEmployeeId};