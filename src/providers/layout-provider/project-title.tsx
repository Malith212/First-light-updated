import React from "react";
import { useRouter } from "next/navigation";

function ProjectTitle() {
  const router = useRouter();
  return (
    <div
      className="p-5 text-2xl font-bold cursor-pointer"
      onClick={() => router.push("/")}
    >
      <span className="bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
        First Light Villas
      </span>
    </div>
  );
}

export default ProjectTitle;
