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

