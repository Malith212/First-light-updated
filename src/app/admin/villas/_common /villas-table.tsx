"use client";
import React from "react";
import { VillaType } from "<pages>/interfaces";
import { Table } from "antd";
import { Delete, Edit, PlusSquare, Trash } from "lucide-react";
import { render } from "react-dom";
import { text } from "stream/consumers";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";

function VillasTable({ villas }: { villas: VillaType[] }) {
  const router = useRouter();

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
          <Trash size={18} className="cursor-pointer text-red-700" />
          <Edit size={18} className="cursor-pointer text-yellow-700" 
            onClick={() => router.push(`/admin/villas/edit/${record._id}`)}
          />
          <PlusSquare size={18} className="cursor-pointer text-green-700" />
        </div>
      ),
    },
  ];

  return (
    <div>
      <Table columns={columns} dataSource={villas} />
    </div>
  );
}

export default VillasTable;
