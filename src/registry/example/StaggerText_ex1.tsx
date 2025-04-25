import ComponentWrapper from "@/components/Common/ComponentWrapper";
import React from "react";
import StaggerText from "../sonaui/staggerText/StaggerText";

const StaggerText_ex1 = () => {
  return (
    <ComponentWrapper className="flex items-center justify-center">
      <StaggerText text="Hover me!" />
    </ComponentWrapper>
  );
};

export default StaggerText_ex1;
