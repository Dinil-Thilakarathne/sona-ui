import { notFound } from "next/navigation";
import React from "react";

const page = () => {
  if (process.env.NODE_ENV === "production") {
    notFound(); // or redirect
  }

  return (
    <div className="container mx-auto flex min-h-[calc(100vh-75px)]">page</div>
  );
};

export default page;
