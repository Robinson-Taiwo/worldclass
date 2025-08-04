import TypescriptModuleDetails from "../page";

export default function Page({ params }: { params: { moduleid: string } }) {
  return <TypescriptModuleDetails moduleid={params.moduleid} />;
}
