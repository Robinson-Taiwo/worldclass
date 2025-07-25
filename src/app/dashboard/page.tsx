// app/dashboard/page.tsx (or wherever you route your dashboard)
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ChartAreaDefault } from "@/components/chart/ChartComponents";
import { ModuleCard } from "@/components/ModuleCard";
import { nextjsModules } from "@/data/nextjs";
import CourseProgress from "@/components/CourseProgress";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

export default function DashboardPage() {
  return (
    <div className=" overflow-x-hidden overflow-hidden  scrollbar-hide flex flex-col ">
      <div className="w-full ">
        {/* 1. Welcome Section */}
        <div className="space-y-1 w-full max-w-full mt-4 px-6">
          <h1 className="text-2xl font-bold">Welcome back, Taiwo 👋</h1>
          <p className="text-muted-foreground">
            Let’s keep your streak alive today.
          </p>
        </div>

        <Separator />
        <section className="flex  w-full justify-center">
          <div className="w-full  max-w-[90rem] justify-center flex flex-col lg:flex-row ">
            <div className="space-y-6 px-6 py-10  lg:w-[70%] ">
              <div className="w-full flex items-center flex-col xl:flex-row justify-center xl:justify-evenly ">
                <div className="xl: xl:w-[60%] relative ">
                  <ChartAreaDefault />
                </div>

                <div className="flex flex-row xl:flex-col justify-evenly items-center xl:gap-8 xl:justify-between xl:w-fit w-full ">
                  <CourseProgress
                    title="TypeScript"
                    completed={14}
                    total={30}
                  />
                  <CourseProgress title="Next.js" completed={6} total={16} />
                </div>
              </div>
            </div>

            <div className="flex lg:flex-col flex-wrap justify-evenly space-y-6 px-6 py-10 lg:w-[28%] ">
              {/* 6. Achievements & Badges */}
              <Card>
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
              <Card>
                <CardHeader>
                  <CardTitle>🔥 Learning Streak</CardTitle>
                </CardHeader>
                <CardContent className="flex 2xl:flex-row flex-col justify-between 2xl:items-center">
                  <div>
                    <p className="text-lg font-semibold">5-Day Streak</p>
                    <p className="text-sm text-muted-foreground">
                      Your longest streak: 5 days
                    </p>
                  </div>
                  <Badge variant="default">🔥 Keep it up</Badge>
                </CardContent>
              </Card>

              {/* 5. GitHub Activity */}
              <Card>
                <CardHeader>
                  <CardTitle>💻 GitHub Pushes</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Latest push: 3 hours ago
                  </p>
                  <p className="text-sm mt-1">
                    Connected GitHub: <strong>@taiwo-dev</strong>
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
              <h1 className="lg:text-4xl text-xl flex   flex-row items-center font-bold">Today&apos;s Module 🎯</h1>

              {/* Horizontal Scrollable Module Cards */}
              <div className="w-full max-w-full scrollbar-hide overflow-auto overflow-x-auto">
                <div className="flex items-center gap-6 px-1 py-2">
                  {nextjsModules.slice(0, 5).map((mod) => (
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
                        href={`/module/${mod.id}`}
                        onMarkDone={() =>
                          console.log(`${mod.title} marked done`)
                        }
                      />
                    </div>
                  ))}
                  {nextjsModules.length > 4 && (
                    <Button className="rounded-full 2xl:hidden h-12 w-12 bg-indigo-600 ">
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
              <div className="flex flex-row items-center justify-between">
                <h1 className="lg:text-4xl text-xl flex   flex-row items-center font-bold">
                  Typescript Module{" "}
                  <Image
                    src="/ts.svg"
                    alt="next logo by icons8"
                    width={50}
                    height={50}
                  />{" "}
                </h1>
                <Button className=" px-4 py-2 bg-indigo-600 ">Show All</Button>
              </div>

              {/* Horizontal Scrollable Module Cards */}
              <div className="w-full max-w-full scrollbar-hide overflow-auto overflow-x-auto">
                <div className="grid md:grid-cols-2  xl:grid-cols-3 lg:grid-cols-2 items-center gap-6 px-1 py-2">
                  {nextjsModules.slice(0, 8).map((mod) => (
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
                        href={`/module/${mod.id}`}
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
              <div className="flex flex-row items-center gap-[10%] justify-between">
                <h1 className="lg:text-4xl text-xl flex   flex-row items-center font-bold">
                  Next.js Module{" "}
                  <Image
                    src="/nextjs.svg"
                    alt="next logo by icons8"
                    width={50}
                    height={50}
                  />{" "}
                </h1>
                <Button className=" px-4 py-2 bg-indigo-600 ">Show All</Button>
              </div>

              {/* Horizontal Scrollable Module Cards */}
              <div className="w-full max-w-full scrollbar-hide overflow-auto overflow-x-auto">
                <div className="grid md:grid-cols-2  xl:grid-cols-3 lg:grid-cols-2 items-center gap-6 px-1 py-2">
                  {nextjsModules.slice(0, 8).map((mod) => (
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
                        href={`/module/${mod.id}`}
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
