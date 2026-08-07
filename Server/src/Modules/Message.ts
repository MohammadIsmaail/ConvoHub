import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    conversation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Conversation",
        required: true
    },
    content: {
        type: String,
        required: true
    },
    isSeen:{
        type:Boolean,
        default:false
    }
}, {
    timestamps: true
});

const MessageModel = mongoose.model("Message", messageSchema);
export default MessageModel;