import React from "react";

const Page = () => {
  return (
    <div className="p-8 font-sans">
      <h1 className="mb-6 text-4xl font-bold">
        Welcome to Sona UI Documentation
      </h1>
      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">Overview</h2>
        <p className="text-lg text-gray-700">
          Sona UI is a modern, lightweight, and customizable UI component
          library designed to help developers build beautiful and responsive
          user interfaces with ease. Our goal is to provide a comprehensive set
          of components that are easy to use, well-documented, and highly
          performant.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">Our Goals</h2>
        <ul className="list-inside list-disc text-lg text-gray-700">
          <li>Deliver high-quality, reusable UI components.</li>
          <li>Ensure accessibility and responsiveness across all devices.</li>
          <li>Provide clear and concise documentation for every component.</li>
          <li>Foster a community-driven approach to development.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">
          How to Use the Components
        </h2>
        <p className="mb-4 text-lg text-gray-700">
          Each component in Sona UI comes with detailed documentation and
          examples. To get started, navigate to the component you want to use
          from the sidebar. You will find:
        </p>
        <ul className="list-inside list-disc text-lg text-gray-700">
          <li>A description of the component and its use cases.</li>
          <li>
            Code examples to help you integrate the component into your project.
          </li>
          <li>API details, including props and methods.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">
          Contribute and Help Maintain
        </h2>
        <p className="mb-4 text-lg text-gray-700">
          Sona UI is an open-source project, and we welcome contributions from
          the community. Whether you want to report a bug, suggest a feature, or
          submit a pull request, your help is greatly appreciated. Here’s how
          you can contribute:
        </p>
        <ul className="list-inside list-disc text-lg text-gray-700">
          <li>
            Check out our{" "}
            <a href="/contributing" className="text-blue-500 underline">
              Contributing Guide
            </a>{" "}
            for guidelines.
          </li>
          <li>
            Browse the{" "}
            <a href="/issues" className="text-blue-500 underline">
              Issues
            </a>{" "}
            section to find tasks you can work on.
          </li>
          <li>
            Join our community discussions to share your ideas and feedback.
          </li>
        </ul>
        <p className="mt-4 text-lg text-gray-700">
          Together, we can make Sona UI even better!
        </p>
      </section>
    </div>
  );
};

export default Page;
