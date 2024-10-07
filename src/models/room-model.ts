import mongoose from "mongoose";

const roomSchema = new mongoose.Schema(
  {
    villa: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "villas",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    rentPerDay: {
      type: Number,
      required: true,
    },
    amenities: {
      type: String,
      required: true,
    },
    beds: {
      type: Number,
      required: true,
    },
    roomNumber: {
      type: Number,
      required: true,
    },media: {
      type: [String],
      required: true,
    }
  },
  { timestamps: true }
);

if (mongoose.models && mongoose.models["rooms"]) {
  delete mongoose.models["rooms"];
}

const RoomModel = mongoose.model("rooms", roomSchema);
export default RoomModel;