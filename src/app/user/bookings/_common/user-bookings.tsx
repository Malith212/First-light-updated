"use client";
import { BookingType } from "<pages>/interfaces";
import { Button, Table } from "antd";
import dayjs from "dayjs";
import { title } from "process";
import React, { use } from "react";
import { useState } from "react";
import CancelBookingModal from "./cancel-booking-modal";

function UserBookingsTable({ bookings }: { bookings: BookingType[] }) {
  const [showCancelBookingModal, setShowCancelBookingModal] = useState(false);
  const [selectedBooking, setSelectedBooking] =
    React.useState<BookingType | null>(null);

  const onCancel = async (booking: BookingType) => {
    setSelectedBooking(booking);
    setShowCancelBookingModal(true);
  };

  const columns = [
    {
      title: "Villa",
      dataIndex: "villa",
      key: "villa",
      render: (text: any, record: BookingType) => record.villa.name,
    },
    {
      title: "Room",
      dataIndex: "room",
      key: "room",
      render: (text: any, record: BookingType) => record.room.name,
    },
    {
      title: "Room Number",
      dataIndex: "roomNumber",
      key: "roomNumber",
      render: (text: any, record: BookingType) => record.room.roomNumber,
    },
    {
      title: "Check In Date",
      dataIndex: "checkInDate",
      key: "checkInDate",
      render: (text: any, record: BookingType) =>
        dayjs(record.checkInDate).format("DD-MM-YYYY"),
    },
    {
      title: "Check Out Date",
      dataIndex: "checkOutDate",
      key: "checkOutDate",
      render: (text: any, record: BookingType) =>
        dayjs(record.checkOutDate).format("DD-MM-YYYY"),
    },
    {
      title: "Booking Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text: String, record: BookingType) =>
        dayjs(record.createdAt).format("DD-MM-YYYY, h:mm A"),
    },
    {
      title: "Status",
      dataIndex: "bookingStatus",
      key: "status",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (text: String, record: BookingType) =>
        record.bookingStatus === "Booked" && (
          <span
            className="text-red-500 cursor-pointer text-sm"
            onClick={() => onCancel(record)}
          >
            Cancel
          </span>
        ),
    },
  ];

  return (
    <div>
      <Table columns={columns} dataSource={bookings} />

      {showCancelBookingModal && selectedBooking && (
        <CancelBookingModal
          showCancelBookingModal={showCancelBookingModal}
          setShowCancelBookingModal={setShowCancelBookingModal}
          booking={selectedBooking}
        />
      )}
    </div>
  );
}

export default UserBookingsTable;
