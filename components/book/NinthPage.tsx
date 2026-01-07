import { kalufira } from "./Font";
import Image from "next/image";

const NinthPage = () => {
  return (
    <>
      {/* Ninth Page */}
      <section className="bg-[#d13430] min-h-screen w-full relative overflow-hidden">
        <div className="absolute -bottom-4 sm:-bottom-6 lg:-bottom-10 h-[300px] sm:h-[450px] lg:h-[600px] w-full">
          <Image
            src="/assets/layer-14.png"
            alt="Overlay"
            fill
            className="object-cover pointer-events-none"
            priority
          />
        </div>
        <div className="flex flex-col xl:flex-row min-h-screen">
          <div className="w-full xl:w-1/2 px-6 sm:px-8 lg:pl-10 z-10 flex flex-col justify-start items-center py-10 xl:py-0">
            <h1
              className={`text-4xl sm:text-6xl lg:text-[90px] ${kalufira.className} text-center lg:text-left`}
            >
              THE GREATEST
            </h1>
            <div className="mt-4 sm:mt-6 lg:mt-8 text-center lg:text-left">
              <p className=" font-handwritten font-black  text-2xl lg:text-3xl mb-2">
                ✓ Vibes
              </p>
              <p className=" font-handwritten font-black  text-2xl lg:text-3xl mb-2">
                ✓ Costume from ya band
              </p>
              <p className=" font-handwritten font-black  text-2xl lg:text-3xl mb-2">
                ✓ Fete-in time
              </p>
            </div>
          </div>
          <div className="w-full xl:w-1/2 px-6 sm:px-8 xl:px-0 z-10 flex flex-col justify-start items-center py-10 xl:py-0">
            <h1
              className={`text-4xl sm:text-6xl lg:text-[90px] ${kalufira.className} text-center lg:text-left`}
            >
              SHOW ON EARTH
            </h1>
            <div className="mt-4 sm:mt-6 lg:mt-8 text-center lg:text-left">
              <p className=" font-handwritten font-black  text-2xl lg:text-3xl mb-2">
                ✓ Friends
              </p>
              <p className=" font-handwritten font-black  text-2xl lg:text-3xl mb-2">
                ✓ Soca tunes loaded
              </p>
              <p className=" font-handwritten font-black  text-2xl lg:text-3xl mb-2">
                ✓ Waist veady to wine
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default NinthPage;
