import React from "react";
import { GetCurrentUserFromMongoDB } from "<pages>/server-actions/users";
import BookingModel from "<pages>/models/booking-model";
import mongoose from "mongoose";
import PageTitle from "<pages>/components/page-title";
import UserBookingsTable from "./_common/user-bookings";


async function BookingsPage() {
  const userResponse = await GetCurrentUserFromMongoDB();
  const userBookingResponse = await BookingModel.find({user: userResponse.data._id})
  .populate({ path: "room", model: mongoose.model("rooms") })
  .populate({ path: "villa", model: mongoose.model("villas") })
  .sort({ createdAt: -1 });  
  ;
  const userBookings = JSON.parse(JSON.stringify(userBookingResponse));``
  return <div>
    <PageTitle title="My Bookings" />
    <UserBookingsTable bookings={userBookings} />
  </div>;
}

export default BookingsPage;
