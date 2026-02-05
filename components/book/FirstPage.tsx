"use client";

import Image from "next/image";
import { BookPDFGenerator } from "./BookPDFGenerator";

interface FirstPageProps {
  pages?: React.ReactNode[];
}

const FirstPage = ({ pages }: FirstPageProps) => {

  return (
    <>
      {/* First Page */}
      <section className="relative min-h-screen bg-[#D23431] w-full overflow-hidden">


        <Image
          src="/assets/layer-2.png"
          alt="Layer background"
          width={350}
          height={350} // adjust if needed
          className="absolute bottom-0 right-0 lg:min-h-[60%] min-w-[80%] "
          priority
        />
        <h1 className="relative z-10 text-white text-5xl md:text-6xl lg:text-[10vh]  max-w-5xl font-bold p-8 md:p-16 mt-32 md:mt-48">
          Thank you, Carnival 2026.
        </h1>

        {/* Download Button at end of book */}
        {pages && pages.length > 0 && (
          <div className="absolute bottom-32 left-1/2 -translate-x-1/2 z-20">
            <BookPDFGenerator pages={pages} />
          </div>
        )}

      </section>
    </>
  );
};

export default FirstPage;
