"use client";
import { ModuleCard } from "@/components/ModuleCard";
import { nextjsModulesData } from "@/data/nextjs";
import Image from "next/image";
import React from "react";

const nextjsModules = () => {
  return (
    <div>
      <section className="px-4 mt-12">
        <div className="flex lg:px-8 justify-center flex-col w-full">
          {/* second time */}

          <div className="flex flex-col overflow-x-hidden  gap-6">
            <div className="flex lg:px-12 flex-row items-center gap-[10%] justify-between  ">
              <h1 className="lg:text-4xl text-xl flex   flex-row items-center font-bold">
                Next.js Modules{" "}
                <Image
                  src="/nextjs.svg"
                  alt="next logo by icons8"
                  width={50}
                  height={50}
                  className="w-12 h-12"
                />{" "}
              </h1>
            </div>

            {/* next.js grid Module Cards */}

            {/* --------------------------for Laptops------------------ */}

            <div className="w-full max-w-full hidden lg:flex lg:justify-center  scrollbar-hide overflow-hidden overflow-x-hidden">
              <div className="grid md:grid-cols-2  xl:grid-cols-3 2xl:grid-cols-4 gap-x-20  lg:grid-cols-2 items-center gap-6 px-1 py-2">
                {nextjsModulesData.map((mod) => (
                  <div key={mod.id} className="min-w-[320px] shrink-0">
                    <ModuleCard
                      title={mod.title}
                      description={mod.description}
                      progress={mod.progress}
                      status={
                        mod.status as
                          | "completed"
                          | "in-progress"
                          | "not-started"
                      }
                      href={`${mod.link}/${mod.id}`}
                      onMarkDone={() => console.log(`${mod.title} marked done`)}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* ----------- for tablets---------- */}

            <div className="w-full max-w-full lg:hidden   scrollbar-hide overflow-hidden overflow-x-hidden">
              <div className="grid md:grid-cols-2  xl:grid-cols-3 lg:grid-cols-2 items-center gap-6 px-1 py-2">
                {nextjsModulesData.map((mod) => (
                  <div key={mod.id} className="min-w-[320px] shrink-0">
                    <ModuleCard
                      title={mod.title}
                      description={mod.description}
                      progress={mod.progress}
                      status={
                        mod.status as
                          | "completed"
                          | "in-progress"
                          | "not-started"
                      }
                      href={`${mod.link}/${mod.id}`}
                      onMarkDone={() => console.log(`${mod.title} marked done`)}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default nextjsModules;
