"use client";
import React from "react";
import { RoomType } from "<pages>/interfaces";
import { Button, Form, Input } from "antd";
import { useState } from "react";

function CheckOut({ room }: { room: RoomType }) {
  const [chckIn, setChckIn] = useState("");
  const [chckOut, setChckOut] = useState("");

  return (
    <div className="p-5 border border-gray-300 border-solid">
      <Form className="flex flex-col gap-5 text-gray-500" layout="vertical">
        <Form.Item label="Check In">
          <Input type="date" />
        </Form.Item>

        <Form.Item label="Check Out">
          <Input type="date" />
        </Form.Item>

        <Button type="primary" className="w-full">
          Check Availibility
        </Button>
      </Form>
    </div>
  );
}

export default CheckOut;
