"use client";

import ComponentWrapper from "@/components/Common/ComponentWrapper";
import { FaCog, FaHome, FaSignOutAlt, FaUser } from "react-icons/fa";
import ExpandableTabs from "../sonaui/expandableTabs/ExpandableTabs";
import { type IconType } from "react-icons";

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
      <ExpandableTabs
        tabs={TabData}
        defaultActiveIndex={0}
        motionConfig={{
          transition: { duration: 0.2, ease: "easeInOut" },
        }}
      />
    </ComponentWrapper>
  );
};

export default ExpandableTabs_ex;
