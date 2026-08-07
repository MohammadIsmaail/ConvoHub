import createResponse from "../Helper/CreateResponse";
import FriendRequestModel from "../Modules/FriendRequest";
import UserModel from "../Modules/UserModel";

export const FriendRequestController = async (req:any,res:any)=>{
    try{
        const senderId = req.user.id;
        //const receiverId = req.params.receiverId;  Assuming the receiver's ID is passed as a URL parameter
        const { receiverId } = req.body;
        const sender = await UserModel.findById(senderId);
        const receiver = await UserModel.findById(receiverId);
        if (!sender || !receiver) {
            return createResponse(res, false, 404, "Sender or receiver not found", [], true);
        }else{
            if(senderId===receiverId){
                return createResponse(res, false, 400, "You cannot send a friend request to yourself", [], true);
            }
            const existingRequest = await FriendRequestModel.findOne({ sender: senderId, receiver: receiverId });
            if(existingRequest){
                return createResponse(res, false, 400, "Friend request already sent", [], true);
            }
            const friendRequest = new FriendRequestModel({ sender: senderId, receiver: receiverId });
            await friendRequest.save();
            return createResponse(res, true, 200, "Friend request sent successfully", friendRequest, false);
        }

    }catch(error:any){
        return createResponse(res,false,500,error.message,[],true);
    }
}
export const GetPendingRequestsController = async (req:any,res:any)=>{
    try{

        // 1. Login user id nikalo
        const { id } = req.user;

        const pendingRequest = await FriendRequestModel.find({ receiver:id, status:"pending"}).populate("sender","name email profileImage");
        if(pendingRequest.length === 0){
            return createResponse(res, true, 200, "No pending friend requests", [], false);
        }
        else{
            return createResponse(res, true, 200, "Pending friend requests fetched successfully", pendingRequest, false);
        }

    }catch(error:any){
        return createResponse(res, false, 500, error.message, [], true);
    }
}
export const AcceptFriendRequestController = async (req:any,res:any)=>{
    try{
        const { id } = req.user;
        const { requestId } = req.body;

        const request = await FriendRequestModel.findById(requestId);

        //  Request exist karti hai?
        if(!request){
            return createResponse(res, false, 404, "Friend request not found", [], true);
        }

        // 5. Check karo login user hi receiver hai
        // request.receiver === id ?
        if(request.receiver.toString() !== id){
            return createResponse(res, false, 403, "You are not authorized to accept this friend request", [], true);
        }
        else{
            if(request.status   !== "pending"){
                return createResponse(res, false, 400, "Friend request already Proecssed", [], true);
            }
                request.status = "accepted";
                await request.save();
                return createResponse(res, true, 200, "Friend request accepted successfully", request, false);
        }

    }catch(error:any){
        return createResponse(res, false, 500, error.message, [], true);
    }
}
export const RejectFriendRequestController = async (req:any,res:any)=>{
    try{
        const { id } = req.user;
        const { requestId } = req.body;

        const request = await FriendRequestModel.findById(requestId);

        // 4. Request exists?
        if(!request){
            return createResponse(res, false, 404, "Friend request not found", [], true);
        }
        else{
            if(request.receiver.toString() !== id){
                return createResponse(res, false, 403, "You are not authorized to reject this friend request", [], true);
            }
            if(request.status !== "pending"){
                return createResponse(res, false, 400, "Friend request already processed", [], true);
            }
            request.status = "rejected";
            await request.save();
            return createResponse(res, true, 200, "Friend request rejected successfully", request, false);
        }   

    }catch(error:any){
        return createResponse(res, false, 500, error.message, [], true);
    }
}

export const FriendsListController = async (req:any,res:any)=>{
    try{

        // 1. Login user id
        const { id } = req.user;

        // 2. Accepted requests find karo
        // sender = id OR receiver = id
        // status = accepted

        // 3. Populate sender
        // 4. Populate receiver

        // 5. Friends array banao

        // 6. Login user ko remove karke
        // doosre user ko friend banao

        // 7. Response return

    }catch(error:any){

        // Error response

    }
}