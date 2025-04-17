import React from "react";

import Tag from "../Common/Tag";
import { heroContent } from "@/libs/constants";
import Button from "../Button";
import Fade from "../Common/Fade";
import Sidebar from "../ComponentsSidebar";
import { ComponentItems } from "@/libs/data";

const Hero = () => {
  return (
    <section className="relative flex min-h-[calc(100vh-75px)] flex-col items-center justify-center space-y-4 overflow-clip text-center">
      <div className="absolute top-0 left-0 lg:hidden">
        <Sidebar title="Components" items={ComponentItems} />
      </div>

      <Fade preset="Fade-up" delay={0.05}>
        <Button className="flex items-center justify-center space-x-2" disabled>
          <heroContent.flag.icon />
          <span>{heroContent.flag.text}</span>
        </Button>
      </Fade>
      <Fade preset="Fade-up">
        <h1 className="text-4xl font-bold md:text-6xl lg:text-8xl">
          {heroContent.header}
        </h1>
      </Fade>

      <Fade preset="Fade-up" delay={0.1}>
        <p className="max-w-2xl text-lg text-gray-600 md:text-xl">
          {heroContent.description}
        </p>
      </Fade>

      <div className="mt-4 flex flex-wrap justify-center gap-4">
        {heroContent.techStack.map((tech, i) => (
          <Fade preset="Fade-up" delay={0.15 + i * 0.1} key={tech}>
            <Tag text={tech} type="featured" />
          </Fade>
        ))}
      </div>

      <div className="absolute -right-[15%] -bottom-[10%] -z-10 aspect-square w-[50vw] rounded-full bg-gradient-to-br from-blue-400 to-purple-300 opacity-50 blur-3xl" />
    </section>
  );
};

export default Hero;
