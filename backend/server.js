 import express from "express";
 import dotenv from "dotenv";
 import authRoutes from "./routes/auth.routes.js";
 import connectToMongodb from "./db/dbConnection.js";



const app = express();

dotenv.config();
const PORT = process.env.PORT || 8000


app.get('/', (req, res)  =>  {
    res.send("Hello AInan")
});


app.use('/api/auth', authRoutes)

app.listen(PORT, () => 
    console.log(`server running on ${PORT}`));
    
connectToMongodb();
   
