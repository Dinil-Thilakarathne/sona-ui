import ComponentWrapper from "@/components/Common/ComponentWrapper";
import React from "react";
import {
  AccordionItem,
  AccordionItemContent,
  AccordionItemHeader,
  AccordionItemTrigger,
  AccordionRoot,
} from "./Accordion";
import { CodeSyntaxHighlighter } from "@/components/Common/CodeSyntaxHighlighter";
import Tabs from "@/components/Common/Tabs";
import { Metadata } from "next";
import { getComponentMetadata } from "@/hooks/metadata";

export const metadata: Metadata = getComponentMetadata("Accordion");

const Page = () => {
  const accordionData = [
    {
      value: "item-1",
      title: "What is Lorem Ipsum?",
      content:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. It has been the industry's standard dummy text since the 1500s.",
    },

    {
      value: "item-2",
      title: "Why do we use it?",
      content:
        "It is a long-established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
    },

    {
      value: "item-3",
      title: "Where can I get some?",
      content:
        "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form.",
    },

    {
      value: "item-4",
      title: "Is Lorem Ipsum safe to use?",
      content:
        "Yes, Lorem Ipsum is safe to use as placeholder text for web and print design purposes.",
    },

    {
      value: "item-5",
      title: "What are the origins of Lorem Ipsum?",
      content:
        "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC.",
    },
  ];

  const tabsData = [
    {
      title: "Page.tsx",
      content: (
        <CodeSyntaxHighlighter
          filePath="components/accordion/page.txt"
          language="tsx"
          className=""
        />
      ),
    },
    {
      title: "Accordion.tsx",
      content: (
        <CodeSyntaxHighlighter
          filePath="components/accordion/accordion.txt"
          language="tsx"
          className=""
        />
      ),
    },
    {
      title: "AnimatedPlusMinusButton.tsx",
      content: (
        <CodeSyntaxHighlighter
          filePath="components/accordion/AnimatedPlusMinusButton.txt"
          language="tsx"
          className=""
        />
      ),
    },
  ];
  return (
    <div className="space-y-8">
      <ComponentWrapper>
        <AccordionRoot
          allowMultiple={false}
          className="mx-auto flex max-w-4xl flex-col gap-y-4"
        >
          {accordionData.map((item) => (
            <AccordionItem key={item.value} className="border">
              <AccordionItemTrigger value={item.value}>
                <AccordionItemHeader value={item.value}>
                  <span className="flex-1">{item.title}</span>
                </AccordionItemHeader>
              </AccordionItemTrigger>
              <AccordionItemContent value={item.value}>
                <p className="">{item.content}</p>
              </AccordionItemContent>
            </AccordionItem>
          ))}
        </AccordionRoot>
      </ComponentWrapper>

      <Tabs tabs={tabsData} className="" />
    </div>
  );
};

export default Page;
