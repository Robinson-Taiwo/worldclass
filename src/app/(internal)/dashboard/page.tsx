// app/dashboard/page.tsx (or wherever you route your dashboard)
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import StreakChart from "@/components/chart/ChartComponents";
import { ModuleCard } from "@/components/ModuleCard";
import { nextjsModulesData } from "@/data/nextjs";
import CourseProgress from "@/components/CourseProgress";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { TypescriptModulesData } from "@/data/typescript";
import { todaysModules } from "@/data/todayModule";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import Link from "next/link";

export default function DashboardPage() {
  const user = useSelector((state: RootState) => state.user.user);
  console.log(user);

  return (
    <div className=" overflow-x-hidden overflow-hidden  scrollbar-hide flex flex-col ">
      <div className="w-full ">
        {/* 1. Welcome Section */}
        <div className="space-y-1 w-full max-w-full mt-4 px-6">
          <h1 className="lg:text-2xl text-lg  font-bold">
            Welcome,{user?.username} 👋
          </h1>
          <p className="text-muted-foreground">
            Let’s keep your streak alive today.
          </p>
        </div>

        <section className="flex  w-full justify-center">
          <div className="w-full   justify-center flex flex-col  xl:flex-row ">
            <div className="space-y-6 px-4 py-10   lg:w-[70%] ">
              <div className="w-full flex items-center flex-col 2xl:flex-col justify-center xl:justify-evenly ">
                <div className="xl:h-[30rem] w-[100%] xl:w-[100%]  px-[5%] items-center justify-center relative ">
                  <StreakChart />
                </div>

                <div className="flex flex-row xl:mt-[2rem]  xl:flex-row 2xl:flex-row mt-10 lg:mt-0 justify-evenly items-center xl:gap-[5rem] xl:justify-between xl:w-fit w-full ">
                  <CourseProgress
                    title="TypeScript"
                    completed={14}
                    total={30}
                  />
                  <CourseProgress title="Next.js" completed={6} total={16} />
                </div>
              </div>
            </div>

            <div className="flex flex-row  lg:flex-row w-full flex-wrap justify-evenly space-y-6 px-6 py-10 lg:w-[28%] ">
              {/* 6. Achievements & Badges */}
              <Card className="w-full">
                <CardHeader>
                  <CardTitle>🏅 Your Achievements</CardTitle>
                </CardHeader>
                <CardContent className="flex gap-2 flex-wrap">
                  <Badge>✅ First Module</Badge>
                  <Badge>🔥 3-Day Streak</Badge>
                  <Badge>🎯 10 Modules Done</Badge>
                  <Badge variant="secondary">🔒 30-Day Streak</Badge>
                </CardContent>
              </Card>

              {/* 4. Streak Section */}
              <Card className="w-full">
                <CardHeader>
                  <CardTitle>🔥 Learning Streak</CardTitle>
                </CardHeader>
                <CardContent className="flex w-ful 2xl:flex-row flex-col justify-between 2xl:items-center">
                  <div>
                    <p className="text-lg font-semibold">5-Day Streak</p>
                    <p className="text-sm text-muted-foreground">
                      Your longest streak: 5 days
                    </p>
                  </div>
                  <Badge className="mt-2" variant="default">
                    🔥 Keep it up
                  </Badge>
                </CardContent>
              </Card>

              {/* 5. GitHub Activity */}
              <Card className="w-full">
                <CardHeader>
                  <CardTitle>💻 GitHub Pushes</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Latest push: 3 hours ago
                  </p>
                  <p className="text-sm mt-1">
                    Connected GitHub: <strong>@Robinson-Taiwo</strong>
                  </p>
                  <Button className="mt-2">connect Github</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="lg:px-4">
          <div className="flex lg:px-8 px-4 justify-center flex-col w-full">
            {/* second time */}

            <div className="flex flex-col overflow-x-hidden  gap-6">
              <h1 className="lg:text-4xl text-xl flex   flex-row items-center font-bold">
                Today&apos;s Module 🎯
              </h1>

              {/* Horizontal Scrollable Module Cards */}
              <div className="w-full max-w-full scrollbar-hide overflow-auto overflow-x-auto">
                <div className="flex items-center gap-6 px-1 py-2">
                  {todaysModules.slice(0, 5).map((mod) => (
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
                        onMarkDone={() =>
                          console.log(`${mod.title} marked done`)
                        }
                      />
                    </div>
                  ))}
                  {nextjsModulesData.length > 4 && (
                    <Button className="rounded-full 2xl:hidden h-12 w-12 bg-orange-600 ">
                      {" "}
                      <ArrowRight />{" "}
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --------------------Typescript Module ----------- */}

        <section className="px-4 overflow-x-hidden p-4 mt-12">
          <div className="flex lg:px-8 justify-center flex-col w-full">
            {/* second time */}

            <div className="flex flex-col overflow-x-hidden  gap-6">
              <div className="flex flex-row lg:px-12 items-center justify-between">
                <h1 className="lg:text-4xl text-md flex   flex-row items-center font-bold">
                  Typescript Module{" "}
                  <Image
                    src="/ts.svg"
                    alt="next logo by icons8"
                    width={50}
                    height={50}
                    className="w-12 h-12"
                  />{" "}
                </h1>
                <Link href="/typescript-modules">
                  <Button className=" px-4 py-2 bg-orange-600 ">
                    Show All
                  </Button>
                </Link>
              </div>

              {/* grid Module Cards */}

              {/* --------------------------for Laptops------------------ */}

              <div className="w-full  max-w-full hidden lg:flex lg:justify-center scrollbar-hide overflow-hidden overflow-x-hidden">
                <div className="grid md:grid-cols-2  xl:grid-cols-3 2xl:grid-cols-4 gap-x-20  self-center place-items-center-safe lg:grid-cols-2 items-center gap-6 px-1 py-2">
                  {TypescriptModulesData.slice(0, 8).map((mod) => (
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
                        onMarkDone={() =>
                          console.log(`${mod.title} marked done`)
                        }
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* ----------- for tablets---------- */}

              <div className="w-full max-w-full lg:hidden   scrollbar-hide overflow-hidden overflow-x-hidden">
                <div className="grid md:grid-cols-2  xl:grid-cols-3 lg:grid-cols-2 items-center gap-6 px-1 py-2">
                  {TypescriptModulesData.slice(0, 4).map((mod) => (
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
                        onMarkDone={() =>
                          console.log(`${mod.title} marked done`)
                        }
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --------------------Next js module ----------- */}
        <section className="px-4 mt-12">
          <div className="flex lg:px-8 justify-center flex-col w-full">
            {/* second time */}

            <div className="flex flex-col overflow-x-hidden  gap-6">
              <div className="flex lg:px-12 flex-row items-center gap-[10%] justify-between  ">
                <h1 className="lg:text-4xl text-xl flex   flex-row items-center font-bold">
                  Next.js Module{" "}
                  <Image
                    src="/nextjs.svg"
                    alt="next logo by icons8"
                    width={50}
                    height={50}
                    className="w-12 h-12"
                  />{" "}
                </h1>
                <Link href="/nextjs-modules">
                  <Button className=" px-4 py-2 bg-orange-600 ">
                    Show All
                  </Button>
                </Link>{" "}
              </div>

              {/* next.js grid Module Cards */}

              {/* --------------------------for Laptops------------------ */}

              <div className="w-full max-w-full hidden lg:flex lg:justify-center  scrollbar-hide overflow-hidden overflow-x-hidden">
                <div className="grid md:grid-cols-2  xl:grid-cols-3 2xl:grid-cols-4 gap-x-20  lg:grid-cols-2 items-center gap-6 px-1 py-2">
                  {nextjsModulesData.slice(0, 8).map((mod) => (
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
                        onMarkDone={() =>
                          console.log(`${mod.title} marked done`)
                        }
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* ----------- for tablets---------- */}

              <div className="w-full max-w-full lg:hidden   scrollbar-hide overflow-hidden overflow-x-hidden">
                <div className="grid md:grid-cols-2  xl:grid-cols-3 lg:grid-cols-2 items-center gap-6 px-1 py-2">
                  {nextjsModulesData.slice(0, 4).map((mod) => (
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
                        onMarkDone={() =>
                          console.log(`${mod.title} marked done`)
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
    </div>
  );
}
