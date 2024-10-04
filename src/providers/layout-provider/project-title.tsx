import React from "react";
import { useRouter } from "next/navigation";

function ProjectTitle() {
  const router = useRouter();
  return (
    <div
      className="p-5 text-2xl font-bold border-0 border-r border-solid cursor-pointer"
      onClick={() => router.push("/")}
    >
      First Light Villas
    </div>
  );
}

export default ProjectTitle;
