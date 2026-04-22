import jwt from 'jsonwebtoken';
import User from "../models/user.js";
import bcrypt from 'bcrypt'

const login = async (req ,res) => {

    try{
        const {email,password} = req.body;
        const user = await User.findOne({ Email: email});
        if(!user){
           return  res.status(400).json({success: false , error: "User Not Found"})
        }
        
        const isMatch  = await bcrypt.compare(password , user.Password)
        if(!isMatch){
           return res.status(404).json({success: false , error: "Wrong Password"})
        }
        
        const token = jwt.sign({_id : user._id , Role: user.Role} ,
             process.env.JWT_KEY, {expiresIn : "10d"}
        )

        res.status(200).json({success: true , token ,
             user : {_id: user._id , Name: user.Name , Role :user.Role}});
    }catch (error){
        console.log(error);
        res.status(500).json({ success: false, error: error.message  });
    }
};

const verify = (req, res) => {
    return res.status(200).json({success: true, user: req.user})
}

export {login , verify};