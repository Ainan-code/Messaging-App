import mongoose, { mongo } from "mongoose";


const connectToMongodb  = async () => {
    try {
        await mongoose.connect(process.env.MongoDB_URI);
        console.log("connected to MongoDB");
        
    } catch (error) {
        console.log("error connecting to MongoDB", error.message);
    }
}



export default connectToMongodb;