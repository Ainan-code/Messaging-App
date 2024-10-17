   import React, { useState } from 'react'
import useConversation from '../store/useConversation'
import toast from 'react-hot-toast';
import { useAuthContext } from '../context/AuthContext';
   
   const useSendMessage = () => {
    const {messages, setMessages, selectedConversation} = useConversation();
    const [loading, setLoading] = useState(false);
    const {authUser} = useAuthContext();
               

    const sendMessage = async(message) => {
       
          setLoading(true) 

          try {

            const res = await fetch(`/api/messages/send/${selectedConversation._id}`,{

                method: "POST",
                headers: { 'Content-Type': "application/json",
                            'Authorization': `Bearer ${authUser.token}`
                },
           
                body: JSON.stringify({message})
               
        })

           const data = await res.json();

           if(data.error) {
            throw new Error
           }

           setMessages([...messages, data])
            
          } catch (error) {
            toast.error(error.message)
          } finally {
            setLoading(false)
          }


    }

    return{loading, sendMessage}

   }
   
   export default useSendMessage