"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import { setNextjsModules } from "@/store/slices/moduleSlice";
import { fetchNextjsModules } from "@/lib/firebaseUtils"; // ← our Firestore getter
import { handleDeleteModule } from "@/lib/moduleUtils";
import Image from "next/image";
import { AdminModuleCard } from "@/components/AdminModuleCard";

const NextjsModules = () => {
  const modules = useSelector((state: RootState) => state.module.modules);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const getModules = async () => {
      try {
        const data = await fetchNextjsModules();
        console.log("Fetched modules:", data);
        dispatch(setNextjsModules(data));
      } catch (err) {
        console.error("Error fetching modules:", err);
      }
    };

    getModules();
  }, [dispatch]);

  return (
    <div>
      <section className="px-4 mt-12">
        <div className="flex lg:px-8 justify-center flex-col w-full">
          <div className="flex flex-col overflow-x-hidden gap-6">
            <div className="flex lg:px-12 flex-row items-center gap-[10%] justify-between">
              <h1 className="lg:text-4xl text-xl flex flex-row items-center font-bold">
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
            {/* Module Cards */}
            <div className="grid md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-x-20 lg:grid-cols-2 gap-6 px-1 py-2">
              {modules.map((mod) => (
                <div key={mod.id} className="min-w-[320px] shrink-0">
                  <AdminModuleCard
                    id={mod.id}
                    course="nextjs"
                    title={mod.title}
                    description={mod.description}
                    progress={mod.progress || 0}
                    status={mod.status || "not started"}
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
      </section>
    </div>
  );
};

export default NextjsModules;
