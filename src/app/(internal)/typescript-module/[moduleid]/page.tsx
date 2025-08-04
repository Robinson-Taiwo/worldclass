// src/app/(internal)/nextjs-module/[moduleid]/page.tsx

interface PageProps {
  params: Promise<{ moduleid: string }>;
}

const Page = async ({ params }: PageProps) => {
  const { moduleid } = await params;

  return (
    <div>
      <h1>Module ID: {moduleid}</h1>
    </div>
  );
};

export default Page;
