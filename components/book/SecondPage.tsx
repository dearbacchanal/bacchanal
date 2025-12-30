import Image from "next/image";
import { ImageBox } from "../ui/ImageBox";

const SecondPage = () => {
  return (
    <>
      {/* Second Page */}
      <section className="relative min-h-screen overflow-hidden py-10 sm:py-0">
        {/* Background Image */}
        <Image
          src="/assets/layer-1.png"
          alt="Background"
          fill
          priority
          className="object-cover -z-10"
        />
        <Image
          src="/assets/PawPaw.png"
          alt="Background"
          width={200}
          height={200}
          priority
          className="object-cover absolute right-0 bottom-0 w-32 h-32 sm:w-40 sm:h-40 lg:w-[200px] lg:h-[200px]"
        />

        {/* Content */}
        <div className="relative z-10 flex gap-6 sm:gap-8 lg:gap-10 flex-col justify-center items-center min-h-screen px-4">
          {/* First Row */}
          <div className="flex gap-4 sm:gap-8 lg:gap-16 mt-20 sm:mt-32 lg:mt-56 flex-wrap justify-center">
            <ImageBox id="box-1-1" rotation="rotate-[-5deg]" />
            <ImageBox id="box-1-2" rotation="rotate-[8deg]" />
            <ImageBox id="box-1-3" rotation="rotate-[-4deg]" />
            <ImageBox id="box-1-4" rotation="rotate-[-5deg]" />
            <ImageBox id="box-1-5" rotation="rotate-[8deg]" />
            <ImageBox id="box-1-6" rotation="rotate-[-3deg]" />
          </div>

          {/* Second Row */}
          <div className="flex gap-4 sm:gap-8 lg:gap-16 flex-wrap justify-center">
            <ImageBox id="box-2-1" rotation="rotate-[-5deg]" />
            <ImageBox id="box-2-2" rotation="rotate-[8deg]" />
            <ImageBox id="box-2-3" rotation="rotate-[-4deg]" />
            <ImageBox id="box-2-4" rotation="rotate-[-5deg]" />
            <ImageBox id="box-2-5" rotation="rotate-[8deg]" />
            <ImageBox id="box-2-6" rotation="rotate-[-3deg]" />
          </div>
        </div>
      </section>
    </>
  );
};

export default SecondPage;
