
'use client';
import { Kalam } from "next/font/google";
import { TextInput } from "../ui/TextInput";

const kalam = Kalam({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const TenthPage = () => {
  return (
    <section className="relative w-full h-screen">
      <div className="flex flex-col md:flex-row w-full h-full relative z-10">
        {/* Left Section - Quote */}
        <div className="w-full md:w-1/2 bg-[#9F2E2B] flex items-center justify-center p-6 sm:p-8 md:p-8 relative h-1/2 md:h-full">
          <div className="relative max-w-sm mx-auto md:mx-0">
            {/* Left Quote Mark - Hidden on mobile */}
            <div className="relative hidden md:block">
              <p className={`${kalam.className} font-black text-8xl absolute -top-24 -left-12 text-[#c8413d]`}>
                ❝
              </p>
            </div>

            {/* Quote Text */}
            <p className="font-handwritten font-black text-black text-lg sm:text-xl md:text-3xl max-w-sm leading-relaxed">
              Me and carnival have a contract. Every year we go hard like nail. I
              on de roadway with truck bigger than hummingbird.
            </p>

            {/* Right Quote Mark - Hidden on mobile */}
            <div className="relative hidden md:block">
              <p className={`${kalam.className} font-black text-8xl absolute right-40 top-10 text-[#c8413d]`}>
                ❞
              </p>
            </div>
          </div>
        </div>

        {/* Right Section - Letter */}
        <div className="w-full md:w-1/2 bg-white flex flex-col items-center relative justify-center p-6 sm:p-8 md:p-8 h-1/2 md:h-full">
          <div className="max-w-sm mx-auto md:mx-0">
            <p className="font-handwritten font-black text-[#ce3834] text-3xl sm:text-4xl md:text-5xl max-w-sm mb-6 sm:mb-8 md:mb-10">
              Dear Bacchanal,
            </p>
            <p className="font-handwritten font-black text-[#ce3834] text-2xl sm:text-3xl md:text-4xl">
              This is my Trinidad Carnival 2026.
            </p>
          </div>

          {/* Signature Input */}
          <div className="absolute bottom-6 sm:bottom-8 md:bottom-40 right-6 sm:right-10 md:right-20">
            <p className="font-handwritten font-black text-[#ce3834] text-xl sm:text-2xl md:text-3xl">
              (
              <TextInput
                fieldId="name"
                placeholder="Your Name"
                className="bg-transparent w-24 sm:w-28 md:w-32 px-1 border-none outline-none focus:outline-none focus:ring-0 placeholder:text-[#ce3834] text-[#ce3834] text-xl sm:text-2xl md:text-3xl font-handwritten font-black"
              />
              )
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TenthPage;