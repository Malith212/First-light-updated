"use client";
import { BookingType } from "<pages>/interfaces";
import { Button, Table, Space } from "antd";
import dayjs from "dayjs";
import React, { useState } from "react";
import CancelBookingModal from "./cancel-booking-modal";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

function UserBookingsTable({ bookings }: { bookings: BookingType[] }) {
  const [showCancelBookingModal, setShowCancelBookingModal] = useState(false);
  const [selectedBooking, setSelectedBooking] =
    useState<BookingType | null>(null);

  // ---------- Cancel Booking ----------
  const onCancel = (booking: BookingType) => {
    setSelectedBooking(booking);
    setShowCancelBookingModal(true);
  };

  // ---------- PDF / CSV Functions ----------
  const createPDF = (booking: BookingType) => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.setTextColor(0, 0, 0);
    doc.text("Payment Receipt", 14, 15);

    doc.setFontSize(12);
    doc.text(`Customer: ${booking.user.name}`, 14, 30);
    doc.text(`Villa: ${booking.villa.name}`, 14, 40);
    doc.text(`Room: ${booking.room.name} (${booking.room.roomNumber})`, 14, 50);
    doc.text(`Check-in: ${dayjs(booking.checkInDate).format("DD-MM-YYYY")}`, 14, 60);
    doc.text(`Check-out: ${dayjs(booking.checkOutDate).format("DD-MM-YYYY")}`, 14, 70);
    doc.text(`Booking Date: ${dayjs(booking.createdAt).format("DD-MM-YYYY, h:mm A")}`, 14, 80);

    autoTable(doc, {
      startY: 90,
      head: [["Description", "Amount (LKR)", "Payment Status"]],
      body: [
        [
          `Room Payment`,
          booking.totalAmount.toLocaleString(),
          booking.bookingStatus === "Cancelled" ? "Refunded" : "Paid",
        ],
      ],
    });

    if (booking.bookingStatus === "Cancelled") {
      doc.setTextColor(200, 0, 0);
      doc.text(
        "This booking has been cancelled. Amount has been refunded.",
        14,
        doc.lastAutoTable.finalY + 20
      );
    } else {
      doc.setTextColor(0, 128, 0);
      doc.text("Thank you for your payment!", 14, doc.lastAutoTable.finalY + 20);
    }

    return doc;
  };

  const viewPDF = (booking: BookingType) => {
    const doc = createPDF(booking);
    window.open(doc.output("bloburl"), "_blank");
  };

  const downloadPDF = (booking: BookingType) => {
    const doc = createPDF(booking);
    doc.save(`Payment_Receipt_${booking.user.name}_${dayjs(booking.createdAt).format("DDMMYYYY")}.pdf`);
  };

  const downloadCSV = (booking: BookingType) => {
    const csvContent = [
      ["Field", "Value"],
      ["Customer", booking.user.name],
      ["Villa", booking.villa.name],
      ["Room", booking.room.name],
      ["Room Number", booking.room.roomNumber],
      ["Check-in Date", dayjs(booking.checkInDate).format("DD-MM-YYYY")],
      ["Check-out Date", dayjs(booking.checkOutDate).format("DD-MM-YYYY")],
      ["Booking Date", dayjs(booking.createdAt).format("DD-MM-YYYY, h:mm A")],
      ["Total Amount", booking.totalAmount],
      ["Payment Status", booking.bookingStatus === "Cancelled" ? "Refunded" : "Paid"],
    ]
      .map((e) => e.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `Booking_${booking.user.name}_${dayjs(booking.createdAt).format("DDMMYYYY")}.csv`;
    link.click();
  };

  // ---------- Table Columns ----------
  const columns: any = [
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
    // ---------- Receipt Column ----------
    {
      title: "Receipt",
      key: "receipt",
      render: (_: any, record: BookingType) => (
        <Space>
          <Button type="default" onClick={() => viewPDF(record)}>View</Button>
          <Button type="primary" onClick={() => downloadPDF(record)}>Download PDF</Button>
          <Button onClick={() => downloadCSV(record)}>Download CSV</Button>
        </Space>
      ),
    },
    // ---------- Cancel Action ----------
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_: any, record: BookingType) => {
        const today = dayjs();
        const checkIn = dayjs(record.checkInDate);
        const diffDays = checkIn.diff(today, "day");

        if (record.bookingStatus !== "Booked") return null;

        if (diffDays < 3) {
          return <span className="text-gray-400 text-sm">Expired</span>;
        }

        return (
          <span
            className="text-red-500 cursor-pointer text-sm"
            onClick={() => onCancel(record)}
          >
            Cancel
          </span>
        );
      },
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
