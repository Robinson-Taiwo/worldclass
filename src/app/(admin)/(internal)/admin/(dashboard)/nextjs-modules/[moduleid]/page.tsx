// src/app/(internal)/nextjs-module/[moduleid]/page.tsx

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {  nextjsModulesData } from "@/data/nextjs";
import { cn } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React from "react";



interface PageProps {
  params: Promise<{ moduleid: string }>;
}

const Page = async ({ params }: PageProps) => {
  const { moduleid } = await params; // ✅ Await the param
  const modules = nextjsModulesData.find((mod) => mod.id === moduleid);

  return (
    <div className="w-full p-2">
      <Link
        href="/dashboard"
        className="flex justify-center items-center border-border border rounded-full h-8 w-8"
      >
        <ArrowLeft className="h-6 w-6" />
      </Link>

      <div className="lg:px-6 px-2 pt-6  ">
        <div className="text-4xl gap-2  flex lg:items-center flex-col lg:flex-row font-bold">
          {" "}
          <span> {`${modules?.course && modules?.title}`}</span>{" "}
          <span
            className={cn(
              "text-sm flex  items-center gap-2 px-2 h-fit rounded-md border transition-all w-fit sm:w-auto",
              modules?.status === "completed"
                ? "bg-green-100 text-green-700 border-green-300 "
                : "bg-indigo-600 text-white hover:bg-indigo-700"
            )}
          >
            {modules?.status}{" "}
          </span>{" "}
        </div>

        <h2 className="font-semibold mt-2 ">
          Course:{"  "}
          {modules?.course}
        </h2>

        <h2 className="text-sm lg:text-md mt-4"> {modules?.description}</h2>
      </div>

      <div className="flex lg:mt-20 mt-6 lg:px-6 px-2 flex-col">
        <h1 className=" underline text-secondary-foreground font-bold lg:text-2xl text-lg flex">
          Overview
        </h1>

        <div className="bg-muted lg:w-[70%] flex gap-4 flex-col rounded-2xl p-4 mt-6 ">
          <p className="lg:text-md text-sm  ">
            {" "}
            <span className="text-black font-bold text-md ">Time:</span>
            <span className="text-black lg:text-md text-sm  ">
              {" "}
              45 Mins
            </span>{" "}
          </p>
          <p className="text-md  ">
            {" "}
            <span className="text-black font-bold text-md ">Prerequisite:</span>
            <strong className="text-black lg:text-md text-sm ">
              {" "}
              Javascript, HTML, CSS
            </strong>{" "}
          </p>
          <p className="text-md  ">
            {" "}
            <span className="text-black font-bold text-md ">Progress:</span>
            <span className="text-black text-sm ">
              {" "}
              {modules?.progress}%
            </span>{" "}
          </p>
        </div>
      </div>

      <div className="flex lg:mt-10 mt-6 lg:px-6 px-2 flex-col">
        <h1 className=" underline text-secondary-foreground font-bold lg:text-2xl text-lg flex">
          Resources
        </h1>

        <div className=" lg:w-[70%] flex gap-4 flex-col rounded-2xl p-4 mt-6 ">
          <p className="text-md  ">
            {" "}
            <span className="text-black font-bold ">Documentation link:</span>
            <span className="text-black lg:text-md text-sm ">
              {" "}
              45 Mins
            </span>{" "}
          </p>
          <p className="text-md  ">
            {" "}
            <span className="text-black font-bold ">Youtube Video:</span>
            <strong className="text-black lg:text-md text-sm ">
              {" "}
              Javascript, HTML, CSS
            </strong>{" "}
          </p>
        </div>
      </div>

      <div className="flex lg:mt-10 mt-6 lg:px-6 px-2 flex-col">
        <h1 className="  text-secondary-foreground font-bold lg:text-2xl text-lg flex">
          Module project
        </h1>

        <div className=" lg:w-[70%] flex gap-4 flex-col rounded-2xl p-4 mt-6 ">
          <p className="text-md  flex gap-2 flex-col  ">
            {" "}
            <span className="text-black  font-bold ">Project brief</span>
            <span className="text-black lg:text-md text-sm ">
              {" "}
              create a file typescript file{" "}
            </span>{" "}
          </p>
          <p className="text-md  flex gap-2 flex-col  ">
            {" "}
            <span className="text-black  font-bold ">Acceptance Criteria</span>
            <span className="text-black lg:text-base text-sm ">
              {" "}
              create a file typescript file{" "}
            </span>{" "}
          </p>
        </div>
      </div>

      <div className="flex lg:mt-10 mt-6 lg:px-6 px-2 flex-col">
        <h1 className="  text-secondary-foreground font-bold lg:text-4xl text-lg flex">
          Submissions
        </h1>

        <div className=" lg:w-[70%] flex gap-4 flex-col rounded-2xl p-4 mt-6 ">
          <p className="text-md  flex gap-2 flex-col  ">
            {" "}
            <span className="text-black  font-bold ">Github Link</span>
            <Input
              className="placeholder:text-sm  text-sm "
              placeholder="Add a github repo link here"
            />{" "}
          </p>
          <p className="text-md  flex gap-2 flex-col  ">
            {" "}
            <span className="text-black  font-bold ">
              project live link here
            </span>
            <span className="text-black lg:text-base text-sm ">
              {" "}
              <Input
                className="placeholder:text-sm  text-sm "
                placeholder="Add a github repo link here"
              />{" "}
            </span>{" "}
          </p>
          <div className="text-md  flex gap-2 flex-col  ">
            {" "}
            <label className="text-black  font-bold ">Note and Journal</label>
            <span className="text-black lg:text-base text-sm ">
              {" "}
              <Textarea
                className="text-sm placeholder:text-sm  "
                placeholder="Add your comments and notes here"
              />
            </span>{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
