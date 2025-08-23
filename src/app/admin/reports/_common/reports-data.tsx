import BookingModel from "<pages>/models/booking-model";
import React from "react";
import AdminBookingsTable from "../../_common/admin-bookings-table";
import dayjs from "dayjs";
import ReportsGraphs from "./ReportsGraphs";

async function ReportsData({ searchParams }: { searchParams: any }) {
  let bookings = [];
  try {
    const response = await BookingModel.find({
      bookingStatus: "Booked",
      createdAt: {
        $gte: dayjs(searchParams.startDate).startOf("day").toDate(),
        $lte: dayjs(searchParams.endDate).endOf("day").toDate(),
      },
    }).populate("room").populate("user").populate("villa").sort({ createdAt: -1 });
    bookings = JSON.parse(JSON.stringify(response)) || [];
  } catch (error) {
    console.error("Error fetching bookings data:", error);
  }

  const totalBookings = bookings.length;
  const totalRevenue = bookings.reduce(
    (acc: number, booking: any) => acc + (booking.totalAmount || 0),
    0
  );
  const averageBookingAmount = totalBookings ? (totalRevenue / totalBookings).toFixed(2) : 0;
  const statusBreakdown = bookings.reduce((acc: any, booking: any) => {
    acc[booking.bookingStatus] = (acc[booking.bookingStatus] || 0) + 1;
    return acc;
  }, {});

  return (
    <div>
      <div className="md:flex-row flex-col flex gap-10 mb-10">
        <div
          className="border py-7 px-10 flex flex-col border-solid gap-5"
          style={{
            border: "1px solid #40679E",
          }}
        >
          <h1 className="text-xl font-bold text-gray-600">Total Bookings</h1>
          <h1
            className="text-5xl font-bold text-center"
            style={{ color: "#40679E" }}
          >
            {totalBookings}
          </h1>
        </div>

        <div
          className="border py-7 px-10 flex flex-col border-solid gap-5"
          style={{
            border: "1px solid #944E63",
          }}
        >
          <h1 className="text-xl font-bold text-gray-600">Total Revenue</h1>
          <h1
            className="text-5xl font-bold text-center"
            style={{ color: "#944E63" }}
          >
            LKR {totalRevenue}
          </h1>
        </div>

        <div
          className="border py-7 px-10 flex flex-col border-solid gap-5"
          style={{
            border: "1px solid #2E8B57",
          }}
        >
          <h1 className="text-xl font-bold text-gray-600">Average Booking Amount</h1>
          <h1
            className="text-5xl font-bold text-center"
            style={{ color: "#2E8B57" }}
          >
            LKR {averageBookingAmount}
          </h1>
        </div>
      </div>

      <AdminBookingsTable bookings={bookings} />
      <ReportsGraphs bookings={bookings} />
    </div>
  );
}

export default ReportsData;