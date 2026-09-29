import SmartBreadcrumbs from "@/registry/sonaui/smart-breadcrumbs/smart-breadcrumbs";

const path = [
  { label: "Sona UI", href: "/" },
  { label: "Documentation", href: "/docs/installation" },
  { label: "Components", href: "/components" },
  { label: "Navigation", href: "/docs/fluid-tabs" },
  { label: "Smart Breadcrumbs" },
];

export default function SmartBreadcrumbsDemo() {
  return (
    <div className="flex min-h-56 w-full items-center justify-center px-4 py-12">
      <SmartBreadcrumbs items={path} />
    </div>
  );
}
