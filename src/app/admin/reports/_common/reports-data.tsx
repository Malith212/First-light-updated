import BookingModel from "<pages>/models/booking-model";
import React from "react";
import AdminBookingsTable from "../../_common/admin-bookings-table";
import dayjs from "dayjs";
import ReportsInsights from "./ReportsInsights";
import CustomerInsights from "./CustomerInsights";
import BookingInsights from "./BookingInsights";
import TimeBasedReports from "./TimeBasedReports";

async function ReportsData({ searchParams }: { searchParams: any }) {
  // ✅ Fetch all bookings (Booked + Cancelled)
  const response = await BookingModel.find({
    createdAt: {
      $gte: dayjs(searchParams.startDate).startOf("day").toDate(),
      $lte: dayjs(searchParams.endDate).endOf("day").toDate(),
    },
  })
    .populate("room")
    .populate("user")
    .populate("villa")
    .sort({ createdAt: -1 });

  const bookings = JSON.parse(JSON.stringify(response));

  // ✅ Separate booked bookings only
  const bookedBookings = bookings.filter((b: any) => b.bookingStatus === "Booked");

  // ✅ Revenue only from booked bookings
  const totalRevenue = bookedBookings.reduce((acc: number, b: any) => acc + b.totalAmount, 0);

  // ✅ Average revenue per booking (only booked)
  const averageRevenue =
    bookedBookings.length > 0 ? totalRevenue / bookedBookings.length : 0;

  return (
    <div>
      {/* --- Summary Cards --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        {/* Total Revenue */}
        <div
          className="border py-5 px-6 flex flex-col border-solid gap-3 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg shadow-lg"
          style={{ border: "1px solid #3b82f6" }}
        >
          <h1 className="text-lg font-bold text-gray-300 text-center">
            Total Revenue
          </h1>
          <h1
            className="text-3xl font-bold text-center"
            style={{ color: "#3b82f6" }}
          >
            LKR {totalRevenue.toLocaleString()}
          </h1>
        </div>

        {/* Average Revenue */}
        <div
          className="border py-5 px-6 flex flex-col border-solid gap-3 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg shadow-lg"
          style={{ border: "1px solid #f59e0b" }}
        >
          <h1 className="text-lg font-bold text-gray-300 text-center">
            Avg Revenue
          </h1>
          <h1
            className="text-3xl font-bold text-center"
            style={{ color: "#f59e0b" }}
          >
            LKR {averageRevenue.toLocaleString()}
          </h1>
          <p className="text-yellow-400 text-sm text-center">per booking</p>
        </div>
      </div>

      {/* --- Reports --- */}
      <ReportsInsights bookings={bookedBookings} /> {/* ✅ Only booked data */}
      <AdminBookingsTable bookings={bookings} hideReceipt={true} />
      <CustomerInsights bookings={bookedBookings} /> {/* ✅ Only booked data */}
      <BookingInsights bookings={bookings} /> {/* ✅ Uses both booked & cancelled */}
      <TimeBasedReports bookings={bookedBookings} /> {/* ✅ Only booked data */}
    </div>
  );
}

export default ReportsData;
