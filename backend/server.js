 import express from "express";
 import path from "path";
 import dotenv from "dotenv";
 import cookieParser from "cookie-parser";
 import bodyParser from "body-parser";


 import authRoutes from "./routes/auth.routes.js";
 import messageRoutes from "./routes/message.routes.js";
 import userRoutes from "./routes/user.routes.js";
 import { app, server } from "./socket/socketio.js";

 import connectToMongodb from "./db/dbConnection.js";

 dotenv.config();


const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

app.use(express.json({ extended: false })); // allows to get the payload from request.body
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));



app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"))
})

 






server.listen(PORT, () => 
    console.log(`server running on ${PORT}`));
    
connectToMongodb();
   
