"use client";
import React, { useEffect } from "react";
import { RoomType } from "<pages>/interfaces";
import { Button, Form, Input, message } from "antd";
import { useState } from "react";
import { Check } from "lucide-react";
import { CheckRoomAvailability } from "<pages>/server-actions/bookings";
import { set } from "mongoose";
import dayjs from "dayjs";

function CheckOut({ room }: { room: RoomType }) {
  const [chckIn, setChckIn] = useState("");
  const [chckOut, setChckOut] = useState("");
  const [loading, setLoading] = useState(false);
  const [isAvailable, setIsAvailable] = useState(false);

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
      } else {
        setIsAvailable(false);
        message.error("Room is not available");
      }
    } catch (error: any) {
      message.error(error.message);
    }
  };

  const onBookRoom = async () => {};

  useEffect(() => {
    setIsAvailable(false);
  }, [chckIn, chckOut]);

  return (
    <div className="p-5 border border-gray-300 border-solid">
      <Form className="flex flex-col gap-5 text-gray-500" layout="vertical">
        <Form.Item label="Check In">
          <Input
            type="date"
            onChange={(e) => setChckIn(e.target.value)}
            value={chckIn}
            min={dayjs().format("YYYY-MM-DD")}
          />
        </Form.Item>

        <Form.Item label="Check Out">
          <Input
            type="date"
            onChange={(e) => setChckOut(e.target.value)}
            value={chckOut}
            min={dayjs(chckIn).add(1, "day").format("YYYY-MM-DD")}
            disabled={!chckIn}
          />
        </Form.Item>

        <Button
          type="primary"
          className="w-full"
          disabled={!chckIn || !chckOut|| isAvailable}
          loading={loading}
          onClick={checkAvailibility}
        >
          Check Availability
        </Button>

        {isAvailable && (
          <Button
            type="primary"
            className="w-full"
            loading={loading}
            onClick={onBookRoom}
          >
            Book Your Room
          </Button>
        )}
      </Form>
    </div>
  );
}

export default CheckOut;
