"use client";
import { Table, message } from "antd";
import dayjs from "dayjs";
import { Delete, Edit, PlusSquare, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { RoomType } from "<pages>/interfaces";
import { DeleteRoom } from "<pages>/server-actions/rooms";
import { render } from "react-dom";

function RoomsTable({ rooms }: { rooms: RoomType[] }) {
  const router = useRouter();
  const [loading = false, setLoading] = React.useState<boolean>(false);

  const onDelete = async (roomId: string) => {
    try {
      setLoading(true);
      const response = await DeleteRoom(roomId);
      if (response.success) {
        message.success(response.message);
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
      render: (text: any, record: RoomType) => record.villa.name,
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
            onClick={() => onDelete(record._id)}
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
      <Table loading={loading} dataSource={rooms} columns={columns} />
    </div>
  );
}

export default RoomsTable;
