import createResponse from "../Helper/CreateResponse";
import ConversationModel from "../Modules/Conversation";
import MessageModel from "../Modules/Message";

export const SendMessageController = async (req:any,res:any)=>{
    try{

        const senderId = req.user.id;
        const { conversationId, content } = req.body;

        const data = await ConversationModel.findById(conversationId);
        if(!data){
            return createResponse(res, false, 404, "Conversation not found", [], true);
        }
        const msg = new MessageModel({sender: senderId,conversation:conversationId,content: content,});
        await msg.save();
        return createResponse(res, true, 200, "Message sent successfully", msg, false);
        
    }catch(error:any){
        return createResponse(res, false, 500, error.message, [], true);
    }
}

export const GetMessagesController = async (req:any,res:any)=>{
    try{
        // 1. conversationId lo
        const { conversationId } = req.params;
        // 2. Check conversation exist karti hai?
        const conversation = await ConversationModel.findById(conversationId);
        if (!conversation) {
            return createResponse(res, false, 404, "Conversation not found", [], true);
        }
        const messages = await MessageModel.find({ conversation: conversationId }).populate("sender", "name email");
        if (messages.length === 0) {
            return createResponse(res, true, 200, "No messages found", [], false);
        } else {
            return createResponse(res, true, 200, "Messages fetched successfully", messages, false);
        }
    }catch(error:any){
        return createResponse(res, false, 500, error.message, [], true);
    }
}