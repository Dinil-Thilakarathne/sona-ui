"use client";
import ComponentWrapper from "@/components/Common/ComponentWrapper";
import React from "react";
import { FaCog, FaHome, FaSignOutAlt, FaUser } from "react-icons/fa";
import TabSlider from "../sonaui/TabSlider/TabSlider";
import { IconType } from "react-icons";

type TabDataType = {
  title: string;
  icon: IconType;
};

const TabData: TabDataType[] = [
  {
    title: "Home",
    icon: FaHome,
  },
  {
    title: "Profile",
    icon: FaUser,
  },
  {
    title: "Settings",
    icon: FaCog,
  },
  {
    title: "Logout",
    icon: FaSignOutAlt,
  },
];

const TabSlider_ex1 = () => {
  return (
    <ComponentWrapper>
      <TabSlider tabs={TabData} />
    </ComponentWrapper>
  );
};

export default TabSlider_ex1;
