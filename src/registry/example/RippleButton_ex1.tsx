import ComponentWrapper from "@/components/Common/ComponentWrapper";
import React from "react";
import RippleButton, { RippleButtonText } from "../sonaui/rippleButton/RippleButton";

const RippleButton_ex1 = () => {
  return (
    <ComponentWrapper className="flex items-center justify-center">
      <RippleButton className="text-white">
        <RippleButtonText text="Hover me!" />
      </RippleButton>
    </ComponentWrapper>
  );
};

export default RippleButton_ex1;
