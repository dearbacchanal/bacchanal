"use client";

import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ChevronLeft, ChevronRight, Save } from "lucide-react";
import Link from "next/link";
import { SaveBookModal } from "./SaveBookModal";

interface BookFlipProps {
  pages: React.ReactNode[];
}

export const BookFlip: React.FC<BookFlipProps> = ({ pages }) => {
  const pagesRef = useRef<(HTMLDivElement | null)[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [isSaveModalOpen, setIsSaveModalOpen] = useState<boolean>(false);

  const flipNext = () => {
    if (currentPage >= pages.length - 1 || isAnimating) return;

    setIsAnimating(true);

    const currentPageElement = pagesRef.current[currentPage];
    if (!currentPageElement) return;

    gsap.to(currentPageElement, {
      rotateY: -180,
      duration: 1.2,
      ease: "power3.inOut",
      transformOrigin: "left center",
      onComplete: () => {
        setCurrentPage((prev) => prev + 1);
        setIsAnimating(false);
        currentPageElement?.scrollTo({ top: 0 });
      },
    });
  };

  const flipPrev = () => {
    if (currentPage <= 0 || isAnimating) return;

    setIsAnimating(true);

    const prevPageElement = pagesRef.current[currentPage - 1];
    if (!prevPageElement) return;

    gsap.to(prevPageElement, {
      rotateY: 0,
      duration: 1.2,
      ease: "power3.inOut",
      transformOrigin: "left center",
      onComplete: () => {
        setCurrentPage((prev) => prev - 1);
        setIsAnimating(false);
      },
    });
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") flipNext();
      if (e.key === "ArrowLeft") flipPrev();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentPage, isAnimating]);

  return (
    <div className="relative w-full h-screen bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 overflow-hidden">
      {/* Ambient background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse" />
      </div>

      {/* Book Container - Complete Width and Height */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{ perspective: "2500px" }}
      >
        {/* Book Shadow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-black/20 blur-3xl" />
        </div>

        {/* Pages - Full Width and Height */}
        <div className="absolute inset-0 w-full h-full">
          {pages.map((Page, index) => (
            <div
              key={index}
              ref={(el: any) => (pagesRef.current[index] = el)}
              className={`
    absolute inset-0 w-full h-full bg-white
    ${
      index === currentPage
        ? "overflow-y-auto overscroll-contain"
        : "overflow-hidden"
    }
  `}
              style={{
                transformStyle: "preserve-3d",
                transform: "rotateY(0deg)",
                transformOrigin: "left center",
                zIndex: pages.length - index,
                backfaceVisibility: "hidden",
                boxShadow:
                  "0 25px 50px -12px rgba(0,0,0,0.6), 0 0 0 1px rgba(0,0,0,0.1)",
              }}
            >
              <div className="w-full h-full">{Page}</div>

              {/* Page edge shadows */}
              <div className="absolute inset-y-0 left-0 w-2 bg-gradient-to-r from-black/10 to-transparent pointer-events-none" />
              <div className="absolute inset-y-0 right-0 w-2 bg-gradient-to-l from-black/10 to-transparent pointer-events-none" />
            </div>
          ))}
        </div>
      </div>

      {/* Carousel Controls - Left, Center, Right */}
      <div className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-center gap-2 sm:gap-4 md:gap-6 lg:gap-10 px-2 sm:px-4 md:px-6 lg:px-8 py-3 sm:py-4 md:py-5 lg:py-6 bg-gradient-to-t from-black/50 via-black/30 to-transparent">
        {/* Left Arrow Button */}
        <button
          onClick={flipPrev}
          disabled={currentPage === 0 || isAnimating}
          className={`
            p-2 sm:p-3 md:p-3.5 lg:p-4 rounded-full
            bg-white/10 backdrop-blur-xl border border-white/20
            transition-all duration-300
            ${
              currentPage === 0 || isAnimating
                ? "opacity-30 cursor-not-allowed"
                : "hover:bg-white/20 hover:scale-110 hover:shadow-lg hover:shadow-white/10 cursor-pointer active:scale-95"
            }
          `}
          aria-label="Previous page"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 text-white" />
        </button>

        {/* Center Page Counter */}
        <div className="flex flex-col items-center gap-2 sm:gap-3">
          {/* Page Counter */}
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-full px-3 py-1.5 sm:px-4 sm:py-2 md:px-6 md:py-2.5 lg:px-8 lg:py-3 shadow-2xl">
            <span className="text-white font-semibold text-xs sm:text-sm md:text-base lg:text-xl tracking-wide">
              {currentPage + 1} / {pages.length}
            </span>
          </div>
        </div>
        <Link
          href="/"
          className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-full px-3 py-1.5 sm:px-4 sm:py-2 md:px-6 md:py-2.5 lg:px-8 lg:py-3 shadow-2xl hover:bg-white/20 transition-all duration-300"
        >
          <span className="text-white font-semibold text-xs sm:text-sm md:text-base lg:text-base">
            HOME
          </span>
        </Link>

        {/* Right Button - Next Arrow or Save Button */}
        {currentPage === 14 ? (
          // Save Button on fifteenth page
          <button
            onClick={() => setIsSaveModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-3 rounded-full bg-gradient-to-r from-coral via-teal to-yellow text-white font-semibold hover:opacity-90 hover:scale-105 transition-all duration-300 shadow-lg active:scale-95"
            aria-label="Save book"
          >
            <Save className="w-5 h-5 sm:w-6 sm:h-6" />
            <span className="text-sm sm:text-base">Save Book</span>
          </button>
        ) : (
          // Next Arrow Button
          <button
            onClick={flipNext}
            disabled={currentPage === pages.length - 1 || isAnimating}
            className={`
              p-2 sm:p-3 md:p-3.5 lg:p-4 rounded-full
              bg-white/10 backdrop-blur-xl border border-white/20
              transition-all duration-300
              ${
                currentPage === pages.length - 1 || isAnimating
                  ? "opacity-30 cursor-not-allowed"
                  : "hover:bg-white/20 hover:scale-110 hover:shadow-lg hover:shadow-white/10 cursor-pointer active:scale-95"
              }
            `}
            aria-label="Next page"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 text-white" />
          </button>
        )}
      </div>

      {/* Save Book Modal */}
      <SaveBookModal
        isOpen={isSaveModalOpen}
        onClose={() => setIsSaveModalOpen(false)}
        onOpen={() => setIsSaveModalOpen(true)}
      />
    </div>
  );
};
