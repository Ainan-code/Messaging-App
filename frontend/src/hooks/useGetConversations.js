   

import  { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useAuthContext } from '../context/AuthContext';
   
   const useGetConversations = () => {
    
    const [loading, setloading] = useState(false);
    const [conversations, setConversations] = useState([]);

    const {authUser} = useAuthContext();

      useEffect(() => {
       const getConversation = async() => {
        
        setloading(true);
       

       try {
        const headers = { 'Authorization': `Bearer ${authUser.token}`};
        const res = await fetch("/api/users", {headers});
        const data = await res.json();
        
        if(data.error) {
            throw new Error
        }

         setConversations(data)
       } catch (error) {
        toast.error(error.message)
       } finally {
         setloading(false)
       }






       }

       getConversation();

    


      }, []) 
   
      return {loading, conversations};
   }
   
   export default useGetConversations;