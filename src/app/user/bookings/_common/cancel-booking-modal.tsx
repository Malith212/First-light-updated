import React from "react";
import { BookingType } from "../../../../interfaces";
import { Modal } from "antd";
import dayjs from "dayjs";

function CancelBookingModal({
  booking,
  showCancelBookingModal,
  setShowCancelBookingModal,
}: {
  booking: BookingType;
  showCancelBookingModal: boolean;
  setShowCancelBookingModal: (show: boolean) => void;
}) {
  const onCancel = async () => {};

  return (
    <Modal
      title={
        <div className="text-red-700 text-lg font-bold">Cancel Booking</div>
      }
      open={showCancelBookingModal}
      onCancel={() => setShowCancelBookingModal(false)}
      centered
      okText="Yes, Cancel"
    >
      <div className="text-sm text-gray-500 mb-7">
        <div className="flex justify-between text-sm">
          <span>Check In</span>
          <span>{dayjs(booking.checkInDate).format("DD/MM/YYYY")}</span>
        </div>

        <div className="flex justify-between text-sm">
          <span>Check Out</span>
          <span>{dayjs(booking.checkOutDate).format("DD/MM/YYYY")}</span>
        </div>
      </div>

      <div className="span text-gray-500 text-sm ">
        Are you sure you want to cancel this booking? This action cannot be
        undone.
      </div>
    </Modal>
  );
}

export default CancelBookingModal;
