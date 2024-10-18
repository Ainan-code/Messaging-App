import { useState, useContext } from "react"
import { toast } from "react-hot-toast";
import { useAuthContext } from '../context/AuthContext';




export const UseSignup = () => {
  const [loading, setLoading] = useState(false)

  const { setAuthUser } = useAuthContext();
 
  const signup = async ({fullName, username, password, confirmPassword, gender}) => {
    const success = handleInputErrors({fullName, username, password, confirmPassword, gender});
    if(!success) return;

    
       
    setLoading(true)
    try {

    const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {  "Content-Type": "application/json"   },
        body: JSON.stringify({fullName, username, password, confirmPassword, gender})
    })

    const data = await res.json();
   if (data.error) {
    throw new Error(data.error)
   }

   localStorage.setItem("user", JSON.stringify(data));
    setAuthUser(data);




        
    } catch (error) {
        toast.error(error.message)
    } finally {
        setLoading(false)
    }


  }

  return{loading, signup}
}


export default UseSignup;

function handleInputErrors ({fullName, username, password, confirmPassword, gender}) {
    if (!fullName || !username || !password, !confirmPassword || !gender) {
        toast.error("please fill in all the fields")
        return false
    }

    if (password !== confirmPassword) {
        toast.error("Passwords do not match")
        return false
    }

    if (password.lentgh < 6) {
        toast.error("Passwords must be at least 6 characters")
        return false
    }

   return true
}