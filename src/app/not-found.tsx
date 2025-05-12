"use client";
import NumberFlow from "@number-flow/react";
import { useEffect, useState } from "react";

const NotFound = () => {
  const [count, setCount] = useState<number>(111);

  useEffect(() => {
    setCount(404);
  }, []);
  return (
    <main className="flex min-h-[calc(100svh-75px)] flex-col">
      <div className="bg-red-40 container mx-auto flex h-full grow items-center justify-center">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <h1 className="text-5xl italic lg:text-9xl">
            <NumberFlow value={count} />
          </h1>
          <h3 className="text-2xl text-pretty italic lg:text-3xl">
            &quot;Lost in the DOM. Let’s head back home.&quot;
          </h3>
        </div>
      </div>
    </main>
  );
};

export default NotFound;
