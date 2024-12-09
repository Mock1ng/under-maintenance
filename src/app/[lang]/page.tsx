import Image from "next/image";
import { getDictionary } from "./dictionaries";
import UnderConstruction from "@/app/[lang]/assets/under-construction.svg";
import ButtonClient from "./_components/Button";

export default async function Home({
  params
}: {
  params: Promise<{ lang: string }>;
}) {
  const lang = (await params).lang;
  const dict = await getDictionary(lang);

  return (
    <main className="flex flex-col items-center justify-center md:flex-row h-screen gap-12 max-w-screen-2xl mx-auto px-12">
      <div className="text-center">
        <h1 className="text-2xl sm:text-3xl md:text-6xl text-primary font-semibold text-balance mb-4 md:mb-8 leading-tight">
          {dict.title}
        </h1>
        <ButtonClient />
      </div>

      <Image
        src={UnderConstruction}
        alt="Under Construction"
        width={800}
        height={800}
        className="ml-auto aspect-auto w-auto"
        priority
      />
    </main>
  );
}
