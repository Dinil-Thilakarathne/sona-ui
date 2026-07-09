import { notFound } from "next/navigation";
import React from "react";
import AccordionAnimatedExample from "@/registry/examples/accordion/accordion-animated";

const page = () => {
  if (process.env.NODE_ENV === "production") {
    notFound(); // or redirect
  }

  return (
    <div className="container flex items-center justify-center mx-auto min-h-[calc(100vh-75px)]">
      <AccordionAnimatedExample />
    </div>
  );
};

export default page;
