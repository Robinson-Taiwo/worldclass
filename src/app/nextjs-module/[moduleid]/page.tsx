import { nextjsModules } from "@/data/nextjs";
import React from "react";

const NextjsModuleDetails = ({ params }: { params: { moduleid: string } }) => {
  const modules = nextjsModules.find((mod) => mod.id === params.moduleid);

  return (
    <div className="w-full">
      <div>{modules?.title}</div>;
    </div>
  );
};

export default NextjsModuleDetails;
