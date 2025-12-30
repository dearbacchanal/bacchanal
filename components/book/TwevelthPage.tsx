import Image from "next/image";
import { ImageBox } from "../ui/ImageBox";
import { TextInput } from "../ui/TextInput";

const TwelfthPage = () => {
  return (
    <>
      {/* Twelfth Page */}
      <section className="relative min-h-screen w-full">
        <Image
          src="/assets/layer-16.png"
          alt="Overlay"
          fill
          className="object-cover absolute pointer-events-none"
          priority
        />

        <div className="flex flex-col lg:flex-row">
          <div className="w-full lg:w-1/2 min-h-[50vh] lg:min-h-screen z-10 flex flex-col items-center gap-10 sm:gap-14 lg:gap-20 px-4 sm:px-6 lg:px-8 py-10 lg:py-0 justify-center">
            <div>
              <h1 className="font-bold leading-none text-center">
                {/* W */}
                <span
                  className="text-[#eeb33a] text-6xl sm:text-8xl lg:text-[130px]"
                  style={{
                    WebkitTextStroke: "2px white",
                  }}
                >
                  W
                </span>

                {/* E */}
                <span className="text-3xl sm:text-4xl lg:text-6xl">E</span>

                {/* L */}
                <span
                  className="text-[#eeb33a] ms-4 sm:ms-6 lg:ms-10 inline-block text-6xl sm:text-8xl lg:text-[130px] rotate-[30deg]"
                  style={{
                    WebkitTextStroke: "2px white",
                  }}
                >
                  L
                </span>

                {/* imin */}
                <span className="text-3xl sm:text-4xl lg:text-6xl">imin</span>
              </h1>

              <p className="font-handwritten text-base sm:text-xl lg:text-3xl font-bold text-center mt-4 sm:mt-6">
                Tvinidadian slang (pronounced lime-in) means to hang out in
                velaxed leisuvely manner, often with food, dvinks and music
                without specific agenda.
              </p>
            </div>
            <div className="w-full max-w-md lg:max-w-[550px]">
              <p className="text-sm sm:text-base lg:text-lg mb-2">
                My drink of choice this Carnival:
              </p>
              <p className="text-sm sm:text-base lg:text-lg mb-2">
                Who I limed with the most:
              </p>
              <p className="text-sm sm:text-base lg:text-lg mb-2">
                I spent this epic time with:
              </p>
              <p className="text-sm sm:text-base lg:text-lg mb-2">
                The best part of Carnival I'll be telling stories about for
                years:
              </p>
              <div className="mt-4">
                <TextInput
                  fieldId="drink-choice"
                  className="bg-transparent border-0 border-b-2 border-white text-white placeholder-white focus:outline-none focus:border-white block w-full py-2 text-sm sm:text-base"
                />
                <TextInput
                  fieldId="limed-with"
                  className="bg-transparent border-0 border-b-2 border-white text-white placeholder-white focus:outline-none focus:border-white w-full block py-2 text-sm sm:text-base"
                />
                <TextInput
                  fieldId="spent-time-with"
                  className="bg-transparent border-0 border-b-2 border-white text-white placeholder-white focus:outline-none focus:border-white w-full block py-2 text-sm sm:text-base"
                />
                <TextInput
                  fieldId="best-part"
                  className="bg-transparent border-0 border-b-2 border-white text-white placeholder-white focus:outline-none focus:border-white w-full block py-2 text-sm sm:text-base"
                />
              </div>
            </div>
          </div>
          <div className="w-full lg:w-1/2 min-h-[50vh] lg:min-h-screen flex flex-col justify-center items-center z-10 py-10 lg:py-0">
            <ImageBox id="box-12-1" rotation="rotate-[0deg]" size="portrait-large" placeholderText="Place Image" />
          </div>
        </div>
      </section>
    </>
  );
};

export default TwelfthPage;
