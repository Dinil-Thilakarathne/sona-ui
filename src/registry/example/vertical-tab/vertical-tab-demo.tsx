import VerticalTab from "@/registry/sonaui/verticalTab/VerticalTab";
import ComponentWrapper from "@/components/Common/component-wrapper";

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

const VerticalTab_ex = () => {
  return (
    <ComponentWrapper>
      <VerticalTab tabs={VerticalTabs_data} />
    </ComponentWrapper>
  );
};

export default VerticalTab_ex;
