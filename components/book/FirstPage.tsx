"use client";

import { BookPDFGenerator } from "@/components/book/BookPDFGenerator";
import Image from "next/image";
import { Download, Send } from "lucide-react";

interface FirstPageProps {
  pages?: React.ReactNode[];
  isPurchased?: boolean;
  onShip?: () => void;
  onDownload?: () => void;
}

const FirstPage = ({ pages, isPurchased, onShip, onDownload }: FirstPageProps) => {
  return (
    <>
      {/* First Page */}
      <section className="relative min-h-screen bg-[#ff0400] w-full overflow-hidden">
        <Image
          src="/assets/layer-2.png"
          alt="Layer background"
          width={350}
          height={350} // adjust if needed
          className="absolute bottom-0 right-0 lg:min-h-[60%] min-w-[80%] "
          priority
        />
        <div className="relative z-10 flex flex-col items-start justify-center h-full p-8 md:p-16 mt-32 md:mt-48">
          <p className=" z-10 text-white pb-5">
            Dear Bacchanal
          </p>
          <p className=" z-10 text-white">
            First edition 2023
          </p>
          <p className=" z-10 text-white pb-5">
            Second edition 2026
          </p>
          <p className=" z-10 text-white">
            Copyright © SAFFA Trinidad Ltd.
          </p>
          <p className=" z-10 text-white">
            All rights reserved.
          </p>
          <p className=" z-10 text-white">
            No part of this book may be reproduced
          </p>
          <p className=" z-10 text-white">
            in any form or by any means without
          </p>
          <p className=" z-10 text-white pb-5">
            the written permission of the copyright owner.
          </p>
          <p className=" z-10 text-white">
            Ami Aqui Sirjoo, Creative Director
          </p>
          <p className=" z-10 text-white">
            Aarad Homer, Assistant Creative Director
          </p>
          <p className=" z-10 text-white">
            Aya Ataeva, Web Development and Design{" "}
          </p>
        </div>

        {/* Download Button at end of book */}
        {pages && pages.length > 0 && (
          <div className="absolute bottom-32 left-1/2 -translate-x-1/2 z-20 flex gap-4">
            {/* Manual Download Button if needed, or just the Ship button if isPurchased */}
            {/* Note: In previous implementation BookPDFGenerator had both. 
                 Now BookPage handles BookPDFGenerator. 
                 We need to trigger it. 
                 Let's provide buttons here that call callbacks. */}

            <button
              onClick={onDownload}
              className={`
                  flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-3
                  rounded-full bg-white/10 backdrop-blur-xl border border-white/20
                  text-white font-semibold hover:bg-white/20
                  transition-all duration-300 active:scale-95
                  hover:scale-105 hover:shadow-lg
                `}
            >
              <Download className="w-5 h-5 sm:w-6 sm:h-6" />
              <span className="hidden sm:inline text-sm sm:text-base">
                Download PDF
              </span>
            </button>
          </div>
        )}
      </section>
    </>
  );
};

export default FirstPage;
