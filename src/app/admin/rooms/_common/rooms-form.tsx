"use client";
import { UploadImageToFirebaseAndReturnUrls } from "<pages>/helpers/image-upload";
import { Button, Form, Input, message, Select, Upload } from "antd";
import React, { useState } from "react";
import { AddRoom, EditRoom } from "<pages>/server-actions/rooms";
import { useRouter } from "next/navigation";
import { VillaType } from "<pages>/interfaces";

function RoomsForm({
  type = "add",
  initialData,
  villas,
}: {
  type: string;
  initialData?: any;
  villas: VillaType[];
}) {
  const [uploadedFiles, setUploadedFiles] = useState([]) as any[];
  const [existingMedia = [], setExistingMedia] = useState(
    initialData?.media || []
  );
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onFinish = async (values: any) => {
    try {
      setLoading(true);
      const newUrls = await UploadImageToFirebaseAndReturnUrls(uploadedFiles);
      values.media = [...existingMedia, ...newUrls];

      let response: any = null;
      if (type === "add") {
        response = await AddRoom(values);
      } else {
        response = await EditRoom({
          roomId: initialData._id,
          payload: values,
        });
      }

      if (response.success) {
        message.success(response.message);
        router.push("/admin/rooms");
      }

      if (!response.success) {
        message.error(response.error);
      }
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form
      layout="vertical"
      className="grid grid-cols-3 mt-5 gap-5"
      onFinish={onFinish}
      initialValues={initialData}
    >
      {/* Villa */}
      <Form.Item
        label={<span className="text-gray-300">Villa</span>}
        name="villa"
        rules={[{ required: true, message: "Please select a Villa" }]}
      >
        <Select placeholder="Select a Villa" className="placeholder-gray-100">
          {villas.map((villa) => (
            <Select.Option key={villa._id} value={villa._id}>
              {villa.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      {/* Room View */}
      <Form.Item
        label={<span className="text-gray-300">Room View</span>}
        name="name"
        rules={[{ required: true, message: "Room View is Required" }]}
      >
        <Select placeholder="Select Room View" className="placeholder-gray-400">
          <Select.Option value="ocean-vista">Ocean Vista</Select.Option>
          <Select.Option value="mountain-panorama">Mountain Panorama</Select.Option>
          <Select.Option value="pool-view">Pool View</Select.Option>
          <Select.Option value="garden-view">Garden View</Select.Option>
          <Select.Option value="city-view">City View</Select.Option>
        </Select>
      </Form.Item>

      {/* Room Number (Number Validation) */}
      <Form.Item
        label={<span className="text-gray-300">Room Number</span>}
        name="roomNumber"
        rules={[
          { required: true, message: "Room Number is Required" },
          { pattern: /^[0-9]+$/, message: "Room Number must be a number" },
        ]}
      >
        <Input
          placeholder="Enter Room Number"
          className="placeholder-gray-400"
          maxLength={5}
        />
      </Form.Item>

      {/* Type */}
      <Form.Item
        label={<span className="text-gray-300">Type</span>}
        name="type"
        rules={[{ required: true, message: "Type is Required" }]}
      >
        <Select placeholder="Select Type" className="placeholder-gray-400">
          <Select.Option key="delux" value="delux">
            Delux
          </Select.Option>
          <Select.Option key="premium" value="premium">
            Premium
          </Select.Option>
          <Select.Option key="standard" value="standard">
            Standard
          </Select.Option>
        </Select>
      </Form.Item>

      {/* Beds (Number Validation) */}
      <Form.Item
        label={<span className="text-gray-300">Beds</span>}
        name="beds"
        rules={[
          { required: true, message: "Beds Number is Required" },
          { pattern: /^[0-9]+$/, message: "Beds must be a number" },
        ]}
      >
        <Input
          placeholder="Enter Number of Beds"
          className="placeholder-gray-400"
          maxLength={2}
        />
      </Form.Item>

      {/* Rent Per Day (Number Validation) */}
      <Form.Item
        label={<span className="text-gray-300">Rent Per Day</span>}
        name="rentPerDay"
        rules={[
          { required: true, message: "Rent Per Day is Required" },
          { pattern: /^[0-9]+$/, message: "Rent Per Day must be a number" },
        ]}
      >
        <Input
          placeholder="Enter Rent Per Day"
          className="placeholder-gray-400"
        />
      </Form.Item>

      {/* Amenities */}
      <Form.Item
        label={<span className="text-gray-300">Amenities</span>}
        name="amenities"
        rules={[{ required: true, message: "Amenities is Required" }]}
        className="col-span-3"
      >
        <Input.TextArea
          placeholder="List the amenities for this room"
          className="placeholder-gray-400"
        />
      </Form.Item>

      {/* Media Upload */}
      <div className="col-span-3 flex gap-5">
        <div className="flex gap-5">
          {existingMedia.map((media: any, index: number) => (
            <div
              className="flex flex-col border border-solid rounded p-3 border-gray-600 gap-5 items-center bg-gray-750"
              key={index}
            >
              <img src={media} alt="media" className="h-16 w-16 object-cover" />
              <span
                className="text-red-400 underline text-sm cursor-pointer hover:text-red-300"
                onClick={() => {
                  setExistingMedia(
                    existingMedia.filter(
                      (item: String, i: number) => i !== index
                    )
                  );
                }}
              >
                Remove
              </span>
            </div>
          ))}
        </div>

        <Upload
          listType="picture-card"
          beforeUpload={(file) => {
            setUploadedFiles((prev: any) => [...prev, file]);
            return false;
          }}
          multiple
        >
          <span className="text-gray-400">Upload Media</span>
        </Upload>
      </div>

      {/* Buttons */}
      <div className="col-span-3 flex justify-end gap-5">
        <Button
          disabled={loading}
          onClick={() => router.push("/admin/rooms")}
        >
          Cancel
        </Button>
        <Button type="primary" htmlType="submit" loading={loading}>
          {type === "add" ? "Add" : "Update"}
        </Button>
      </div>
    </Form>
  );
}

export default RoomsForm;
