"use client";
import { UploadImageToFirebaseAndReturnUrls } from "<pages>/helpers/image-upload";
import { Button, Form, Input, message, Select, Upload } from "antd";
import { set } from "mongoose";
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
    console.log("inside on finish");

    try {
      setLoading(true);
      const newUrls = await UploadImageToFirebaseAndReturnUrls(uploadedFiles);
      values.media = [...existingMedia, ...newUrls];
      // console.log("Image uploaded,", values.media);

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
      <Form.Item
        label="Villa"
        name="villa"
        rules={[{ required: true, message: "Please select a Villa" }]}
      >
        <Select>
          {villas.map((villa) => (
            <Select.Option key={villa._id} value={villa._id}>
              {villa.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        label="Name"
        name="name"
        rules={[{ required: true, message: "Name is Required" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Room Number"
        name="roomNumber"
        rules={[{ required: true, message: "Room Number is Required" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Type"
        name="type"
        rules={[{ required: true, message: "Type is Required" }]}
      >
        <Select>
          <Select.Option key="delux" value="delux">
            Delux
          </Select.Option>
          <Select.Option key="premium" value="premium">
            Premium
          </Select.Option>
          <Select.Option key="standard" value="standard">
            standard
          </Select.Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="Beds"
        name="beds"
        rules={[{ required: true, message: "Bedds Number is Required" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Rent Per Day"
        name="rentPerDay"
        rules={[{ required: true, message: "Rent Per Day is Required" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Amenities"
        name="amenities"
        rules={[{ required: true, message: "Amenities is Required" }]}
        className="col-span-3"
      >
        <Input.TextArea/>
      </Form.Item>

      <div className="col-span-3 flex gap-5">
        <div className="flex gap-5">
          {existingMedia.map((media: any, index: number) => (
            <div
              className="flex flex-col border border-solid rounded p-3 border-gray-200 gap-5 items-center"
              key={index}
            >
              <img src={media} alt="media" className="h-16 w-16 object-cover" />
              <span
                className="text-gray-500 underline text-sm cursor-pointer"
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
            setUploadedFiles((prev:any) => [...prev, file]);
            return false;
          }}
          multiple
        >
          <span className="text-xs text-gray-500 p-3">Upload Media</span>
        </Upload>
      </div>

      <div className="col-span-3 flex justify-end gap-5">
        <Button disabled={loading} onClick={() => router.push("/admin/rooms")}>
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
