import Image from "next/image";
import { ImageBox } from "../ui/ImageBox";

const FifthPage = () => {
  return (
    <>
      {/* Fifth Page */}
      <section className="relative min-h-screen w-full overflow-hidden flex flex-col lg:flex-row">
        <div className="w-full lg:w-1/2 bg-[#fbba00] relative flex justify-center pt-8 sm:pt-10 lg:pt-14 min-h-[50vh] lg:min-h-screen">
          <Image
            src="/assets/layer-9.png"
            alt="Layer background"
            width={900}
            height={500}
            className="absolute w-full h-[300px] sm:h-[400px] lg:h-[500px] bottom-0 left-0"
            priority
          />

          <div className="p-4 sm:p-6 lg:p-10 z-10">
            <div className="flex gap-4 sm:gap-6 lg:gap-10 flex-wrap justify-center lg:justify-start">
              <ImageBox id="box-5-cultural-1" rotation="rotate-[7deg]" />
              <ImageBox id="box-5-cultural-2" rotation="rotate-[-9deg]" />
              <ImageBox id="box-5-cultural-3" rotation="rotate-[-4deg]" />
            </div>
            <div className="flex justify-center gap-4 sm:gap-6 lg:gap-10 mt-6 sm:mt-8 lg:mt-10">
              <ImageBox id="box-5-cultural-4" rotation="rotate-[-9deg]" />
              <ImageBox id="box-5-cultural-5" rotation="rotate-[6deg]" />
            </div>
          </div>
          <h1 className="absolute text-[#d13430] text-4xl sm:text-5xl lg:text-[80px] leading-tight sm:leading-tight lg:leading-[70px] bottom-2 sm:bottom-4 lg:bottom-0 right-4 sm:right-6 lg:right-10 ">
            CULTUAL <span className="block">EVENTS</span>
          </h1>
        </div>
        <div className="w-full lg:w-1/2 bg-[#143951] relative flex justify-center pt-8 sm:pt-10 lg:pt-14 min-h-[50vh] lg:min-h-screen">
          {/* Overlay Image */}
          <Image
            src="/assets/layer-7.png"
            alt="Overlay"
            fill
            className="object-cover pointer-events-none"
            priority
          />
          <Image
            src="/assets/layer-8.png"
            alt="Layer background"
            width={350}
            height={350}
            className="absolute object-contain bottom-0 right-0 w-48 sm:w-64 lg:w-[350px] h-48 sm:h-64 lg:h-[350px]"
            priority
          />

          <div className="p-4 sm:p-6 lg:p-10 z-10">
            <div className="flex gap-4 sm:gap-6 lg:gap-10 flex-wrap justify-center lg:justify-start">
              <ImageBox id="box-5-jouvert-1" rotation="rotate-[7deg]" />
              <ImageBox id="box-5-jouvert-2" rotation="rotate-[-9deg]" />
              <ImageBox id="box-5-jouvert-3" rotation="rotate-[8deg]" />
            </div>
            <div className="flex justify-start gap-4 sm:gap-6 lg:gap-10 mt-6 sm:mt-8 lg:mt-10">
              <ImageBox id="box-5-jouvert-4" rotation="rotate-[-9deg]" size="large" />
            </div>
          </div>

          <h1 className="absolute text-[#007689] text-4xl sm:text-5xl lg:text-[80px] leading-tight sm:leading-tight lg:leading-[70px] bottom-2 sm:bottom-4 lg:bottom-0 left-4 sm:left-6 lg:left-10 ">
            JOUVERT
          </h1>
        </div>
      </section>
    </>
  );
};

export default FifthPage;
