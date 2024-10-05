"use server";
import { connectMongoDB } from "<pages>/config/db";
import RoomModel from "<pages>/models/room-model";
import { revalidatePath } from "next/cache";

connectMongoDB();

//add Rooms server actions
export const AddRoom = async (payload: any) => {
  try {
    const newRoom = new RoomModel(payload);

    const res = await newRoom.save();

    revalidatePath("/admin/rooms");
    return {
      success: true,
      message: "Room added successfully",
    };
  } catch (error: any) {
    return {
      sucess: false,
      error: error.message,
    };
  }
};

//edit Rooms server actions
export const EditRoom = async ({
  roomId,
  payload,
}: {
  roomId: string;
  payload: any;
}) => {
  try {
    await RoomModel.findByIdAndUpdate(roomId, payload);
    revalidatePath("/admin/rooms");
    return {
      success: true,
      message: "room updated successfully",
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message,
    };
  }
};

//delete rooms server actions
export const DeleteRoom = async (roomId: string) => {
  try {
    await RoomModel.findByIdAndDelete(roomId);
    revalidatePath("/admin/rooms");
    return {
      success: true,
      message: "Room deleted successfully",
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message,
    };
  }
};
