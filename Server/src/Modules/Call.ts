import mongoose from "mongoose"

const callSchema = new mongoose.Schema({
  members: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }],
  initiatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  callType: {
    type: String,
    enum: ["audio", "video"]
  },
  status: {
    type: String,
    enum: ["ringing", "ongoing", "ended", "missed"]
  },
  startedAt: Date,
  endedAt: Date
});


const CallModel = mongoose.model("Call", callSchema);

export default CallModel;