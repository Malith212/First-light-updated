"use client";
import React, { useEffect } from "react";
import { RoomType } from "<pages>/interfaces";
import { Button, Form, Input, message } from "antd";
import { useState } from "react";
import { CheckRoomAvailability } from "<pages>/server-actions/bookings";
import dayjs from "dayjs";
import { GetStripeClientSecretKey } from "<pages>/server-actions/payments";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentModal from "./payment-modal";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

function CheckOut({ room }: { room: RoomType }) {
  const [chckIn, setChckIn] = useState("");
  const [chckOut, setChckOut] = useState("");
  const [loading, setLoading] = useState(false);
  const [isAvailable, setIsAvailable] = useState(false);
  const [totalDays, setTotalDays] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [clientSecret, setClientSecret] = useState("");
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const checkAvailibility = async () => {
    try {
      const response = await CheckRoomAvailability({
        roomId: room._id,
        reqCheckInDate: chckIn,
        reqCheckOutDate: chckOut,
      });
      if (response.success) {
        setIsAvailable(true);
        message.success("Room is available");

        const totalDaysTemp = dayjs(chckOut).diff(dayjs(chckIn), "day");
        setTotalDays(totalDaysTemp);
        setTotalAmount(totalDaysTemp * room.rentPerDay);
      } else {
        setIsAvailable(false);
        message.error("Room is not available");
      }
    } catch (error: any) {
      message.error(error.message);
    }
  };

  const onBookRoom = async () => {
    try {
      setLoading(true);
      const response = await GetStripeClientSecretKey({
        amount: totalAmount,
      });
      if (response.success) {
        setClientSecret(response.data);
        setShowPaymentModal(true);
      } else {
        message.error(response.message);
      }
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setIsAvailable(false);
  }, [chckIn, chckOut]);

  return (
    <div className="p-5 border border-gray-600 border-solid rounded-lg bg-gray-800">
      <Form className="flex flex-col gap-5" layout="vertical">
        <Form.Item label={<span className="text-gray-300">Check In</span>}>
          <Input
            type="date"
            onChange={(e) => setChckIn(e.target.value)}
            value={chckIn}
            min={dayjs().format("YYYY-MM-DD")}
            className="placeholder-gray-400 bg-gray-700 border-gray-600 text-white"
          />
        </Form.Item>

        <Form.Item label={<span className="text-gray-300">Check Out</span>}>
          <Input
            type="date"
            onChange={(e) => setChckOut(e.target.value)}
            value={chckOut}
            min={dayjs(chckIn).add(1, "day").format("YYYY-MM-DD")}
            disabled={!chckIn}
            className="placeholder-gray-400 bg-gray-700 border-gray-600 text-white"
          />
        </Form.Item>

        <Button
          type="primary"
          className="w-full bg-gradient-to-r from-purple-600 to-blue-500 border-none hover:from-purple-700 hover:to-blue-600"
          disabled={!chckIn || !chckOut || isAvailable}
          loading={loading}
          onClick={checkAvailibility}
        >
          Check Availability
        </Button>

        {isAvailable && (
          <>
            <div className="flex justify-between text-gray-300">
              <span>Total Days</span>
              <span className="font-semibold">{totalDays}</span>
            </div>

            <div className="flex justify-between text-gray-300">
              <span>Total Amount</span>
              <span className="font-semibold">LKR {totalAmount}</span>
            </div>

            <Button
              type="primary"
              className="w-full bg-gradient-to-r from-purple-600 to-blue-500 border-none hover:from-purple-700 hover:to-blue-600"
              loading={loading}
              onClick={onBookRoom}
            >
              Book Your Room
            </Button>
          </>
        )}
      </Form>

      {showPaymentModal && clientSecret && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <PaymentModal
            room={room}
            totalDays={totalDays}
            totalAmount={totalAmount}
            checkInDate={chckIn}
            checkOutDate={chckOut}
            showPaymentModal={showPaymentModal}
            setShowPaymentModal={setShowPaymentModal}
          />
        </Elements>
      )}
    </div>
  );
}

export default CheckOut;