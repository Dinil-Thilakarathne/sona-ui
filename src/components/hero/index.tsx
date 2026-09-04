import Link from "@/components/common/link";
import FadeInComp from "../common/fade-in";
import ScrollUpButton from "../common/scroll-up-button";
import SplitTextComp from "../common/splil-text-comp";

export default function Hero() {
  return (
    <section className="flex overflow-clip relative flex-col p-2 lg:p-4 min-h-[calc(100dvh-75px)]">
      <div className="flex flex-col gap-y-12 grow justify-end h-full">
        <div className="flex flex-col justify-between min-h-[50vh] w-full md:min-h-[70vh]">
          <div className="flex flex-col gap-y-4 items-end">
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
              <p className="md:max-w-[35vw] text-right lg:text-xl">
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
                <Link href="/docs/installation" prefetch className="block">
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
                <Link href="/docs/accordion" prefetch className="block">
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
            <h1 className="font-clash-display font-medium leading-[0.8] text-[20vw] uppercase">
              Sona ui
            </h1>
          </SplitTextComp>
        </div>
      </div>
    </section>
  );
}
