import PageTitle from "<pages>/components/page-title";
import React from "react";
import AdminBookingsTable from "../_common/admin-bookings-table";
import BookingModel from "<pages>/models/booking-model";
import mongoose from "mongoose";

async function AdminBookingsPage() {
  const bookingResponse = await BookingModel.find()
    .populate({ path: "villa", model: mongoose.model("villas") })
    .populate({ path: "room", model: mongoose.model("rooms") })
    .populate({ path: "user", model: mongoose.model("users") })
    .sort({ createdAt: -1 });
    const bookings = JSON.parse(JSON.stringify(bookingResponse));
  return (
    <div>
      <PageTitle title="Bookings" />
      <AdminBookingsTable bookings={bookings} />
    </div>
  );
}

export default AdminBookingsPage;
