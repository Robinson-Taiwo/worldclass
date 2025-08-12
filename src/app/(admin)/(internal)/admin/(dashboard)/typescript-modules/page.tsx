"use client";

import { RootState, AppDispatch } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { handleDeleteModule } from "@/lib/moduleUtils";
import Image from "next/image";
import { AdminModuleCard } from "@/components/AdminModuleCard";

const NextjsModules = () => {
  const modules = useSelector((state: RootState) => state.module.modules);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div>
      <section className="px-4 overflow-x-hidden p-4 mt-12">
        <div className="flex lg:px-8 justify-center flex-col w-full">
          {/* === Header Section === */}
          <div className="flex flex-col overflow-x-hidden gap-6">
            <div className="flex flex-row lg:px-12 items-center justify-between">
              <h1 className="lg:text-4xl text-md flex flex-row items-center font-bold">
                Next.js Modules{" "}
                <Image
                  src="/nextjs.svg"
                  alt="next logo"
                  width={50}
                  height={50}
                  className="w-12 h-12"
                />
              </h1>
            </div>

            {/* === Desktop / Laptop View === */}
            <div className="w-full max-w-full hidden lg:flex lg:justify-center scrollbar-hide overflow-hidden overflow-x-hidden">
              <div className="grid md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-x-20 self-center place-items-center-safe lg:grid-cols-2 items-center gap-6 px-1 py-2">
                {modules.map((mod) => (
                  <div key={mod.id} className="min-w-[320px] shrink-0">
                    <AdminModuleCard
                      id={mod.id}
                      course="nextjs"
                      title={mod.title}
                      description={mod.description}
                      progress={mod.progress || 0}
                      status={
                        (mod.status as
                          | "completed"
                          | "in progress"
                          | "not started") ?? "not-started"
                      }
                      href={`/admin/nextjs-modules/${mod.id}`}
                      onMarkDone={() => console.log(`${mod.title} marked done`)}
                      onDelete={() =>
                        handleDeleteModule(dispatch, mod.id, "nextjs")
                      }
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* === Tablet / Mobile View === */}
            <div className="w-full max-w-full lg:hidden scrollbar-hide overflow-hidden overflow-x-hidden">
              <div className="grid md:grid-cols-2 xl:grid-cols-3 lg:grid-cols-2 items-center gap-6 px-1 py-2">
                {modules.map((mod) => (
                  <div key={mod.id} className="min-w-[320px] shrink-0">
                    <AdminModuleCard
                      id={mod.id}
                      course="nextjs"
                      title={mod.title}
                      description={mod.description}
                      progress={mod.progress || 0}
                      status={
                        (mod.status as
                          | "completed"
                          | "in progress"
                          | "not started") ?? "not-started"
                      }
                      href={`/admin/nextjs-modules/${mod.id}`}
                      onMarkDone={() => console.log(`${mod.title} marked done`)}
                      onDelete={() =>
                        handleDeleteModule(dispatch, mod.id, "nextjs")
                      }
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

export default NextjsModules;
