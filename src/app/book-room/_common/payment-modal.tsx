import React from "react";
import { RoomType } from "<pages>/interfaces";
import { message, Modal, Button } from "antd";
import { useState } from "react";
import { BookRoom } from "<pages>/server-actions/bookings";
import { useRouter } from "next/navigation";

import {
  useStripe,
  useElements,
  PaymentElement,
  AddressElement,
} from "@stripe/react-stripe-js";
import { set } from "mongoose";

function PaymentModal({
  room,
  totalDays,
  totalAmount,
  checkInDate,
  checkOutDate,
  showPaymentModal,
  setShowPaymentModal,
}: {
  room: RoomType;
  totalDays: number;
  totalAmount: number;
  checkInDate: string;
  checkOutDate: string;
  showPaymentModal: boolean;
  setShowPaymentModal: (value: boolean) => void;
}) {
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      setLoading(true);

      // We don't want to let default form submission happen here,
      // which would refresh the page.
      event.preventDefault();

      if (!stripe || !elements) {
        // Stripe.js hasn't yet loaded.
        // Make sure to disable form submission until Stripe.js has loaded.
        return;
      }

      const result = await stripe.confirmPayment({
        //`Elements` instance that was used to create the Payment Element
        elements,
        confirmParams: {
          return_url: "https://example.com/order/123/complete",
        },
        redirect: "if_required",
      });

      if (result.error) {
        message.error(result.error.message);
      } else {
        message.success("Payment Successful");
        const bookingPayload = {
          villa: room.villa._id,
          room: room._id,
          checkInDate,
          checkOutDate,
          totalAmount,
          totalDays,
          paymentId: result.paymentIntent.id,
        };

        await BookRoom(bookingPayload);
        message.success("Room Booked Successful");
        setShowPaymentModal(false);
        router.push("/user/bookings");
      }
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      open={showPaymentModal}
      title="Complete Payment"
      onCancel={() => setShowPaymentModal(false)}
      footer={null}
    >
      <div className="flex flex-col">
        <form onSubmit={handleSubmit}>
          <PaymentElement />
          <AddressElement
            options={{
              mode: "billing",
            }}
          />

          <div className="flex justify-end gap-5 mt-7">
            <Button
              disabled={loading}
              onClick={() => setShowPaymentModal(false)}
            >
              Cancel
            </Button>
            <Button type="primary" htmlType="submit" loading={loading}>
              Pay LKR{totalAmount}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}

export default PaymentModal;
