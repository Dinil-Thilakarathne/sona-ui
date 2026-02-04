"use client";

import Button from "@/components/button";
import NumberFlow from "@number-flow/react";
import { Copy } from "lucide-react";
import Link from "next/link";
import {
  componentNavigationLinks,
  groupedComponents,
} from "@/config/components";
import { useEffect, useState } from "react";

export default function InfoCard() {
  const [componentCount, setComponentCount] = useState<number>(0);
  const [categoryCount, setCategoryCount] = useState<number>(0);

  useEffect(() => {
    setComponentCount(componentNavigationLinks.length);
    setCategoryCount(Object.keys(groupedComponents).length);
  }, []);

  return (
    <>
      <div className="flex w-full justify-between">
        <Button
          className="flex w-fit items-center gap-2 text-white"
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
      <ul className="ml-auto text-right text-2xl lg:text-4xl">
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
