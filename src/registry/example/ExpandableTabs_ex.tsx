"use client";
import ComponentWrapper from "@/components/Common/ComponentWrapper";
import React from "react";
import { FaCog, FaHome, FaSignOutAlt, FaUser } from "react-icons/fa";
import ExpandableTabs from "../sonaui/expandableTabs/ExpandableTabs";
import {type IconType } from "react-icons";

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

const ExpandableTabs_ex = () => {
  return (
    <ComponentWrapper>
      <ExpandableTabs tabs={TabData} />
    </ComponentWrapper>
  );
};

export default ExpandableTabs_ex;
