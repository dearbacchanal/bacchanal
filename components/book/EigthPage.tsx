import Image from "next/image";
import React from "react";
import { kalufira } from "./Font";

const EigthPage = () => {
  return (
    <>
      {/* Eighth Page */}
      <section className="bg-[#9f2e2b] w-full min-h-screen relative">
        <Image
          src="/assets/layer-12.png"
          alt="Overlay"
          fill
          className="object-cover pointer-events-none"
          priority
        />
        <div className="flex flex-col xl:flex-row">
          <div className="w-full xl:w-1/2 flex min-h-[50vh] xl:min-h-screen justify-center items-center px-6 py-10 lg:py-0">
            <p className="text-base sm:text-xl lg:text-3xl font-black text-center lg:text-left font-handwritten">
              ah tell uv I have it <br /> a cavnival tabanka
            </p>
          </div>
          <div className="w-full xl:w-1/2 flex z-10 min-h-[50vh] xl:min-h-screen justify-center items-center px-6 py-10 lg:py-0">
            <h1
              className={`${kalufira.className} leading-tight sm:leading-[60px] lg:leading-[100px] text-5xl sm:text-7xl lg:text-[130px] text-center`}
            >
              <span className="block">DEAR</span>
              <span>BACCHANAL</span>
            </h1>
          </div>
        </div>
      </section>
    </>
  );
};

export default EigthPage;
