import { nextjsModules } from "@/data/nextjs";
import React from "react";

interface NextjsModuleDetailsProps {
  params: {
    moduleid: string;
  };
}

const NextjsModuleDetails = ({ params }: NextjsModuleDetailsProps) => {
  const modules = nextjsModules.find((mod) => mod.id === params.moduleid);

  return (
    <div className="w-full p-6">
      <h1 className="text-2xl font-bold">{modules?.title || "Module not found"}</h1>
    </div>
  );
};

export default NextjsModuleDetails;
