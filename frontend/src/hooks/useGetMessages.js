   

   import  { useEffect, useState } from 'react'
import useConversation from '../store/useConversation'
import toast from 'react-hot-toast';
import { useAuthContext } from '../context/AuthContext';
   
   const useGetMessages = () => {
         const [loading, setLoading] = useState(false)
         const {selectedConversation, messages, setMessages} = useConversation();

                 const {authUser}   = useAuthContext();
         useEffect(() => {
            const getMessages = async() => {
                setLoading(true)
                try {
                const headers = {'Authorization': `Bearer ${authUser.token}`} 
                 const res = await fetch(`/api/messages/${selectedConversation._id}`, {headers})

                 const data = await res.json();

                 if(data.error) { throw new Error}

                 setMessages(data)


                } catch (error) {
                  toast.error(error.message)  
                } finally {
                    setLoading(false)
                }
            }
            if (selectedConversation?._id) getMessages()
         }, [selectedConversation?._id, setMessages])

         return{loading, messages}
   }
   
   export default useGetMessages