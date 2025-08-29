"use client";
import React from "react";
import { BookingType } from "<pages>/interfaces";
import dayjs from "dayjs";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  DoughnutController,
} from 'chart.js';
import { Doughnut, Bar } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  DoughnutController
);

function BookingInsights({ bookings }: { bookings: BookingType[] }) {
  const bookedCount = bookings.filter(b => b.bookingStatus === "Booked").length;
  const cancelledCount = bookings.filter(b => b.bookingStatus === "Cancelled").length;
  const totalBookings = bookings.length;

  const avgStay = bookings.reduce((acc, b) => {
    const nights = dayjs(b.checkOutDate).diff(dayjs(b.checkInDate), "day");
    return acc + nights;
  }, 0) / bookings.length || 0;

  const avgLeadTime = bookings.reduce((acc, b) => {
    const days = dayjs(b.checkInDate).diff(dayjs(b.createdAt), "day");
    return acc + days;
  }, 0) / bookings.length || 0;

  // Booking Status Chart Data
  const bookingStatusData = {
    labels: ['Booked', 'Cancelled'],
    datasets: [
      {
        data: [bookedCount, cancelledCount],
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)',
          'rgba(239, 68, 68, 0.8)',
        ],
        borderColor: [
          'rgba(59, 130, 246, 1)',
          'rgba(239, 68, 68, 1)',
        ],
        borderWidth: 2,
      },
    ],
  };

  // Stay Duration Distribution
  const stayDurations = bookings.map(b => 
    dayjs(b.checkOutDate).diff(dayjs(b.checkInDate), "day")
  );
  
  const stayDurationRanges = {
    '1-2 nights': stayDurations.filter(d => d >= 1 && d <= 2).length,
    '3-5 nights': stayDurations.filter(d => d >= 3 && d <= 5).length,
    '6+ nights': stayDurations.filter(d => d >= 6).length,
  };

  const stayDurationData = {
    labels: Object.keys(stayDurationRanges),
    datasets: [
      {
        label: 'Number of Bookings',
        data: Object.values(stayDurationRanges),
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
          font: {
            size: 12,
          },
        },
      },
    },
  };

  const barChartOptions = {
    ...chartOptions,
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
    <div className="mt-10 space-y-6">
      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 shadow-lg flex flex-col items-center">
          <div className="w-16 h-16 bg-blue-900/30 rounded-full flex items-center justify-center mb-3">
            <span className="text-blue-400 text-2xl font-bold">{bookedCount}</span>
          </div>
          <h2 className="text-lg font-bold text-gray-300 mb-2 text-center">Booked</h2>
          <p className="text-blue-400 font-semibold text-sm text-center">
            {totalBookings > 0 ? ((bookedCount / totalBookings) * 100).toFixed(1) : 0}% Success Rate
          </p>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 shadow-lg flex flex-col items-center">
          <div className="w-16 h-16 bg-red-900/30 rounded-full flex items-center justify-center mb-3">
            <span className="text-red-400 text-2xl font-bold">{cancelledCount}</span>
          </div>
          <h2 className="text-lg font-bold text-gray-300 mb-2 text-center">Cancelled</h2>
          <p className="text-red-400 font-semibold text-sm text-center">
            {totalBookings > 0 ? ((cancelledCount / totalBookings) * 100).toFixed(1) : 0}% Cancel Rate
          </p>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 shadow-lg flex flex-col items-center">
          <div className="w-16 h-16 bg-green-900/30 rounded-full flex items-center justify-center mb-3">
            <span className="text-green-400 text-2xl font-bold">{avgStay.toFixed(1)}</span>
          </div>
          <h2 className="text-lg font-bold text-gray-300 mb-2 text-center">Avg Stay</h2>
          <p className="text-green-400 font-semibold text-sm text-center">Nights</p>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 shadow-lg flex flex-col items-center">
          <div className="w-16 h-16 bg-yellow-900/30 rounded-full flex items-center justify-center mb-3">
            <span className="text-yellow-400 text-2xl font-bold">{avgLeadTime.toFixed(1)}</span>
          </div>
          <h2 className="text-lg font-bold text-gray-300 mb-2 text-center">Avg Lead Time</h2>
          <p className="text-yellow-400 font-semibold text-sm text-center">Days</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Booking Status Chart */}
        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 shadow-lg">
          <h2 className="text-lg font-bold text-gray-300 mb-4 text-center">Booking Status Distribution</h2>
          <div className="h-64">
            <Doughnut data={bookingStatusData} options={chartOptions} />
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="text-center">
              <div className="text-blue-400 font-bold text-xl">{bookedCount}</div>
              <div className="text-gray-400 text-sm">Confirmed Bookings</div>
            </div>
            <div className="text-center">
              <div className="text-red-400 font-bold text-xl">{cancelledCount}</div>
              <div className="text-gray-400 text-sm">Cancellations</div>
            </div>
          </div>
        </div>

        {/* Stay Duration Chart */}
        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 shadow-lg">
          <h2 className="text-lg font-bold text-gray-300 mb-4 text-center">Stay Duration Analysis</h2>
          <div className="h-64">
            <Bar data={stayDurationData} options={barChartOptions} />
          </div>
          <div className="grid grid-cols-3 gap-4 mt-4 text-center">
            <div>
              <div className="text-green-400 font-bold">{stayDurationRanges['1-2 nights']}</div>
              <div className="text-gray-400 text-xs">1-2 Nights</div>
            </div>
            <div>
              <div className="text-green-400 font-bold">{stayDurationRanges['3-5 nights']}</div>
              <div className="text-gray-400 text-xs">3-5 Nights</div>
            </div>
            <div>
              <div className="text-green-400 font-bold">{stayDurationRanges['6+ nights']}</div>
              <div className="text-gray-400 text-xs">6+ Nights</div>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Insights */}
      <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 shadow-lg">
        <h2 className="text-lg font-bold text-gray-300 mb-4">Performance Summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-400">{totalBookings}</div>
            <div className="text-gray-400 text-sm">Total Bookings</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-400">
              {totalBookings > 0 ? ((bookedCount / totalBookings) * 100).toFixed(1) : 0}%
            </div>
            <div className="text-gray-400 text-sm">Booking Success Rate</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-red-400">
              {totalBookings > 0 ? ((cancelledCount / totalBookings) * 100).toFixed(1) : 0}%
            </div>
            <div className="text-gray-400 text-sm">Cancellation Rate</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookingInsights;