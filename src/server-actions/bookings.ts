"use server";
import { connectMongoDB } from "<pages>/config/db";
import BookingModel from "<pages>/models/booking-model";
import { message } from "antd";
import { GetCurrentUserFromMongoDB } from "./users";
import { revalidatePath } from "next/cache";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

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
      bookingStatus: "Booked",
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
        {
          $and: [
            { checkInDate: { $lte: reqCheckInDate } },
            { checkOutDate: { $gte: reqCheckOutDate } },
          ],
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
    revalidatePath("/user/bookings");
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

export const CancelBooking = async ({
  bookingId,
  paymentId,
}: {
  bookingId: string;
  paymentId: string;
}) => {
  try {
    //change the status of the booking to cancelled

    await BookingModel.findByIdAndUpdate(bookingId, {
      bookingStatus: "Cancelled",
    });

    //refund the payment

    const refunded = await stripe.refunds.create({
      payment_intent: paymentId,
    });

    if (refunded.status !== "succeeded") {
      return {
        success: false,
        message:
          "Your booking has been cancelled but the refund failed. Please try again later",
      };
    }

    revalidatePath("/user/bookings");

    return {
      success: true,
      message:
        "Your booking has been cancelled successfully and the refund has been processed",
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};
