import React from "react";
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

const VerticalTab_ex1 = () => {
  return (
    <div className="flex w-full flex-col items-center justify-center">
      <ComponentWrapper className="_border-none _shadow-none _sm:w-fit">
        <VerticalTab tabs={VerticalTabs_data} indicatorBgColor="bg-blue-200" />
      </ComponentWrapper>
    </div>
  );
};

export default VerticalTab_ex1;
