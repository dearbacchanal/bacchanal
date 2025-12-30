import Image from "next/image";
import { ImageBox } from "../ui/ImageBox";

const SeventhPage = () => {
  return (
    <>
      {/* Seventh Page */}
      <section className="bg-[#fbba00] relative overflow-hidden w-full min-h-screen">
        <Image
          src="/assets/layer-11.png"
          alt="Overlay"
          fill
          className="object-cover pointer-events-none"
          priority
        />

        <div className="flex  flex-col lg:flex-row">
          <div className="p-4 sm:p-6 lg:p-10 w-full lg:w-1/2">
            <div className="flex gap-4 sm:gap-6 lg:gap-10 flex-wrap justify-center lg:justify-center">
              <ImageBox id="box-7-left-1" rotation="rotate-[0deg]" size="xlarge" />
              <ImageBox id="box-7-left-2" rotation="rotate-[7deg]" size="xlarge" />
            </div>
            <div className="flex gap-4 sm:gap-6 lg:gap-10 mt-6 sm:mt-8 lg:mt-10 flex-wrap justify-center lg:justify-center">
              <ImageBox id="box-7-left-3" rotation="rotate-[5deg]" size="xlarge" />
              <ImageBox id="box-7-left-4" rotation="rotate-[-6deg]" size="xlarge" />
            </div>
          </div>
          <div className="p-4 sm:p-6 lg:p-10 w-full lg:w-1/2">
            <div className="flex gap-4 sm:gap-6 lg:gap-10 flex-wrap justify-center lg:justify-start">
              <ImageBox id="box-7-right-1" rotation="rotate-[-2deg]" size="xlarge" />
              <ImageBox id="box-7-right-2" rotation="rotate-[0deg]" size="xlarge" />
            </div>
            <div className="flex gap-4 sm:gap-6 lg:gap-10 mt-6 sm:mt-8 lg:mt-10 flex-wrap justify-center lg:justify-start">
              <ImageBox id="box-7-right-3" rotation="rotate-[5deg]" size="xlarge" />
              <ImageBox id="box-7-right-4" rotation="rotate-[-6deg]" size="xlarge" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SeventhPage;
