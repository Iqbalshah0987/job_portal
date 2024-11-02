import mongoose from "mongoose";

const connectDB = async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Mongodb Connected Successfully!");
    } catch (error) {
        console.log("Error DB: ", error);
        process.exit(0);
    }
}

export default connectDB;