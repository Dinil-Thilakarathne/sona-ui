"use client";

import {
  ArrowDown01Icon,
  Copy01Icon,
  Tick02Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Share } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { useCopyToClipboard } from "@/components/copy-button/copy-button";
import { cn } from "@/lib/utils";
import {
  AnimatedDropdown,
  AnimatedDropdownContent,
  AnimatedDropdownItem,
  AnimatedDropdownTrigger,
} from "@/registry/sonaui/animated-dropdown/animated-dropdown";

function getPromptUrl(baseURL: string, url: string) {
  return `${baseURL}?q=${encodeURIComponent(
    `I'm looking at this Sona UI documentation: ${url}.
Help me understand how to use it. Be ready to explain concepts, give examples, or help debug based on it.`,
  )}`;
}

type MenuItem = {
  key: string;
  label: string;
  href: (ctx: { url: string; mdUrl: string }) => string;
  icon: React.ReactNode;
};

const menuItems: MenuItem[] = [
  {
    key: "markdown",
    label: "View as Markdown",
    href: ({ mdUrl }) => mdUrl,
    icon: (
      // biome-ignore lint/a11y/noSvgWithoutTitle: decorative icon
      <svg strokeLinejoin="round" viewBox="0 0 22 16" className="size-4">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M19.5 2.25H2.5C1.80964 2.25 1.25 2.80964 1.25 3.5V12.5C1.25 13.1904 1.80964 13.75 2.5 13.75H19.5C20.1904 13.75 20.75 13.1904 20.75 12.5V3.5C20.75 2.80964 20.1904 2.25 19.5 2.25ZM2.5 1C1.11929 1 0 2.11929 0 3.5V12.5C0 13.8807 1.11929 15 2.5 15H19.5C20.8807 15 22 13.8807 22 12.5V3.5C22 2.11929 20.8807 1 19.5 1H2.5ZM3 4.5H4H4.25H4.6899L4.98715 4.82428L7 7.02011L9.01285 4.82428L9.3101 4.5H9.75H10H11V5.5V11.5H9V7.79807L7.73715 9.17572L7 9.97989L6.26285 9.17572L5 7.79807V11.5H3V5.5V4.5ZM15 8V4.5H17V8H19.5L17 10.5L16 11.5L15 10.5L12.5 8H15Z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    key: "chatgpt",
    label: "Open in ChatGPT",
    href: ({ url }) => getPromptUrl("https://chatgpt.com", url),
    icon: (
      // biome-ignore lint/a11y/noSvgWithoutTitle: decorative icon
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className="size-4"
      >
        <path
          d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08-4.778 2.758a.795.795 0 0 0-.393.681zm1.097-2.365 2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5Z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    key: "claude",
    label: "Open in Claude",
    href: ({ url }) => getPromptUrl("https://claude.ai/new", url),
    icon: (
      // biome-ignore lint/a11y/noSvgWithoutTitle: decorative icon
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className="size-4"
      >
        <path
          d="m4.714 15.956 4.718-2.648.079-.23-.08-.128h-.23l-.79-.048-2.695-.073-2.337-.097-2.265-.122-.57-.121-.535-.704.055-.353.48-.321.685.06 1.518.104 2.277.157 1.651.098 2.447.255h.389l.054-.158-.133-.097-.103-.098-2.356-1.596-2.55-1.688-1.336-.972-.722-.491L2 6.223l-.158-1.008.655-.722.88.06.225.061.893.686 1.906 1.476 2.49 1.833.364.304.146-.104.018-.072-.164-.274-1.354-2.446-1.445-2.49-.644-1.032-.17-.619a2.972 2.972 0 0 1-.103-.729L6.287.133 6.7 0l.995.134.42.364.619 1.415L9.735 4.14l1.555 3.03.455.898.243.832.09.255h.159V9.01l.127-1.706.237-2.095.23-2.695.08-.76.376-.91.747-.492.583.28.48.685-.067.444-.286 1.851-.558 2.903-.365 1.942h.213l.243-.242.983-1.306 1.652-2.064.728-.82.85-.904.547-.431h1.032l.759 1.129-.34 1.166-1.063 1.347-.88 1.142-1.263 1.7-.79 1.36.074.11.188-.02 2.853-.606 1.542-.28 1.84-.315.832.388.09.395-.327.807-1.967.486-2.307.462-3.436.813-.043.03.049.061 1.548.146.662.036h1.62l3.018.225.79.522.473.638-.08.485-1.213.62-1.64-.389-3.825-.91-1.31-.329h-.183v.11l1.093 1.068 2.003 1.81 2.508 2.33.127.578-.321.455-.34-.049-2.204-1.657-.85-.747-1.925-1.62h-.127v.17l.443.649 2.343 3.521.122 1.08-.17.353-.607.213-.668-.122-1.372-1.924-1.415-2.168-1.141-1.943-.14.08-.674 7.254-.316.37-.728.28-.607-.461-.322-.747.322-1.476.388-1.924.316-1.53.285-1.9.17-.632-.012-.042-.14.018-1.432 1.967-2.18 2.945-1.724 1.845-.413.164-.716-.37.066-.662.401-.589 2.386-3.036 1.439-1.882.929-1.086-.006-.158h-.055L4.138 18.56l-1.13.146-.485-.456.06-.746.231-.243 1.907-1.312Z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    key: "v0",
    label: "Open in v0",
    href: ({ url }) => getPromptUrl("https://v0.dev", url),
    icon: (
      // biome-ignore lint/a11y/noSvgWithoutTitle: decorative icon
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 147 70"
        className="size-4"
      >
        <path d="M56 50.203V14h14v46.156C70 65.593 65.593 70 60.156 70c-2.596 0-5.158-1-7-2.843L0 14h19.797L56 50.203ZM147 56h-14V23.953L100.953 56H133v14H96.687C85.814 70 77 61.186 77 50.312V14h14v32.156L123.156 14H91V0h36.312C138.186 0 147 8.814 147 19.688V56Z" />
      </svg>
    ),
  },
];

interface DocsCopyPageProps {
  /** Raw markdown/MDX content of the current page. */
  page: string;
  /** Absolute URL of the current documentation page. */
  url: string;
  /** URL that serves the raw markdown for this page. */
  mdUrl: string;
  className?: string;
}

export function DocsCopyPage({
  page,
  url,
  mdUrl,
  className,
}: DocsCopyPageProps) {
  const { copied, copy } = useCopyToClipboard();
  const { copy: copyLink } = useCopyToClipboard();
  const reduceMotion = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const pageTitle = page.split("\n")[0]?.replace(/^#\s*/, "") ?? "Sona UI";
  const shareText = `Explore ${pageTitle} in Sona UI.`.slice(0, 100);
  const shareItems = [
    {
      key: "link",
      label: "Copy Link",
      href: "",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-link size-4"
          aria-hidden="true"
        >
          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
        </svg>
      ),
    },
    {
      key: "x",
      label: "Share on X",
      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(url)}`,
      icon: (
        <svg aria-hidden="true" viewBox="0 0 24 24" className="size-4">
          <path
            d="M14.234 10.162 22.977 0h-2.072l-7.591 8.824L7.251 0H.258l9.168 13.343L.258 24H2.33l8.016-9.318L16.749 24h6.993zm-2.837 3.299-.929-1.329L3.076 1.56h3.182l5.965 8.532.929 1.329 7.754 11.09h-3.182z"
            fill="currentColor"
          />
        </svg>
      ),
    },
    {
      key: "linkedin",
      label: "Share on LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      icon: (
        <svg aria-hidden="true" viewBox="0 0 256 256" className="size-4">
          <path
            d="M218.123 218.127h-37.931v-59.403c0-14.165-.253-32.4-19.728-32.4-19.756 0-22.779 15.434-22.779 31.369v60.43h-37.93V95.967h36.413v16.694h.51a39.907 39.907 0 0 1 35.928-19.733c38.445 0 45.533 25.288 45.533 58.186l-.016 67.013ZM56.955 79.27c-12.157.002-22.014-9.852-22.016-22.009-.002-12.157 9.851-22.014 22.008-22.016 12.157-.003 22.014 9.851 22.016 22.008A22.013 22.013 0 0 1 56.955 79.27m18.966 138.858H37.95V95.967h37.97v122.16ZM237.033.018H18.89C8.58-.098.125 8.161-.001 18.471v219.053c.122 10.315 8.576 18.582 18.89 18.474h218.144c10.336.128 18.823-8.139 18.966-18.474V18.454c-.147-10.33-8.635-18.588-18.966-18.453"
            fill="currentColor"
          />
        </svg>
      ),
    },
    {
      key: "native",
      label: "More sharing options",
      href: "",
      icon: <Share aria-hidden="true" className="size-4" />,
    },
  ];

  return (
    <div className={cn("relative flex w-fit gap-2", className)}>
      <div className="flex items-stretch rounded-lg bg-secondary text-xs lg:text-sm">
        <button
          type="button"
          onClick={() => copy(page)}
          aria-label={copied ? "Copied to clipboard" : "Copy page"}
          className="flex h-8 items-center gap-1.5 rounded-l-lg px-2.5 text-muted-foreground transition-colors hover:cursor-pointer hover:text-foreground"
        >
          <span
            aria-hidden="true"
            className="relative inline-flex size-3.5 shrink-0 items-center justify-center lg:size-4"
          >
            <AnimatePresence initial={false} mode="sync">
              <motion.span
                key={copied ? "copied" : "copy"}
                aria-hidden="true"
                initial={
                  reduceMotion
                    ? { opacity: 0 }
                    : { opacity: 0, scale: 0.75, filter: "blur(2px)" }
                }
                animate={
                  reduceMotion
                    ? { opacity: 1 }
                    : { opacity: 1, scale: 1, filter: "blur(0px)" }
                }
                exit={
                  reduceMotion
                    ? { opacity: 0 }
                    : { opacity: 0, scale: 0.75, filter: "blur(2px)" }
                }
                transition={
                  reduceMotion
                    ? { duration: 0 }
                    : { duration: 0.18, ease: [0.22, 1, 0.36, 1] }
                }
                className="absolute inset-0 flex items-center justify-center"
              >
                <HugeiconsIcon
                  icon={copied ? Tick02Icon : Copy01Icon}
                  strokeWidth={2}
                  className={cn(
                    "size-3.5 lg:size-4",
                    copied && "text-green-500",
                  )}
                />
              </motion.span>
            </AnimatePresence>
          </span>
          Copy Page
        </button>
        <span
          aria-hidden="true"
          className="my-1.5 w-px self-stretch bg-foreground/10"
        />
        <AnimatedDropdown open={open} onOpenChange={setOpen}>
          <AnimatedDropdownTrigger className="group flex h-8 items-center rounded-l-none rounded-r-lg px-1.5 text-muted-foreground bg-transparent hover:bg-transparent hover:text-foreground  hover:cursor-pointer data-[popup-open]:bg-transparent">
            <HugeiconsIcon
              icon={ArrowDown01Icon}
              strokeWidth={2}
              className={cn("size-4 ", open && "rotate-180")}
            />
          </AnimatedDropdownTrigger>
          <AnimatedDropdownContent align="end" className="w-52">
            {menuItems.map((item) => (
              <AnimatedDropdownItem
                key={item.key}
                icon={item.icon}
                onClick={() => {
                  window.open(
                    item.href({ url, mdUrl }),
                    "_blank",
                    "noopener,noreferrer",
                  );
                  setOpen(false);
                }}
                className="text-xs lg:text-sm"
              >
                {item.label}
              </AnimatedDropdownItem>
            ))}
          </AnimatedDropdownContent>
        </AnimatedDropdown>
      </div>
      <AnimatedDropdown open={shareOpen} onOpenChange={setShareOpen}>
        <AnimatedDropdownTrigger
          aria-label="Share this page"
          className="flex size-8 items-center justify-center rounded-lg bg-secondary text-muted-foreground transition-none hover:bg-secondary hover:text-foreground data-[popup-open]:bg-secondary p-2"
        >
          <Share className="" aria-hidden="true" />
        </AnimatedDropdownTrigger>
        <AnimatedDropdownContent align="end" className="w-44">
          {shareItems.map((item) => (
            <AnimatedDropdownItem
              key={item.key}
              onClick={() => {
                if (item.key === "link") {
                  void copyLink(url);
                } else if (item.key === "native" && navigator.share) {
                  void navigator.share({
                    title: shareText,
                    text: shareText,
                    url,
                  });
                } else if (item.href) {
                  window.open(item.href, "_blank", "noopener,noreferrer");
                }
                setShareOpen(false);
              }}
              className="text-xs lg:text-sm *:flex *:items-center *:gap-2"
            >
              {item.icon}
              <span className="text-ellipsis text-nowrap whitespace-nowrap overflow-hidden max-w-[14ch]">
                {item.label}
              </span>
            </AnimatedDropdownItem>
          ))}
        </AnimatedDropdownContent>
      </AnimatedDropdown>
    </div>
  );
}
