"use client";

import { useEffect, useState } from "react";
import NumberFlow from "@number-flow/react";

const NotFound = () => {
  const [count, setCount] = useState<number>(111);

  useEffect(() => {
    setCount(404);
  }, []);
  return (
    <div className="flex h-full items-center justify-center">
      <div className="flex flex-col items-center justify-center space-y-4 text-center">
        <h1 className="text-5xl italic lg:text-9xl">
          <NumberFlow value={count} />
        </h1>
        <h3 className="text-2xl text-pretty italic lg:max-w-[75%] lg:text-3xl">
          &quot;Lost in the dark mode? This component doesn’t exist.&quot;
        </h3>
      </div>
    </div>
  );
};

export default NotFound;
