import createResponse from "../Helper/CreateResponse";
import ConversationModel from "../Modules/Conversation";
import FriendRequestModel from "../Modules/FriendRequest";
import MessageModel from "../Modules/Message";
import UserModel from "../Modules/UserModel";

export const SendMessageController = async (req:any,res:any)=>{
    try{

        const senderId = req.user.id;
        const { conversationId, content } = req.body;

        const data = await ConversationModel.findById(conversationId);
        if(!data){
            return createResponse(res, false, 404, "Conversation not found", [], true);
        }
         const isMember = data.members.some((member:any)=>{
            return member.toString() === senderId;
        });
        if(!isMember){
            return createResponse(res, false, 403, "You are not a member of this conversation", [], true);
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
        const id = req.user.id;
        const { conversationId } = req.params;
        // 2. Check conversation exist karti hai?
        const conversation = await ConversationModel.findById(conversationId);
        if (!conversation) {
            return createResponse(res, false, 404, "Conversation not found", [], true);
        }
         const isMember = conversation.members.some(
            (member: any) => member.toString() === id);
        if (!isMember) {
            return createResponse(res,false,403,"You are not authorized to view this conversation",[],true);
         }
        const messages = await MessageModel.find({ conversation: conversationId }).populate("sender", "name email").sort({ createdAt: 1 });
        if (messages.length === 0) {
            return createResponse(res, true, 200, "No messages found", [], false);
        } else {
            return createResponse(res, true, 200, "Messages fetched successfully", messages, false);
        }
    }catch(error:any){
        return createResponse(res, false, 500, error.message, [], true);
    }
}
export const GetMyConversationsController = async (req:any,res:any)=>{
    try{

        const { id } = req.user;

        // members array me login user ko search 
        const conversations = await ConversationModel.find({ members: id }).populate("members", "name email profileImage").sort({ updatedAt: -1 });
        if(conversations.length === 0){
            return createResponse(res, true, 200, "No conversations found", [], false);
        }
            const formattedConversations = conversations.map((conversation: any) => {
            const friend = conversation.members.find(
                (member: any) => member._id.toString() !== id
            );
            return {
                conversationId: conversation._id,
                friend,
                createdAt: conversation.createdAt,
                updatedAt: conversation.updatedAt
            };
        });
        return createResponse(res,true,200,"Conversations fetched successfully",formattedConversations,false);

    }catch(error:any){
       return createResponse(res, false, 500, error.message, [], true);
    }
}
export const CreateConversationController = async (req:any,res:any)=>{
    try{
        const senderId = req.user.id;
        const { receiverId } = req.body;

        const receiver = await UserModel.findById(receiverId);
        if(!receiver){
            return createResponse(res, false, 404, "Receiver not found", [], true);
        }
        if(senderId === receiverId){
            return createResponse(res, false, 400, "You cannot create a conversation with yourself", [], true);
        }
        const friendship = await FriendRequestModel.findOne({status: "accepted",$or: [
        { sender: senderId, receiver: receiverId }, { sender: receiverId, receiver: senderId }]});
                // 5. Check karo dono friends hain?
        // FriendRequest status = accepted
        if(!friendship){
            return createResponse(res, false, 403, "You are not friends with this user", [], true);
        }
        // 6. Check karo conversation pehle se exist hai?
        // members me senderId aur receiverId dono hone chahiye
        const isExistConversation = await ConversationModel.findOne({ members: 
             { $all: [senderId, receiverId] },$expr: {$eq: [{ $size: "$members" }, 2],}, });
        if(isExistConversation){
            return createResponse(res, true, 200, "Conversation already exists", isExistConversation, false);
        }else{
            const conversation = new ConversationModel({ members: [senderId, receiverId] });
            await conversation.save();
            return createResponse(res, true, 200, "Conversation created successfully", conversation, false);
        }
    }catch(error:any){
        return createResponse(res, false, 500, error.message, [], true);
    }
}
// Message Seen
export const MarkMessagesSeenController = async (req:any,res:any)=>{
    try{
        const { conversationId } = req.body;
        const userId = req.user.id;

        // 1. Conversation exist?
        const conversation = await ConversationModel.findById(conversationId);
        if (!conversation) {
            return createResponse(res, false, 404, "Conversation not found", [], true);
        }

        // 2. User member hai?
        const isMember = conversation.members.some(
            (member: any) => member.toString() === userId
        );
        if (!isMember) {
            return createResponse(res, false, 403, "You are not a member of this conversation", [], true);
        }
        // 3. Messages find karo
        // isSeen = false
        const messages = await MessageModel.find({ conversation: conversationId, isSeen: false, sender: { $ne: userId } });
        if(messages.length === 0){
            return createResponse(res, true, 200, "No unseen messages found", [], false);
        }else{
            await MessageModel.updateMany({ conversation: conversationId, isSeen: false, sender: { $ne: userId } }, { $set: { isSeen: true } });
            return createResponse(res, true, 200, "Messages marked as seen successfully", [], false);
        }
        // 4. Update many
        // isSeen = true

        // 5. Success response

    }catch(error:any){
        return createResponse(res,false,500,error.message,[],true);
    }
}
//  Latest Conversation Find
export const GetLatestConversationsController = async (req:any,res:any)=>{
    try{
        const { id } = req.user;
        const conversations = await ConversationModel.find({ members: id }).populate("members", "name email profileImage").sort({ updatedAt: -1 });
        if(conversations.length === 0){
            return createResponse(res, true, 200, "No conversations found", [], false);
        }
        const Friends = await Promise.all(conversations.map(async (conversation: any) => {
            const friend = conversation.members.find(
                (member: any) => member._id.toString() !== id
            );
            const latestMessage = await MessageModel.findOne({ conversation: conversation._id }).sort({ createdAt: -1 });
            return {conversationId: conversation._id,friend,latestMessage};
            }));
            return createResponse(res,true,200,"Latest conversations fetched successfully",Friends,false);
    }catch(error:any){
        return createResponse(res,false,500,error.message,[],true);
    }
}
// Unread Message Count
export const GetUnreadMessageCountController = async (req:any,res:any)=>{
    try{
        const { id } = req.user;
        // const unreadCount = await MessageModel.countDocuments({ conversation: { $in: await ConversationModel.find({ members: id }).distinct("_id") }, isSeen: false, sender: { $ne: id } });
        const conversationIds = await ConversationModel.find({members: id}).distinct("_id");
        const unreadCount = await MessageModel.countDocuments({conversation: {$in: conversationIds},isSeen: false,sender: {$ne: id}});
        return createResponse(res,true,200,"Unread message count fetched successfully",{unreadCount},false);
    }catch(error:any){
        return createResponse(res,false,500,error.message,[],true);
    }
}

export const GetConversationUnreadCountController = async (req:any,res:any)=>{
    try{
        const { id } = req.user;
        const conversations = await ConversationModel.find({
            members: id
        })
        .populate("members", "name email profileImage")
        .sort({ updatedAt: -1 });

        if(conversations.length === 0){
            return createResponse(res,true,200, "No conversations found", [],false);}
        const data = await Promise.all(
            conversations.map(async (conversation:any)=>{

                const friend = conversation.members.find(
                    (member:any)=> member._id.toString() !== id
                );

                const unreadCount = await MessageModel.countDocuments({
                    conversation: conversation._id,
                    isSeen: false,
                    sender: { $ne: id }
                });

                return {
                    conversationId: conversation._id,
                    friend,
                    unreadCount
                };
            })
        );
        return createResponse(res,true,200,
            "Conversations with unread count fetched successfully",data,false);
    }catch(error:any){
        return createResponse(res,false,500,error.message,[],true);
    }
}
