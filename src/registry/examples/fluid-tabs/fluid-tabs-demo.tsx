import FluidTabs from "@/registry/sonaui/fluid-tabs/fluid-tabs";

const tabs = [
  { value: "overview", title: "Overview" },
  { value: "activity", title: "Activity" },
  { value: "settings", title: "Settings" },
];

export default function FluidTabsDemo() {
  return <FluidTabs tabs={tabs} />;
}
