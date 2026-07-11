"use client";

import { FaCog, FaHome, FaSignOutAlt, FaUser } from "react-icons/fa";
import ExpandableTabs from "@/registry/sonaui/expandable-tabs/expandable-tabs";

const tabs = [
  {
    value: "home",
    title: "Home",
    icon: FaHome,
  },
  {
    value: "profile",
    title: "Profile",
    icon: FaUser,
  },
  {
    value: "settings",
    title: "Settings",
    icon: FaCog,
  },
  {
    value: "logout",
    title: "Logout",
    icon: FaSignOutAlt,
  },
];

export default function ExpandableTabsExample() {
  return <ExpandableTabs tabs={tabs} defaultValue="home" />;
}
