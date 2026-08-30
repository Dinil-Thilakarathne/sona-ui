"use client";

import NumberFlow from "@number-flow/react";
import { useEffect, useState } from "react";

const NotFound = () => {
  const [count, setCount] = useState<number>(111);

  useEffect(() => {
    setCount(404);
  }, []);
  return (
    <div className="flex items-center justify-center h-full min-h-svh">
      <div className="flex flex-col items-center justify-center space-y-4 text-center">
        <h1 className="italic text-5xl lg:text-9xl">
          <NumberFlow value={count} />
        </h1>
        <h3 className="lg:max-w-[75%] italic text-2xl text-pretty lg:text-3xl">
          &quot;Lost in the dark mode? This component doesn’t exist.&quot;
        </h3>
      </div>
    </div>
  );
};

export default NotFound;
