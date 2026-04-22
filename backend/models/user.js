import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
     
    Name:  {type: String , required: true},
    Age: {type: Number },
    Email:{type: String , required: true ,unique: true },
    Password :{type: String , required: true},
    Role : {type: String , enum :["Admin" , "Employee"] , required: true},
    ProfileImage:{type: String},
    Created : { type: Date , default: Date.now},
    Updated : { type: Date , default: Date.now}
});

const User = mongoose.model('User',UserSchema);
export default User; 