"use client";
import { BookingType } from "<pages>/interfaces";
import { Table, Button, Space } from "antd";
import dayjs from "dayjs";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import React from "react";

interface AdminBookingsTableProps {
  bookings: BookingType[];
  hideReceipt?: boolean; // ✅ New prop to hide the receipt column
}

function AdminBookingsTable({ bookings, hideReceipt = false }: AdminBookingsTableProps) {
  // 📌 Create PDF Template (Reusable)
  const createPDF = (booking: BookingType) => {
    const doc = new jsPDF();

    // Title
    doc.setFontSize(18);
    doc.setTextColor(0, 0, 0);
    doc.text("Payment Receipt", 14, 15);

    // Customer & Booking Info
    doc.setFontSize(12);
    doc.text(`Customer: ${booking.user.name}`, 14, 30);
    doc.text(`Villa: ${booking.villa.name}`, 14, 40);
    doc.text(`Room: ${booking.room.name} (${booking.room.roomNumber})`, 14, 50);
    doc.text(`Check-in: ${dayjs(booking.checkInDate).format("DD-MM-YYYY")}`, 14, 60);
    doc.text(`Check-out: ${dayjs(booking.checkOutDate).format("DD-MM-YYYY")}`, 14, 70);
    doc.text(`Booking Date: ${dayjs(booking.createdAt).format("DD-MM-YYYY, h:mm A")}`, 14, 80);

    // **Payment Table**
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

    // Footer Message
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

  // 📌 View PDF in New Tab
  const viewPDF = (booking: BookingType) => {
    const doc = createPDF(booking);
    window.open(doc.output("bloburl"), "_blank");
  };

  // 📌 Download PDF
  const downloadPDF = (booking: BookingType) => {
    const doc = createPDF(booking);
    doc.save(`Payment_Receipt_${booking.user.name}_${dayjs(booking.createdAt).format("DDMMYYYY")}.pdf`);
  };

  // 📌 Download CSV
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

  // 📌 Table Columns
  const columns: any = [
    {
      title: "Customer",
      dataIndex: "user",
      key: "user",
      render: (_: any, record: BookingType) => record.user.name,
    },
    {
      title: "Villa",
      dataIndex: "villa",
      key: "villa",
      render: (_: any, record: BookingType) => record.villa.name,
    },
    {
      title: "Room",
      dataIndex: "room",
      key: "room",
      render: (_: any, record: BookingType) => record.room.name,
    },
    {
      title: "Room Number",
      dataIndex: "roomNumber",
      key: "roomNumber",
      render: (_: any, record: BookingType) => record.room.roomNumber,
    },
    {
      title: "Check In Date",
      dataIndex: "checkInDate",
      key: "checkInDate",
      render: (_: any, record: BookingType) => dayjs(record.checkInDate).format("DD-MM-YYYY"),
    },
    {
      title: "Check Out Date",
      dataIndex: "checkOutDate",
      key: "checkOutDate",
      render: (_: any, record: BookingType) => dayjs(record.checkOutDate).format("DD-MM-YYYY"),
    },
    {
      title: "Booking Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (_: String, record: BookingType) => dayjs(record.createdAt).format("DD-MM-YYYY, h:mm A"),
    },
    {
      title: "Total Amount",
      dataIndex: "totalAmount",
      key: "totalAmount",
    },
    {
      title: "Status",
      dataIndex: "bookingStatus",
      key: "status",
    },
  ];

  // ✅ Add Receipt column if not hidden
  if (!hideReceipt) {
    columns.push({
      title: "Receipt",
      key: "receipt",
      render: (_: any, record: BookingType) => (
        <Space>
          <Button type="default" onClick={() => viewPDF(record)}>View</Button>
          <Button type="primary" onClick={() => downloadPDF(record)}>Download PDF</Button>
          <Button onClick={() => downloadCSV(record)}>Download CSV</Button>
        </Space>
      ),
    });
  }

  return (
    <div>
      <Table columns={columns} dataSource={bookings} />
    </div>
  );
}

export default AdminBookingsTable;
