"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { heroContent } from "@/lib/constants";
import BgGradient from "../common/bg-gradient";
import Sidebar from "../component-sidebar";
import FeatureGrid from "./feature-grid";

gsap.registerPlugin(useGSAP);

const Hero = () => {
  const mainHeader = useRef<HTMLHeadingElement>(null);
  const heroDescription = useRef<HTMLParagraphElement>(null);
  const heroFlag = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline();
    tl.from(mainHeader.current, {
      y: 200,
      opacity: 0.5,
      duration: 0.5,
    });
    tl.from(
      heroDescription.current,
      {
        y: 50,
        opacity: 0.5,
        duration: 0.25,
      },
      "-=0.15",
    );
    tl.from(
      heroFlag.current,
      {
        y: 50,
        opacity: 0.5,
        duration: 0.25,
      },
      "-=0.15",
    );
  });
  return (
    // mobile sidebar
    <section className="flex overflow-clip relative flex-col min-h-[calc(100vh-75px)]">
      <BgGradient />
      <div className="lg:hidden absolute left-0 top-0">
        <Sidebar />
      </div>

      <div className="grid relative grow items-center lg:flex-row px-4 space-y-4 lg:space-x-8 lg:space-y-0 h-full">
        <div className="flex flex-col gap-y-6 items-center h-fit w-full">
          <div className="overflow-clip">
            <div
              className="flex items-center justify-center px-4 py-2 space-x-2 w-fit bg-slate-50 dark:bg-slate-800 border-slate-800 rounded-full"
              ref={heroFlag}
            >
              <heroContent.flag.icon aria-label="hero-flag-img" />
              <span className="text-sm">{heroContent.flag.text}</span>
            </div>
          </div>
          <div className="flex flex-col items-center w-full text-center">
            <div className="overflow-clip">
              <h1
                className="font-bold font-clash-display text-7xl uppercase lg:text-9xl 2xl:text-[20rem] _font-roboto"
                ref={mainHeader}
              >
                {heroContent.header}
              </h1>
            </div>
            <div className="overflow-clip">
              <p
                className="max-w-2xl text-center text-gray-600 text-lg dark:text-gray-300 md:text-xl"
                ref={heroDescription}
              >
                {heroContent.description}
              </p>
            </div>
          </div>
        </div>
        <FeatureGrid />
      </div>
    </section>
  );
};

export default Hero;
