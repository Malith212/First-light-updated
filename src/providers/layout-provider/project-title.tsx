import React from "react";
import { useRouter } from "next/navigation";

function ProjectTitle() {
  const router = useRouter();
  return (
    <div
      className="p-5 text-2xl font-bold cursor-pointer"
      onClick={() => router.push("/")}
    >
      <span color="from-gray-500 to-gray-500">First Light Villas</span>
    </div>
  );
}

export default ProjectTitle;
