import NextjsModuleDetails from "../page";

export default function Page({ params }: { params: { moduleid: string } }) {
  return <NextjsModuleDetails moduleid={params.moduleid} />;
}
