import mongoose from "mongoose"

const notificationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  sender:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
  },
  type:{
    type: String,
    enum: ["friend_request", "message", "call"],
    required: true
  },
  refrenceId : {
    type: mongoose.Schema.Types.ObjectId,
    refPath: "type"
  },
  message: {
    type: String,
    required: true
  },
  read: {
    type: Boolean,
    default: false
  }
});

const NotificationModel = mongoose.model("Notification", notificationSchema);

export default NotificationModel;