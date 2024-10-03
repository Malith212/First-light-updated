import { Phone } from "lucide-react";
import mongoose from "mongoose";

const villaSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    owner: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    media: {
      type: Array,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

if (mongoose.models && mongoose.models["villas"]) {
  delete mongoose.models["villas"];
}

const VillaModel = mongoose.model("villas", villaSchema);
export default VillaModel;
