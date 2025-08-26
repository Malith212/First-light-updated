"use client";
import React from "react";
import { BookingType } from "<pages>/interfaces";

function OperationalReports({ bookings }: { bookings: BookingType[] }) {
  const cancelled = bookings.filter(b => b.bookingStatus === "Cancelled").length;
  const total = bookings.length;
  const cancellationRate = total ? ((cancelled / total) * 100).toFixed(1) : 0;

  return (
    <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 shadow-lg">
        <h2 className="text-lg font-bold mb-2 text-gray-300">Cancellation Rate</h2>
        <p className="text-red-400 font-semibold">{cancellationRate}%</p>
      </div>

      <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 shadow-lg">
        <h2 className="text-lg font-bold mb-2 text-gray-300">No-Show Report</h2>
        <p className="text-yellow-400 font-semibold">Not Implemented</p>
      </div>
    </div>
  );
}

export default OperationalReports;
