"use client";
import React from "react";
import { BookingType } from "<pages>/interfaces";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
} from 'chart.js';
import { Bar, Doughnut, Line } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement
);

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

  // Chart data
  const frequentCustomersData = {
    labels: frequentCustomers.map(([name]) => name),
    datasets: [
      {
        label: 'Number of Bookings',
        data: frequentCustomers.map(([_, data]) => data.count),
        backgroundColor: 'rgba(59, 130, 246, 0.8)',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 1,
      },
    ],
  };

  const highValueCustomersData = {
    labels: highValueCustomers.map(([name]) => name),
    datasets: [
      {
        label: 'Revenue (LKR)',
        data: highValueCustomers.map(([_, data]) => data.revenue),
        backgroundColor: 'rgba(16, 185, 129, 0.8)',
        borderColor: 'rgba(16, 185, 129, 1)',
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

  return (
    <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Frequent Customers */}
      <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 shadow-lg">
        <h2 className="text-lg font-bold mb-4 text-gray-300">Frequent Customers</h2>
        
        <div className="h-64 mb-4">
          <Bar data={frequentCustomersData} options={chartOptions} />
        </div>
        
        <div className="space-y-2">
          {frequentCustomers.map(([name, data]) => (
            <div key={name} className="flex justify-between items-center py-2 border-b border-gray-700 last:border-b-0">
              <span className="text-gray-300 text-sm">{name}</span>
              <span className="text-blue-400 font-semibold">{data.count} bookings</span>
            </div>
          ))}
        </div>
      </div>

      {/* High-Value Customers */}
      <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 shadow-lg">
        <h2 className="text-lg font-bold mb-4 text-gray-300">High Value Customers (CLV)</h2>
        
        <div className="h-64 mb-4">
          <Bar data={highValueCustomersData} options={chartOptions} />
        </div>
        
        <div className="space-y-2">
          {highValueCustomers.map(([name, data]) => (
            <div key={name} className="flex justify-between items-center py-2 border-b border-gray-700 last:border-b-0">
              <span className="text-gray-300 text-sm">{name}</span>
              <span className="text-green-400 font-semibold">LKR {data.revenue.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CustomerInsights;