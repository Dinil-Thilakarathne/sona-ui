import AnimatedTabs from "@/registry/sonaui/animated-tabs/animated-tabs";

const tabs = [
  { value: "home", title: "Home" },
  { value: "profile", title: "Profile" },
  { value: "settings", title: "Settings" },
  { value: "help", title: "Help" },
  { value: "about", title: "About" },
];

export default function AnimatedTabsExample() {
  return <AnimatedTabs tabs={tabs} />;
}
