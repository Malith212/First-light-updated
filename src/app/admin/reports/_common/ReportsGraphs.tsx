'use client';
import React from "react";
import { Bar, Line, Pie, Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, ArcElement, Tooltip, Legend } from "chart.js";
import dayjs from "dayjs";

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, ArcElement, Tooltip, Legend);

function ReportsGraphs({ bookings = [] }: { bookings?: any[] }) {
  if (!bookings.length) {
    return <div className="text-gray-600 text-center py-10">No data available for the selected date range.</div>;
  }

  // Prepare data for Daily Bookings Bar Chart
  const dailyBookings = bookings.reduce((acc: any, booking: any) => {
    const date = dayjs(booking.createdAt).format("YYYY-MM-DD");
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {});
  const barData = {
    labels: Object.keys(dailyBookings),
    datasets: [
      {
        label: "Daily Bookings",
        data: Object.values(dailyBookings),
        backgroundColor: "#40679E",
        borderColor: "#40679E",
        borderWidth: 1,
      },
    ],
  };

  // Prepare data for Room vs Villa Pie Chart
  const typeBreakdown = bookings.reduce((acc: any, booking: any) => {
    const type = booking.room ? "Room" : "Villa";
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {});
  const pieData = {
    labels: Object.keys(typeBreakdown),
    datasets: [
      {
        data: Object.values(typeBreakdown),
        backgroundColor: ["#40679E", "#944E63"],
        borderColor: ["#40679E", "#944E63"],
        borderWidth: 1,
      },
    ],
  };

  // Prepare data for Revenue Trend Line Chart
  const dailyRevenue = bookings.reduce((acc: any, booking: any) => {
    const date = dayjs(booking.createdAt).format("YYYY-MM-DD");
    acc[date] = (acc[date] || 0) + (booking.totalAmount || 0);
    return acc;
  }, {});
  const lineData = {
    labels: Object.keys(dailyRevenue),
    datasets: [
      {
        label: "Revenue (LKR)",
        data: Object.values(dailyRevenue),
        fill: false,
        backgroundColor: "#2E8B57",
        borderColor: "#2E8B57",
        tension: 0.1,
      },
    ],
  };

  // Prepare data for Booking Status Doughnut Chart
  const statusBreakdown = bookings.reduce((acc: any, booking: any) => {
    acc[booking.bookingStatus] = (acc[booking.bookingStatus] || 0) + 1;
    return acc;
  }, {});
  const doughnutData = {
    labels: Object.keys(statusBreakdown),
    datasets: [
      {
        data: Object.values(statusBreakdown),
        backgroundColor: ["#40679E", "#944E63", "#2E8B57"],
        borderColor: ["#40679E", "#944E63", "#2E8B57"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-10">
      <div className="border py-7 px-10 flex flex-col gap-5" style={{ border: "1px solid #40679E" }}>
        <h1 className="text-xl font-bold text-gray-600">Daily Bookings</h1>
        <Bar
          data={barData}
          options={{
            responsive: true,
            plugins: { legend: { position: "top" }, tooltip: { enabled: true } },
            scales: { y: { beginAtZero: true, ticks: { stepSize: 1 } } },
          }}
        />
      </div>
      <div className="border py-7 px-10 flex flex-col gap-5" style={{ border: "1px solid #944E63" }}>
        <h1 className="text-xl font-bold text-gray-600">Room vs Villa Distribution</h1>
        <Pie
          data={pieData}
          options={{ responsive: true, plugins: { legend: { position: "top" }, tooltip: { enabled: true } } }}
        />
      </div>
      <div className="border py-7 px-10 flex flex-col gap-5 lg:col-span-2" style={{ border: "1px solid #2E8B57" }}>
        <h1 className="text-xl font-bold text-gray-600">Revenue Trend</h1>
        <Line
          data={lineData}
          options={{
            responsive: true,
            plugins: { legend: { position: "top" }, tooltip: { enabled: true } },
            scales: { y: { beginAtZero: true } },
          }}
        />
      </div>
      <div className="border py-7 px-10 flex flex-col gap-5" style={{ border: "1px solid #6A5ACD" }}>
        <h1 className="text-xl font-bold text-gray-600">Booking Status Distribution</h1>
        <Doughnut
          data={doughnutData}
          options={{ responsive: true, plugins: { legend: { position: "top" }, tooltip: { enabled: true } } }}
        />
      </div>
    </div>
  );
}

export default ReportsGraphs;