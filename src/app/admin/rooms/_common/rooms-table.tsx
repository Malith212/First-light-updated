"use client";
import { Table, message } from "antd";
import dayjs from "dayjs";
import { Edit, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { RoomType } from "<pages>/interfaces";
import { DeleteRoom } from "<pages>/server-actions/rooms";

function RoomsTable({ rooms }: { rooms: RoomType[] }) {
  const router = useRouter();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [showConfirm, setShowConfirm] = React.useState(false);
  const [selectedRoomId, setSelectedRoomId] = React.useState<string | null>(null);

  const onDelete = async (roomId: string) => {
    try {
      setLoading(true);
      const response = await DeleteRoom(roomId);
      if (response.success) {
        message.success(response.message);
      } else {
        message.error(response.error);
      }
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
      setShowConfirm(false);
      setSelectedRoomId(null);
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Villa",
      dataIndex: "villa",
      key: "villa",
      render: (text: any, record: RoomType) => record.villa?.name,
    },
    {
      title: "Room Number",
      dataIndex: "roomNumber",
      key: "roomNumber",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Rent Per Day",
      dataIndex: "rentPerDay",
      key: "rentPerDay",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text: any, record: RoomType) =>
        dayjs(record.createdAt).format("MMM DD, YYYY hh:mm A"),
    },
    {
      title: "Action",
      key: "action",
      render: (text: any, record: RoomType) => (
        <div className="flex gap-5 items-center">
          <Trash2
            size={18}
            className="cursor-pointer text-red-700"
            onClick={() => {
              setSelectedRoomId(record._id);
              setShowConfirm(true);
            }}
          />
          <Edit
            size={18}
            className="cursor-pointer text-yellow-700"
            onClick={() => router.push(`/admin/rooms/edit/${record._id}`)}
          />
        </div>
      ),
    },
  ];

  return (
    <div>
      <Table loading={loading} dataSource={rooms} columns={columns} rowKey="_id" />

      {/* Custom Confirmation Popup */}
      {showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-gray-800 rounded-2xl shadow-lg p-6 w-[90%] md:w-[400px]">
            <h2 className="text-lg font-semibold text-gray-200 mb-2">
              Are you sure you want to delete this room?
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
                onClick={() => selectedRoomId && onDelete(selectedRoomId)}
                className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-500"
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

export default RoomsTable;
