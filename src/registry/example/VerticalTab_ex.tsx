import VerticalTab from "../sonaui/verticalTab/VerticalTab";
import ComponentWrapper from "@/components/Common/ComponentWrapper";

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
