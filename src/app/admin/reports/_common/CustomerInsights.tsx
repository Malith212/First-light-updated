"use client";
import React from "react";
import { BookingType } from "<pages>/interfaces";

function CustomerInsights({ bookings }: { bookings: BookingType[] }) {
  const customerData: Record<string, { count: number; revenue: number }> = {};

  bookings.forEach((b) => {
    const key = b.user.name;
    if (!customerData[key]) customerData[key] = { count: 0, revenue: 0 };
    customerData[key].count += 1;
    customerData[key].revenue += b.totalAmount;
  });

  const frequentCustomers = Object.entries(customerData)
    .sort((a, b) => b[1].count - a[1].count)
    .slice(0, 5);

  const highValueCustomers = Object.entries(customerData)
    .sort((a, b) => b[1].revenue - a[1].revenue)
    .slice(0, 5);

  return (
    <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 shadow-lg">
        <h2 className="text-lg font-bold mb-4 text-gray-300">Frequent Customers</h2>
        <div className="space-y-2">
          {frequentCustomers.map(([name, data]) => (
            <div key={name} className="flex justify-between border-b border-gray-700 py-2">
              <span className="text-gray-300">{name}</span>
              <span className="text-blue-400 font-semibold">{data.count} bookings</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 shadow-lg">
        <h2 className="text-lg font-bold mb-4 text-gray-300">High Value Customers (CLV)</h2>
        <div className="space-y-2">
          {highValueCustomers.map(([name, data]) => (
            <div key={name} className="flex justify-between border-b border-gray-700 py-2">
              <span className="text-gray-300">{name}</span>
              <span className="text-green-400 font-semibold">LKR {data.revenue.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CustomerInsights;
