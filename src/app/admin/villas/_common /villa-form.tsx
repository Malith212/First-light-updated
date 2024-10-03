"use client";
import { Form, Input } from "antd";
import React from "react";

function VillaForm() {
  return (
    <Form layout="vertical" className="grid grid-cols-3 mt-5 gap-5">
      <Form.Item
        className="col-span-3"
        label="Villa Name"
        name="name"
        rules={[{ required: true, message: "Villa Name is required" }]}
      >
        <Input placeholder="Villa Name" />
      </Form.Item>

      <Form.Item
        className="col-span-3 lg:col-span-1"
        label="Owner Name"
        name="owner"
        rules={[{ required: true, message: "Owner Name is required" }]}
      >
        <Input placeholder="Owner Name" />
      </Form.Item>

      <Form.Item
        className="col-span-3 lg:col-span-1"
        label="Email"
        name="email"
        rules={[{ required: true, message: "Email is required" }]}
      >
        <Input placeholder="Email" />
      </Form.Item>

      <Form.Item
        className="col-span-3 lg:col-span-1"
        label="Phone"
        name="phone"
        rules={[{ required: true, message: "Phone No is required" }]}
      >
        <Input placeholder="Phone" />
      </Form.Item>

      <Form.Item
        className="col-span-3"
        label="Address"
        name="address"
        rules={[{ required: true, message: "Address is required" }]}
      >
        <Input.TextArea placeholder="Address" />
      </Form.Item>
    </Form>
  );
}

export default VillaForm;
