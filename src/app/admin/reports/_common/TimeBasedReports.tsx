"use client";
import React from "react";
import { BookingType } from "<pages>/interfaces";
import dayjs from "dayjs";
import { Line, Bar } from 'react-chartjs-2';

function TimeBasedReports({ bookings }: { bookings: BookingType[] }) {
  const monthlyData: Record<string, { revenue: number; bookings: number }> = {};

  bookings.forEach((b) => {
    const month = dayjs(b.createdAt).format("MMM YYYY");
    if (!monthlyData[month]) monthlyData[month] = { revenue: 0, bookings: 0 };
    monthlyData[month].revenue += b.totalAmount;
    monthlyData[month].bookings += 1;
  });

  const months = Object.keys(monthlyData).sort((a, b) => 
    dayjs(a, "MMM YYYY").valueOf() - dayjs(b, "MMM YYYY").valueOf()
  );

  const revenueData = {
    labels: months,
    datasets: [
      {
        label: 'Monthly Revenue (LKR)',
        data: months.map(month => monthlyData[month].revenue),
        borderColor: 'rgba(16, 185, 129, 0.8)',
        backgroundColor: 'rgba(16, 185, 129, 0.2)',
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const bookingsData = {
    labels: months,
    datasets: [
      {
        label: 'Monthly Bookings',
        data: months.map(month => monthlyData[month].bookings),
        backgroundColor: 'rgba(59, 130, 246, 0.8)',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: '#d1d5db',
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(55, 65, 81, 0.3)',
        },
        ticks: {
          color: '#9ca3af',
          callback: function(value: any) {
            return typeof value === 'number' ? value.toLocaleString() : value;
          }
        },
      },
      x: {
        grid: {
          color: 'rgba(55, 65, 81, 0.3)',
        },
        ticks: {
          color: '#9ca3af',
        },
      },
    },
  };

  const lineOptions = {
    ...chartOptions,
    scales: {
      ...chartOptions.scales,
      y: {
        ...chartOptions.scales.y,
        ticks: {
          ...chartOptions.scales.y.ticks,
          callback: function(value: any) {
            return typeof value === 'number' ? 'LKR ' + value.toLocaleString() : value;
          }
        }
      }
    }
  };

  return (
    <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Monthly Revenue Trend */}
      <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 shadow-lg">
        <h2 className="text-lg font-bold mb-4 text-gray-300">Monthly Revenue Trend</h2>
        
        <div className="h-64 mb-4">
          <Line data={revenueData} options={lineOptions} />
        </div>
        
        <div className="space-y-2">
          {months.map((month) => (
            <div key={month} className="flex justify-between items-center py-2 border-b border-gray-700 last:border-b-0">
              <span className="text-gray-300 text-sm">{month}</span>
              <span className="text-green-400 font-semibold">LKR {monthlyData[month].revenue.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Monthly Bookings Trend */}
      <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 shadow-lg">
        <h2 className="text-lg font-bold mb-4 text-gray-300">Monthly Bookings Trend</h2>
        
        <div className="h-64 mb-4">
          <Bar data={bookingsData} options={chartOptions} />
        </div>
        
        <div className="space-y-2">
          {months.map((month) => (
            <div key={month} className="flex justify-between items-center py-2 border-b border-gray-700 last:border-b-0">
              <span className="text-gray-300 text-sm">{month}</span>
              <span className="text-blue-400 font-semibold">{monthlyData[month].bookings}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TimeBasedReports;