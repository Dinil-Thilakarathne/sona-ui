import localFont from "next/font/local";

export const clashDisplay = localFont({
  src: [
    {
      path: "../fonts/ClashDisplay-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../fonts/ClashDisplay-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/ClashDisplay-Semibold.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/ClashDisplay-Bold.ttf",
      weight: "800",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-clash-display",
});
