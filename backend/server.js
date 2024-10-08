 import express from "express";
 import dotenv from "dotenv";
 import cookieParser from "cookie-parser";


 import authRoutes from "./routes/auth.routes.js";
 import messageRoutes from "./routes/message.routes.js";
 import connectToMongodb from "./db/dbConnection.js";



const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json()); // allows to get the payload from request.body
app.use(cookieParser());

dotenv.config();

app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);
 






app.listen(PORT, () => 
    console.log(`server running on ${PORT}`));
    
connectToMongodb();
   
