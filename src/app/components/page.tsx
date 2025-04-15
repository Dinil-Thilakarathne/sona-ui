import React from "react";
import ComponentCard from "@/components/ComponentCard";
import { ComponentItems } from "@/libs/data";

const Page = () => {
  const FeaturedComponents = ComponentItems.filter((comp) => comp.featured);
  return (
    <div className="space-y-8 p-4 md:p-8">
      {/* Hero Section */}
      <header className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 md:text-5xl">
          Explore Our Components
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          Discover reusable and responsive components to enhance your projects.
        </p>
      </header>

      {/* Featured Components Section */}
      <section id="featured" className="space-y-6">
        <h2 className="text-2xl font-semibold text-gray-800 md:text-3xl">
          Featured Components
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {FeaturedComponents.map((component, index) => (
            <ComponentCard key={index} {...component} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Page;
