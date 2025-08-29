"use client";
import { UploadImageToFirebaseAndReturnUrls } from "<pages>/helpers/image-upload";
import { Button, Form, Input, message, Upload } from "antd";
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
    try {
      setLoading(true);
      const newUrls = await UploadImageToFirebaseAndReturnUrls(uploadedFiles);
      values.media = [...existingMedia, ...newUrls];

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
      className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-5"
      onFinish={onFinish}
      initialValues={initialData}
    >
      <Form.Item
        className="col-span-3"
        label={<span className="text-gray-300 font-medium">Villa Name</span>}
        name="name"
        rules={[{ required: true, message: "Villa Name is required" }]}
      >
        <Input 
          placeholder="Villa Name" 
          className="placeholder-gray-400"
        />
      </Form.Item>

      <Form.Item
        className="col-span-3 md:col-span-1"
        label={<span className="text-gray-300 font-medium">Branch Manager Name</span>}
        name="owner"
        rules={[{ required: true, message: "Branch Manager Name is required" }]}
      >
        <Input 
          placeholder="Branch Manager Name" 
          className="placeholder-gray-400"
        />
      </Form.Item>

      <Form.Item
        className="col-span-3 md:col-span-1"
        label={<span className="text-gray-300 font-medium">Email</span>}
        name="email"
        rules={[{ required: true, message: "Email is required" }]}
      >
        <Input 
          placeholder="Email" 
          className="placeholder-gray-400"
        />
      </Form.Item>

      <Form.Item
        className="col-span-3 md:col-span-1"
        label={<span className="text-gray-300 font-medium">Phone</span>}
        name="phone"
        rules={[{ required: true, message: "Phone No is required" }]}
      >
        <Input 
          placeholder="Phone" 
          className="placeholder-gray-400"
        />
      </Form.Item>

      <Form.Item
        className="col-span-3"
        label={<span className="text-gray-300 font-medium">Address</span>}
        name="address"
        rules={[{ required: true, message: "Address is required" }]}
      >
        <Input.TextArea 
          placeholder="Address" 
          rows={4}
          className="placeholder-gray-400"
        />
      </Form.Item>

      <div className="col-span-3">
        <label className="text-gray-300 font-medium block mb-3">Media</label>
        <div className="flex flex-wrap gap-4 mb-4">
          {existingMedia.map((media: any, index: number) => (
            <div
              className="flex flex-col border border-solid rounded p-3 border-gray-600 gap-5 items-center bg-gray-750"
              key={index}
            >
              <img src={media} alt="media" className="h-16 w-16 object-cover" />
              <span
                className="text-red-400 underline text-sm cursor-pointer hover:text-red-300 transition-colors"
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
          <span className="text-gray-400 p-3">Upload Media</span>
        </Upload>
      </div>

      <div className="col-span-3 flex justify-end gap-5">
        <Button 
          disabled={loading} 
          onClick={() => router.push("/admin/villas")}
          // className="border-gray-600 text-gray-300 hover:bg-gray-700"
        >
          Cancel
        </Button>
        <Button 
          type="primary" 
          htmlType="submit" 
          loading={loading}
          // className="bg-gradient-to-r from-purple-600 to-blue-500 border-none hover:from-purple-700 hover:to-blue-600"
        >
          {type === "add" ? "Add" : "Update"}
        </Button>
      </div>
    </Form>
  );
}

export default VillaForm;