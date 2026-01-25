
import Image from "next/image";

const FirstPage = () => {

  return (
    <>
      {/* First Page */}
      <section className="relative min-h-screen bg-[#D23431] w-full overflow-hidden">


        <Image
          src="/assets/layer-2.png"
          alt="Layer background"
          width={350}
          height={350} // adjust if needed
          className="absolute bottom-0 right-0 lg:min-h-[60%] min-w-[80%] "
          priority
        />
        <h1 className="relative z-10 text-white text-4xl md:text-6xl lg:text-[10vh]  max-w-5xl font-bold p-8 md:p-16 mt-32 md:mt-48">
          Thank you, Carnival 2026.
        </h1>

      </section>
    </>
  );
};

export default FirstPage;
