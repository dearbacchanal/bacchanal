import Image from "next/image";
import React from "react";

const FirstPage = () => {
  return (
    <>
      {/* First Page */}
      <section className="relative min-h-screen bg-[#D23431] w-full overflow-hidden">
        <Image
          src="/assets/layer-2.png"
          alt="Layer background"
          width={1300}
          height={800} // adjust if needed
          className="absolute bottom-0 right-0"
          priority
        />
      </section>
    </>
  );
};

export default FirstPage;
