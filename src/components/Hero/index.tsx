import { heroContent } from "@/lib/constants";
import Sidebar from "../ComponentsSidebar";

// import HeroGrid from "./HeroGrid";
import BgGradient from "../Common/BgGradient";
import FeatureGrid from "./FeatureGrid";

const Hero = () => {
  return (
    // mobile sidebar
    <section className="relative flex min-h-[calc(100vh-75px)] flex-col overflow-clip">
      <BgGradient />
      <div className="absolute top-0 left-0 lg:hidden">
        <Sidebar />
      </div>

      <div className="relative grid h-full grow items-center space-y-4 px-4 lg:flex-row lg:space-y-0 lg:space-x-8">
        <div className="flex h-fit w-full flex-col items-center gap-y-6">
          <div className="flex w-fit items-center justify-center space-x-2 rounded-full border-slate-800 bg-slate-50 px-4 py-2 dark:bg-slate-800">
            <heroContent.flag.icon aria-label="hero-flag-img" />
            <span className="text-sm">{heroContent.flag.text}</span>
          </div>
          <div className="flex w-full flex-col items-center text-center">
            <h1 className="font-clash-display _font-roboto text-7xl font-bold uppercase lg:text-9xl 2xl:text-[20rem]">
              {heroContent.header}
            </h1>
            <p className="max-w-2xl text-center text-lg text-gray-600 md:text-xl dark:text-gray-300">
              {heroContent.description}
            </p>
          </div>
        </div>
        <FeatureGrid />
      </div>
    </section>
  );
};

export default Hero;
