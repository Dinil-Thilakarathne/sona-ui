import FluidTabs from "@/registry/sonaui/fluid-tabs/fluid-tabs";

export default function FluidTabsUnderlineDemo() {
  return (
    <FluidTabs
      tabs={[
        { value: "all", title: "All" },
        { value: "design", title: "Design" },
        { value: "engineering", title: "Engineering" },
      ]}
      variant="underline"
    />
  );
}
