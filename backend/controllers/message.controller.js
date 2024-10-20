import Conversation from "../models/conversation.model.js"
import Message from "../models/message.model.js"
import { getReceiverSocketId, io } from "../socket/socketio.js";

export const sendMessage = async(req, res) => {

 try {

    const {message} = req.body
    const {id: receiverId} = req.params;
    const senderId = req.user.id;
   
   
    let conversation = await Conversation.findOne({
       participants: { $all: [senderId, receiverId] }
    })
    if (!conversation) {
       conversation =   await Conversation.create({
           participants: [ senderId, receiverId]
       })
   
    }
   
    const newMessage =  new Message({
       senderId, 
       receiverId,
       message
    })
   
     if(newMessage) {
       conversation.messages.push(newMessage._id)
   
      
     }

     await conversation.save(); 
     await newMessage.save();

     const receiverSocketId = getReceiverSocketId(receiverId);
     if (receiverSocketId) {
      io.to(receiverSocketId).emit("newmessage", newMessage )

     }

     res.status(201).json(newMessage)
    
 } catch (error) {
   console.log("error in sendMessage controller", error.message) 
   res.status(500).json({error:"internal server error"})
 }   

}


export const getMessages = async(req, res) => {
 try {
   const {id: userToChatId} = req.params;
   const senderId = req.user.id;

   const conversation = await Conversation.findOne({
      participants: {$all: [senderId, userToChatId]}
   }).populate("messages");


   if(!conversation) return res.status(200).json([]);

    
		const messages = conversation.messages;
   return res.status(200).json(messages)
   
 } catch (error) {
console.log("error in getMessages controller", error.message) 
res.status(500).json({error:"internal server error"})
 }

}



