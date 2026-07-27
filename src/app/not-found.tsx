"use client";
import NumberFlow from "@number-flow/react";
import { useEffect, useState } from "react";

const NotFound = () => {
  const [count, setCount] = useState<number>(111);

  useEffect(() => {
    setCount(404);
  }, []);
  return (
    <main className="flex flex-col min-h-[calc(100svh-75px)]">
      <div className="container flex grow items-center justify-center mx-auto h-full bg-red-40">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <h1 className="italic text-5xl lg:text-9xl">
            <NumberFlow value={count} />
          </h1>
          <h3 className="italic text-2xl text-pretty lg:text-3xl">
            &quot;Lost in the DOM. Let’s head back home.&quot;
          </h3>
        </div>
      </div>
    </main>
  );
};

export default NotFound;
