import { useState, useContext } from "react";
import AuthContext from "./AuthContext";





  const AuthProvider = ({children}) => {
    const [authUser, setAuthUser] = useState(localStorage.getItem("user") || "");



    return <AuthContext.Provider value={{authUser, setAuthUser}}>{children}
    </AuthContext.Provider>
  }



  export const auth = () => {
    useContext(AuthContext)
  }

  export default AuthProvider;