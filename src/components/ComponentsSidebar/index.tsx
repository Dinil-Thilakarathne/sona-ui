"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { FiMenu } from "react-icons/fi";

import SidebarLink from "../Common/SidebarLink";
import { navLinks } from "@/lib/data";
import { ComponentItemsProps } from "@/lib/types";

interface SidebarProps {
  title: string;
  items: ComponentItemsProps[];
}

const Sidebar: React.FC<SidebarProps> = ({ title, items }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Menu Icon for Mobile */}
      <motion.button
        className="fixed right-4 bottom-4 z-50 block rounded-full bg-white p-4 lg:hidden"
        onClick={() => setIsOpen(!isOpen)}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
      >
        <FiMenu size={24} />
      </motion.button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 flex min-h-screen w-64 transform flex-col border-r bg-white p-4 transition-transform duration-300 lg:relative lg:min-h-[calc(100vh-75px)] lg:translate-x-0 lg:bg-transparent ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <h2 className="mb-4 border-b text-lg font-medium text-gray-800">
          {title}
        </h2>
        <nav className="space-y-2">
          {items.map((item) => (
            <SidebarLink
              key={item.name}
              href={item.href}
              name={item.name}
              tag={item.tag}
              className="text-gray-700 hover:text-gray-900"
              onClick={() => setIsOpen(false)}
            />
          ))}
        </nav>

        <div className="w-full grow" />

        <nav className="flex flex-col space-y-2 lg:hidden">
          <h3 className="border-b text-lg font-medium">Navigation</h3>
          {navLinks.map((link) => (
            <div key={link.name} className="flex items-start space-y-0.5">
              <SidebarLink {...link} />
            </div>
          ))}
        </nav>
      </aside>

      {/* Overlay for Mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black opacity-50 lg:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Sidebar;
