"use client";
import { UploadImageToFirebaseAndReturnUrls } from "<pages>/helpers/image-upload";
import { Button, Form, Input, message, Upload } from "antd";
import { set } from "mongoose";
import React, { useState } from "react";
import { AddVila, EditVilla } from "<pages>/server-actions/villas";
import { useRouter } from "next/navigation";

function VillaForm({
  type = "add",
  initialData,
}: {
  type: string;
  initialData?: any;
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
        response = await AddVila(values);
      } else {
        response = await EditVilla({
          villaId: initialData._id,
          payload: values,
        });
      }

      if (response.success) {
        message.success(response.message);
        router.push("/admin/villas");
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
            setUploadedFiles([...uploadedFiles, file]);
            return false;
          }}
          multiple
        >
          <span className="text-xs text-gray-500 p-3">Upload Media</span>
        </Upload>
      </div>

      <div className="col-span-3 flex justify-end gap-5">
        <Button disabled={loading} onClick={() => router.push("/admin/villas")}>
          Cancel
        </Button>
        <Button type="primary" htmlType="submit" loading={loading}>
          Submit
        </Button>
      </div>
    </Form>
  );
}

export default VillaForm;
