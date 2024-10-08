  import jwt from "jsonwebtoken"
import User from "../models/user.model.js";

  const protectRoute = async(req, res, next)  => {
    try {

        const token = req.cookies.jwt;

        if(!token) {
            res.status(401).json({error: "Not Authorized no token provided" })
        }

       const decoded = jwt.verify(token, process.env.JWT_SECRET) 

       if (!decoded) {
        res.status(401).json({error: "Invalid token" })
       }

       const user = await User.findById(decoded.userId).select("-password")

       if (!user) {
        res.status(401).json({error: "User not found" });

        req.user = user;

        next();
       }


        
    } catch (error) {
        console.log("error in protect route", error.message)
        res.status(500).json({error: "internal server error"})
    }
  }


  export default protectRoute;