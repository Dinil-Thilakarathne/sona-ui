import Link from "next/link";
import FadeInComp from "../common/fade-in";
import ScrollUpButton from "../common/scroll-up-button";
import SplitTextComp from "../common/splil-text-comp";

export default function Hero() {
  return (
    <section className="relative flex min-h-[calc(100vh-75px)] flex-col overflow-clip p-2 lg:p-4">
      <div className="flex h-full grow flex-col justify-end gap-y-12">
        <div className="flex min-h-[50vh] w-full flex-col justify-between md:min-h-[70vh]">
          <div className="flex flex-col items-end gap-y-4">
            <SplitTextComp
              variant="lines"
              maskType="lines"
              animationProps={{
                duration: 0.6,
                rotate: 0,
                filter: "blur(4px)",
                opacity: 0,
                yPercent: 40,
              }}
            >
              <p className="text-right md:max-w-[35vw] lg:text-xl">
                A modern UI component library built with React and TailwindCSS
                to help you build beautiful and accessible web applications
                faster.
              </p>
            </SplitTextComp>
            <div className="flex gap-x-2">
              <FadeInComp
                className="overflow-visible"
                animationProps={{
                  duration: 0.8,
                  delay: 0.2,
                  rotate: 0,
                  filter: "blur(4px)",
                  yPercent: 40,
                  opacity: 0,
                }}
              >
                <Link href="/docs/installation" className="block">
                  <ScrollUpButton text="Get started" variant="secondary" />
                </Link>
              </FadeInComp>
              <FadeInComp
                className="overflow-visible"
                animationProps={{
                  duration: 0.8,
                  delay: 0.25,
                  rotate: 0,
                  filter: "blur(4px)",
                  yPercent: 40,
                  opacity: 0,
                }}
              >
                <Link href="/docs/accordion" className="block">
                  <ScrollUpButton text="Browse components" />
                </Link>
              </FadeInComp>
            </div>
          </div>
          <SplitTextComp
            variant="lines"
            maskType="lines"
            animationProps={{
              duration: 0.8,
              rotate: 5,
              filter: "blur(6px)",
              opacity: 0,
              yPercent: 80,
              ease: "power2.inOut",
            }}
          >
            <h1 className="font-clash-display text-[20vw] leading-[0.8] font-medium uppercase">
              Sona ui
            </h1>
          </SplitTextComp>
        </div>
      </div>
    </section>
  );
}
