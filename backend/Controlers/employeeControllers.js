import Employee from "../models/EmployeeModel.js";
import User from "../models/user.js";
import  bcrypt from 'bcrypt'
import path from "path"
import multer from "multer"

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null , "public/uploads")
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    } 
})

const upload = multer({storage: storage})

const addEmployee = async (req , res) => {
    try{
   const {
    name,
    email,
    employeeId,
    dob,
    gender,
    maritalstatus,
    designation,
    department,
    salary,
    password,
    role,

   } = req.body;

   const user = await User.findOne({email})
   if(user){
    return res.status(400).json({success: false, error: "user already registered"});

   }

   const hashPassword = await bcrypt.hash(password,10)

   
    // Map lowercase to UPPERCASE for User schema
    const newUser = new User({
     Name: name,
     Email: email,
     Password: hashPassword ,
     Role: role,
     ProfileImage: req.file ? req.file.filename : ""
    });
    
   const savedUser = await newUser.save()

   const newEmployee = new Employee({
    userId: savedUser._id,
    employeeId,
    dob,
    gender,
    maritalstatus,
    designation,
    department,
    salary
   }) 

   await newEmployee.save() 
   return res.status(200).json({success: true, message: "employee created"})
    }
         catch (error) {
  console.log("🚨 ADD EMPLOYEE ERROR:", error.message);
  console.log("req.body keys:", Object.keys(req.body));
  console.log("department value:", req.body.department);
  console.log("req.file:", req.file ? "EXISTS" : "MISSING");
  return res.status(500).json({ 
    success: false, 
    error: error.message 
  });
}
    }

const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find()
      .populate('userId', { Password: 0 })
      .populate('department');

    return res.status(200).json({
      success: true,
      employees
    });
  } catch (error) {
    console.log("🚨 GET EMPLOYEES ERROR:", error.message);
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Add to your existing employeeControllers.js exports

const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Delete employee first
    const deletedEmployee = await Employee.findByIdAndDelete(id);
    if (!deletedEmployee) {
      return res.status(404).json({ success: false, error: "Employee not found" });    }

    // Delete associated user
    await User.findByIdAndDelete(deletedEmployee.userId);

    return res.status(200).json({ success: true, message: "Employee deleted successfully" });
  } catch (error) {
    console.log("🚨 DELETE EMPLOYEE ERROR:", error.message);
    return res.status(500).json({ success: false, error: error.message });
  }
};

const getEmployeeById = async (req, res) => {
  try {
    const { id } = req.params;

    const employee = await Employee.findById(id)
      .populate('userId', { Password: 0 })
      .populate('department');

    if (!employee) {
      return res.status(404).json({ success: false, error: "Employee not found" });
    }

    return res.status(200).json({ success: true, employee });
  } catch (error) {
    console.log("🚨 GET EMPLOYEE ERROR:", error.message);
    return res.status(500).json({ success: false, error: error.message });
  }
};

const getEmployeeByUserId = async (req, res) => {
  try {
    const { id } = req.params;

    const employee = await Employee.findOne({ userId: id })
      .populate('userId', { Password: 0 })
      .populate('department');

    if (!employee) {
      return res.status(404).json({ success: false, error: "Employee not found" });
    }

    return res.status(200).json({ success: true, employee });
  } catch (error) {
    console.log("🚨 GET EMPLOYEE BY USER ID ERROR:", error.message);
    return res.status(500).json({ success: false, error: error.message });
  }
};

const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name, email, employeeId, dob, gender, maritalStatus, designation, 
      department, salary, password, role
    } = req.body;

    // Find and update employee
    const employee = await Employee.findById(id);
    if (!employee) {
      return res.status(404).json({ success: false, error: "Employee not found" });
    }

    // Update User first
    const updatedUser = await User.findByIdAndUpdate(
      employee.userId,
      {
        Name: name,
        Email: email,
        Role: role,
        ...(req.file && { profileImage: req.file.filename })
      },
      { new: true, runValidators: true }
    );

    // Update Employee
    const updatedEmployee = await Employee.findByIdAndUpdate(
      id,
      {
        employeeId,
        dob,
        gender,
        maritalStatus: maritalStatus || req.body.maritalstatus,
        designation,
        department,
        salary
      },
      { new: true, runValidators: true }
    ).populate('department', 'dep_name');

    return res.status(200).json({
      success: true,
      message: "Employee updated successfully",
      employee: updatedEmployee
    });
  } catch (error) {
    console.log(" UPDATE EMPLOYEE ERROR:", error.message);
    return res.status(500).json({ success: false, error: error.message });
  }
};

export { addEmployee, getEmployees, deleteEmployee, getEmployeeById, upload , getEmployeeByUserId, updateEmployee};
//export {addEmployee, getEmployees,upload}