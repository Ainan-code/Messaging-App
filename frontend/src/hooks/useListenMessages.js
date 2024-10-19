import React, { useEffect } from 'react'
import { useSocketContext } from '../context/SocketContext'
import useConversation from '../store/useConversation';
   
   const useListenMessages = () => {
    const { socket} = useSocketContext();
    const{messages, setMessages} = useConversation();

   useEffect(()=> {
    socket?.on("newmessage", (newMessage) => {
        newMessage.shouldShake = true;
        setMessages([...messages, newMessage])
    })

    return () => socket?.off("NewMessage")
   },[socket,setMessages, messages ])


   }
   
   export default useListenMessages;