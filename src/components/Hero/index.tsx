import React from "react";

import Tag from "../Common/Tag";
import { heroContent } from "@/libs/constants";

const Hero = () => {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center space-y-6 text-center">
      <h1 className="text-4xl font-bold md:text-6xl">{heroContent.header}</h1>

      <p className="max-w-2xl text-lg text-gray-600 md:text-xl">
        {heroContent.description}
      </p>

      <div className="mt-4 flex flex-wrap justify-center gap-4">
        {heroContent.techStack.map((tech) => (
          <Tag key={tech} text={tech} type="featured" />
        ))}
      </div>

      <div className="absolute right-0 bottom-0 -z-10 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-blue-400 to-purple-300 opacity-50 blur-3xl"></div>
    </section>
  );
};

export default Hero;
