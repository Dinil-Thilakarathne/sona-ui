import { notFound } from "next/navigation";
import React from "react";
import AccordionAnimatedExample from "@/registry/examples/accordion/accordion-animated";

const page = () => {
  if (process.env.NODE_ENV === "production") {
    notFound(); // or redirect
  }

  return (
    <div className="container mx-auto flex min-h-[calc(100vh-75px)] items-center justify-center">
      <AccordionAnimatedExample />
    </div>
  );
};

export default page;
