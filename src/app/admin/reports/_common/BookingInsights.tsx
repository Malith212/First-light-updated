"use client";
import React from "react";
import { BookingType } from "<pages>/interfaces";
import dayjs from "dayjs";

function BookingInsights({ bookings }: { bookings: BookingType[] }) {
  const bookedCount = bookings.filter(b => b.bookingStatus === "Booked").length;
  const cancelledCount = bookings.filter(b => b.bookingStatus === "Cancelled").length;

  const avgStay = bookings.reduce((acc, b) => {
    const nights = dayjs(b.checkOutDate).diff(dayjs(b.checkInDate), "day");
    return acc + nights;
  }, 0) / bookings.length || 0;

  const avgLeadTime = bookings.reduce((acc, b) => {
    const days = dayjs(b.checkInDate).diff(dayjs(b.createdAt), "day");
    return acc + days;
  }, 0) / bookings.length || 0;

  return (
    <div className="mt-10 grid grid-cols-1 lg:grid-cols-4 gap-6">
      <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 shadow-lg">
        <h2 className="text-lg font-bold text-gray-300 mb-2">Booked</h2>
        <p className="text-blue-400 font-semibold">{bookedCount}</p>
      </div>

      <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 shadow-lg">
        <h2 className="text-lg font-bold text-gray-300 mb-2">Cancelled</h2>
        <p className="text-red-400 font-semibold">{cancelledCount}</p>
      </div>

      <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 shadow-lg">
        <h2 className="text-lg font-bold text-gray-300 mb-2">Avg Stay Duration</h2>
        <p className="text-green-400 font-semibold">{avgStay.toFixed(1)} nights</p>
      </div>

      <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 shadow-lg">
        <h2 className="text-lg font-bold text-gray-300 mb-2">Avg Lead Time</h2>
        <p className="text-yellow-400 font-semibold">{avgLeadTime.toFixed(1)} days</p>
      </div>
    </div>
  );
}

export default BookingInsights;
