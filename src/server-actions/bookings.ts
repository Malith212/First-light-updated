"use server";
import { connectMongoDB } from "<pages>/config/db";
import BookingModel from "<pages>/models/booking-model";
import { message } from "antd";
import { GetCurrentUserFromMongoDB } from "./users";

connectMongoDB();

export const CheckRoomAvailability = async ({
  roomId,
  reqCheckInDate,
  reqCheckOutDate,
}: {
  roomId: string;
  reqCheckInDate: string;
  reqCheckOutDate: string;
}) => {
  try {
    const bookedSlot = await BookingModel.findOne({
      room: roomId,
      $or: [
        {
          checkInDate: {
            $gte: reqCheckInDate,
            $lte: reqCheckOutDate,
          },
        },
        {
          checkOutDate: {
            $gte: reqCheckInDate,
            $lte: reqCheckOutDate,
          },
        },
      ],
    });

    if (bookedSlot) {
      return {
        success: false,
      };
    }

    return {
      success: true,
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message,
    };
  }
};

export const BookRoom = async (payload: any) => {
  try {
    const userResponse = await GetCurrentUserFromMongoDB();
    payload.user = userResponse.data._id;
    const booking = new BookingModel(payload);
    await booking.save();
    return {
      success: true,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};
