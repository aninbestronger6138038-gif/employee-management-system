import mongoose from "mongoose";

const salarySchema = new mongoose.Schema({
    employeeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee",
        required: true
    },
    month:{
        type: String,
        required: true
    },
    year:{
        type: Number,
        required: true
    },
    basicSalary: {
        type: Number,
        required: true
    },
    allowances:{
        type: Number,
        default: 0
    },
    deductions: {
        type: Number,
        default: 0
    },
    netSalary: {
        type: Number
    }
},{
    timestamps: true});

salarySchema.pre("save", function(next) {
    this.netSalary = Number(this.basicSalary) + Number(this.allowances) - Number(this.deductions);
 
});

const Salary = mongoose.model("Salary" , salarySchema);
export default Salary;