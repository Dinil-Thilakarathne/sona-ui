import localFont from "next/font/local";
import { clashDisplay } from "./clashDisplay";

export { clashDisplay };

export const HelveticaNeue = localFont({
  src: [
    {
      path: "./helvetica-neue/HelveticaNeue-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./helvetica-neue/HelveticaNeue-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./helvetica-neue/HelveticaNeue-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-helvetica-neue",
  preload: true,
});
