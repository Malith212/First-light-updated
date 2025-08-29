"use client";
import React from "react";
import { VillaType } from "<pages>/interfaces";
import { message, Table } from "antd";
import { Edit, Trash } from "lucide-react";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { DeleteVilla } from "<pages>/server-actions/villas";

function VillasTable({ villas }: { villas: VillaType[] }) {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const [showConfirm, setShowConfirm] = React.useState(false);
  const [selectedVillaId, setSelectedVillaId] = React.useState<string | null>(null);

  const onDelete = async (villaId: string) => {
    try {
      setLoading(true);
      const response = await DeleteVilla(villaId);
      if (response.success) {
        message.success(response.message);
        router.refresh();
      } else {
        message.error(response.error);
      }
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
      setShowConfirm(false);
    }
  };

  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Owner", dataIndex: "owner", key: "owner" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Phone", dataIndex: "phone", key: "phone" },
    { title: "Address", dataIndex: "address", key: "address" },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text: any, record: VillaType) =>
        dayjs(record.createdAt).format("DD-MM-YYYY, h:mm A"),
    },
    {
      title: "Action",
      key: "action",
      render: (text: any, record: VillaType) => (
        <div className="flex gap-5 items-center">
          <Trash
            size={18}
            className="cursor-pointer text-red-700"
            onClick={() => {
              setSelectedVillaId(record._id);
              setShowConfirm(true);
            }}
          />
          <Edit
            size={18}
            className="cursor-pointer text-yellow-700"
            onClick={() => router.push(`/admin/villas/edit/${record._id}`)}
          />
        </div>
      ),
    },
  ];

  return (
    <div>
      <Table
        loading={loading}
        columns={columns}
        dataSource={villas}
        rowKey="_id"
      />

      {/* Custom Confirmation Popup */}
      {showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-gray-800 rounded-2xl shadow-lg p-6 w-[90%] md:w-[400px]">
            <h2 className="text-lg font-semibold text-gray-200 mb-2">
              Are you sure you want to delete this villa?
            </h2>
            <p className="text-sm text-gray-400 mb-6">
              This action cannot be undone.
            </p>
            <div className="flex justify-end gap-4">
              {/* Cancel Button - Purple Gradient */}
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-blue-500 text-white hover:from-purple-700 hover:to-blue-600 transition"
              >
                Cancel
              </button>
              {/* Delete Button - Red */}
              <button
                onClick={() => selectedVillaId && onDelete(selectedVillaId)}
                className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-500 "
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default VillasTable;
