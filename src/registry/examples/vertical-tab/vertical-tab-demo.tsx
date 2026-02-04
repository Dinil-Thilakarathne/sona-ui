import VerticalTab from "@/registry/sonaui/vertical-tab/vertical-tab";

const VerticalTabs_data = [
  {
    title: "Home",
  },
  {
    title: "Profile",
  },
  {
    title: "Settings",
  },
  {
    title: "Help",
  },
  {
    title: "About",
  },
  {
    title: "Contact",
  },
  {
    title: "Feedback",
  },
];

export default function VerticalTabExample() {
  return <VerticalTab tabs={VerticalTabs_data} />;
}
