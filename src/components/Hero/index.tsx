import React from "react";

import Tag from "../Common/Tag";
import { heroContent } from "@/libs/constants";

const Hero = () => {
  return (
    <section className="relative flex min-h-[calc(100vh-75px)] flex-col items-center justify-center space-y-6 overflow-clip text-center">
      <h1 className="text-4xl font-bold md:text-6xl lg:text-8xl">
        {heroContent.header}
      </h1>

      <p className="max-w-2xl text-lg text-gray-600 md:text-xl">
        {heroContent.description}
      </p>

      <div className="mt-4 flex flex-wrap justify-center gap-4">
        {heroContent.techStack.map((tech) => (
          <Tag key={tech} text={tech} type="featured" />
        ))}
      </div>

      <div className="absolute -right-[15%] -bottom-[10%] -z-10 aspect-square w-[50vw] rounded-full bg-gradient-to-br from-blue-400 to-purple-300 opacity-50 blur-3xl" />
    </section>
  );
};

export default Hero;
