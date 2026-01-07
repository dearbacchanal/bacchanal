import Image from "next/image";
import { ImageBox } from "../ui/ImageBox";

const SixthPage = () => {
  return (
    <>
      {/* Sixth Page */}
      <section className="relative overflow-hidden bg-[#d22e56] min-h-screen w-full pt-10 sm:pt-14 lg:pt-20">
        <Image
          src="/assets/layer-10.png"
          alt="Overlay"
          fill
          className="object-cover pointer-events-none"
          priority
        />

        <div className="flex flex-col xl:flex-row px-4 sm:px-6 lg:px-0">
          <div className="relative w-full xl:w-1/2 min-h-[400px] sm:min-h-[500px] lg:min-h-[600px] mb-8 lg:mb-0">
            {/* Box 1 - Horizontal */}
            <div className="left-4 sm:left-10 lg:left-20 absolute top-0">
              <ImageBox id="box-6-left-1" rotation="rotate-[-3deg]" size="horizontal" showWhiteBar={false} />
            </div>
            {/* Box 2 - Vertical Left */}
            <div className="top-40 sm:top-60 lg:top-80 left-4 sm:left-10 lg:left-20 absolute">
              <ImageBox id="box-6-left-2" rotation="rotate-[-3deg]" size="vertical" showWhiteBar={false} />
            </div>
            {/* Box 3 - Vertical Right */}
            <div className="top-40 sm:top-60 lg:top-80 right-10 sm:right-20 lg:right-40 absolute">
              <ImageBox id="box-6-left-3" rotation="rotate-[6deg]" size="vertical" showWhiteBar={false} />
            </div>
          </div>
          <div className="relative w-full xl:w-1/2 min-h-[400px] sm:min-h-[500px] lg:min-h-[600px]">
            {/* Box 1 - Tall Vertical */}
            <div className="left-4 sm:left-10 lg:left-20 absolute top-0">
              <ImageBox id="box-6-right-1" rotation="rotate-[-3deg]" size="tall-vertical" showWhiteBar={false} />
            </div>
            {/* Box 2 - Top Right */}
            <div className="top-4 sm:top-6 lg:top-10 right-10 sm:right-20 lg:right-40 absolute">
              <ImageBox id="box-6-right-2" rotation="rotate-[-3deg]" size="vertical" showWhiteBar={false} />
            </div>
            {/* Box 3 - Bottom Right */}
            <div className="top-40 sm:top-60 lg:top-80 right-10 sm:right-20 lg:right-40 absolute">
              <ImageBox id="box-6-right-3" rotation="rotate-[6deg]" size="vertical" showWhiteBar={false} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SixthPage;
