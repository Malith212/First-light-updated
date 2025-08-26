"use client";
import React from "react";
import { BookingType } from "<pages>/interfaces";
import dayjs from "dayjs";

function TimeBasedReports({ bookings }: { bookings: BookingType[] }) {
  const monthlyData: Record<string, { revenue: number; bookings: number }> = {};

  bookings.forEach(b => {
    const month = dayjs(b.createdAt).format("YYYY-MM");
    if (!monthlyData[month]) monthlyData[month] = { revenue: 0, bookings: 0 };
    monthlyData[month].revenue += b.totalAmount;
    monthlyData[month].bookings += 1;
  });

  const months = Object.keys(monthlyData).sort();

  return (
    <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 shadow-lg">
        <h2 className="text-lg font-bold mb-4 text-gray-300">Monthly Revenue</h2>
        {months.map(month => (
          <div key={month} className="flex justify-between py-2 border-b border-gray-700">
            <span className="text-gray-300">{month}</span>
            <span className="text-green-400 font-semibold">LKR {monthlyData[month].revenue.toLocaleString()}</span>
          </div>
        ))}
      </div>

      <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 shadow-lg">
        <h2 className="text-lg font-bold mb-4 text-gray-300">Monthly Bookings</h2>
        {months.map(month => (
          <div key={month} className="flex justify-between py-2 border-b border-gray-700">
            <span className="text-gray-300">{month}</span>
            <span className="text-blue-400 font-semibold">{monthlyData[month].bookings}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TimeBasedReports;
