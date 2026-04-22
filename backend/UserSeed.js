import User from "./models/user.js";
import bcrypt from 'bcrypt';
import connectDB from "./models/Database/Database.js";

const UserRegister = async  () => {
   await  connectDB();
try{
    
    const hashPassword = await bcrypt.hash("Admin",10)
    const newUser = new User(
        {
            Name : "Admin",
            Email : "aninibestronger6138038@gmail.com",
            Password : hashPassword,
            Role :  "Admin"
        });
        await newUser.save();
        console.log("Admin created successfully");
        process.exit();
}
catch(error){
   console.log(error);
   process.exit(1);
}
}


UserRegister();