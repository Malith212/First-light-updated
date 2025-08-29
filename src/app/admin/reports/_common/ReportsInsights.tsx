"use client";
import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

function ReportsInsights({ bookings }: { bookings: any[] }) {
  // --- Room-Level Reports ---
  const bookingsByRoom: Record<string, any> = {};
  bookings.forEach((b) => {
    const key = b.room.name;
    if (!bookingsByRoom[key]) {
      bookingsByRoom[key] = { count: 0, revenue: 0, villa: b.villa.name };
    }
    bookingsByRoom[key].count += 1;
    bookingsByRoom[key].revenue += b.totalAmount;
  });

  const mostBookedRooms = Object.entries(bookingsByRoom)
    .sort((a, b) => b[1].count - a[1].count)
    .slice(0, 5);

  // --- Villa-Level Reports ---
  const bookingsByVilla: Record<string, any> = {};
  bookings.forEach((b) => {
    const key = b.villa.name;
    if (!bookingsByVilla[key]) {
      bookingsByVilla[key] = { count: 0, revenue: 0 };
    }
    bookingsByVilla[key].count += 1;
    bookingsByVilla[key].revenue += b.totalAmount;
  });

  const villasSortedByRevenue = Object.entries(bookingsByVilla).sort(
    (a, b) => b[1].revenue - a[1].revenue
  );

  // Chart data for Most Booked Rooms
  const roomChartData = {
    labels: mostBookedRooms.map(([room]) => room),
    datasets: [
      {
        label: 'Number of Bookings',
        data: mostBookedRooms.map(([_, data]) => data.count),
        backgroundColor: 'rgba(109, 40, 217, 0.8)',
        borderColor: 'rgba(109, 40, 217, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Chart data for Revenue by Villa
  const revenueChartData = {
    labels: villasSortedByRevenue.map(([villa]) => villa),
    datasets: [
      {
        label: 'Revenue (LKR)',
        data: villasSortedByRevenue.map(([_, data]) => data.revenue),
        backgroundColor: 'rgba(59, 130, 246, 0.8)',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Chart options with dark theme
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

  const doughnutOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          color: '#d1d5db',
          padding: 15,
        },
      },
    },
  };

  return (
    <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Room-Level Reports */}
      <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 shadow-lg">
        <h2 className="text-lg font-bold mb-4 text-gray-300">
          Room-Level Reports
        </h2>
        
        <h3 className="text-md font-semibold text-gray-400 mb-4">
          Most Booked Rooms
        </h3>
        
        <div className="h-64 mb-4">
          <Bar data={roomChartData} options={chartOptions} />
        </div>
        
        <div className="space-y-2">
          {mostBookedRooms.map(([room, data]: any) => (
            <div key={room} className="flex justify-between items-center py-2 border-b border-gray-700 last:border-b-0">
              <span className="text-gray-300 text-sm">{room}</span>
              <div className="text-right">
                <div className="text-purple-400 font-semibold">{data.count} bookings</div>
                <div className="text-blue-400 text-xs">LKR {data.revenue.toLocaleString()}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Villa-Level Reports */}
      <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 shadow-lg">
        <h2 className="text-lg font-bold mb-4 text-gray-300">
          Villa-Level Reports
        </h2>
        
        <h3 className="text-md font-semibold text-gray-400 mb-4">
          Revenue by Villa
        </h3>
        
        <div className="h-64 mb-4">
          <Bar data={revenueChartData} options={chartOptions} />
        </div>
        
        <div className="space-y-2">
          {villasSortedByRevenue.map(([villa, data]: any) => (
            <div key={villa} className="flex justify-between items-center py-2 border-b border-gray-700 last:border-b-0">
              <span className="text-gray-300 text-sm">{villa}</span>
              <div className="text-right">
                <div className="text-blue-400 font-semibold">LKR {data.revenue.toLocaleString()}</div>
                <div className="text-gray-400 text-xs">{data.count} bookings</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Additional Charts */}
      <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 shadow-lg lg:col-span-2">
        <h2 className="text-lg font-bold mb-4 text-gray-300">
          Booking Distribution
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-md font-semibold text-gray-400 mb-4 text-center">
              Room Booking Distribution
            </h3>
            <div className="h-64">
              <Doughnut 
                data={{
                  labels: mostBookedRooms.map(([room]) => room),
                  datasets: [
                    {
                      data: mostBookedRooms.map(([_, data]) => data.count),
                      backgroundColor: [
                        'rgba(109, 40, 217, 0.8)',
                        'rgba(59, 130, 246, 0.8)',
                        'rgba(16, 185, 129, 0.8)',
                        'rgba(245, 158, 11, 0.8)',
                        'rgba(239, 68, 68, 0.8)',
                      ],
                      borderWidth: 0,
                    },
                  ],
                }}
                options={doughnutOptions}
              />
            </div>
          </div>
          
          <div>
            <h3 className="text-md font-semibold text-gray-400 mb-4 text-center">
              Revenue Distribution
            </h3>
            <div className="h-64">
              <Doughnut 
                data={{
                  labels: villasSortedByRevenue.map(([villa]) => villa),
                  datasets: [
                    {
                      data: villasSortedByRevenue.map(([_, data]) => data.revenue),
                      backgroundColor: [
                        'rgba(59, 130, 246, 0.8)',
                        'rgba(109, 40, 217, 0.8)',
                        'rgba(16, 185, 129, 0.8)',
                        'rgba(245, 158, 11, 0.8)',
                        'rgba(239, 68, 68, 0.8)',
                      ],
                      borderWidth: 0,
                    },
                  ],
                }}
                options={doughnutOptions}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReportsInsights;