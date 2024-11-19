"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center md:flex-row h-screen gap-12 max-w-screen-2xl mx-auto px-12">
      <div className="text-center">
        <h1 className="text-2xl sm:text-3xl md:text-6xl text-primary font-semibold text-balance mb-4 md:mb-8 leading-tight">
          Page Is Under <br /> Construction
        </h1>
        <Button
          variant={"primary"}
          className="text-sm md:text-xl"
          onClick={() => window.location.reload()}
        >
          Refresh
        </Button>
      </div>

      <Image
        src="/under-construction.svg"
        alt="Under Construction"
        width={800}
        height={800}
        className="ml-auto aspect-auto w-auto"
      />
    </main>
  );
}
