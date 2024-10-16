import User from "../models/user.model.js";
import bcrypt from "bcryptjs"
import generateAccessToken from "../utils/generateToken.js";
export const signup = async (req, res) =>  {
  
    try {
        const {fullName, username, password,confirmPassword, gender} = req.body 
         if (password !== confirmPassword) {
            res.status(400).json({error: "paswords do not match"})
         }

         const user = await User.findOne({username});

         if (user) {
            res.status(400).json({error: "Username already exists"});
         }

         // hash the password
         const salt = await bcrypt.genSalt(10);
         const hashedPassword = await bcrypt.hash(password, salt);



        const boyProfilePic = `https://avatar-placeholder.iran.liara.run/public/boy`
        const girlProfilePic = `https://avatar-placeholder.iran.liara.run/public/girl`

      const newUser = new User({
        fullName, 
        username,
        password: hashedPassword,
        gender,
        profilePic: gender === "male" ? boyProfilePic : girlProfilePic 
      })
    
      if(newUser) {
      const token =   generateAccessToken(newUser._id)
        await newUser.save();
        
        res.status(201).json({
            _id: newUser._id,
            fullName: newUser.fullName,
            username: newUser.username,
            profilePic:  newUser.profilePic,
            token: token
        })

      } else {
        res.status(400).json ({error: "Invalid user data"})
      }
      }
    catch (error) {
     console.log("error in sign up controller", error.message)
     res.status(500).json({error: "Internal server error"})   
    }

    


};


export const login = async(req, res) =>  {
  try {

    const {username, password} = req.body;

    const user  = await User.findOne({username});
    const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");
    

    if (!user || !isPasswordCorrect) {

     return res.status(400).json({error: "Invalid username or password"})
    }

   const token =  generateAccessToken(user._id);

  return  res.status(200).json({
        _id: user._id,
        fullName: user.fullName,
        username: user.username,
        profilePic:  user.profilePic,
        token: token
    })

    
  } catch (error) {
    console.log("error in login controller", error.message)
    res.status(500).json({error: "Internal server error"}) 
    
  }  
};


export const logout = (req, res) =>  {
 try {
   
    res.status(200).json({message: "logout successfully"})
 } catch (error) {
    console.log("error in logout controller", error.message)
    res.status(500).json({error: "Internal server error"})  
 }
};





