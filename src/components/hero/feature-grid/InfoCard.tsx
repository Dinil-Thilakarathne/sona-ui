"use client";

import NumberFlow from "@number-flow/react";
import { Copy } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import Button from "@/components/button";
import {
  componentNavigationLinks,
  groupedComponents,
} from "@/config/components";

export default function InfoCard() {
  const [componentCount, setComponentCount] = useState<number>(0);
  const [categoryCount, setCategoryCount] = useState<number>(0);

  useEffect(() => {
    setComponentCount(componentNavigationLinks.length);
    setCategoryCount(Object.keys(groupedComponents).length);
  }, []);

  return (
    <>
      <div className="flex justify-between w-full">
        <Button
          className="flex gap-2 items-center w-fit text-white"
          variant="outline"
        >
          npx @sonacode/sonaui-cli
          <span className="*:scale-75">
            <Copy />
          </span>
        </Button>
        <Button className="w-fit text-black">
          <Link href={"/docs/accordion"}>Try it!</Link>
        </Button>
      </div>
      <ul className="ml-auto text-2xl text-right lg:text-4xl">
        <li>
          <NumberFlow value={componentCount} />
          <span> Components</span>
        </li>
        <li>
          <NumberFlow value={categoryCount} />
          <span> Categories</span>
        </li>
      </ul>
    </>
  );
}
