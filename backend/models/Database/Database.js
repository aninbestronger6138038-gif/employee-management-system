
import mongoose from "mongoose";

const connectDB =async() => {
    try{
         await mongoose.connect(process.env.MONGO_URI);
         console.log("Connected with MongoDB");
         console.log("DB NAME:", mongoose.connection.name);
         console.log("DB HOST:", mongoose.connection.host);

    }catch (err) {
          console.log("Connection error" , err);
          process.exit(1);
    }
};
export default connectDB