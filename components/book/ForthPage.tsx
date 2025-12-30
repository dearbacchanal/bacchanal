import Image from 'next/image'
import { kalufira } from './Font'

const ForthPage = () => {
  return (
    <>
      {/* Fourth page */}
            <section className="relative min-h-screen bg-[#D23431] w-full overflow-hidden flex flex-col lg:flex-row">
              <div className="w-full lg:w-1/2 pt-8 sm:pt-12 lg:pt-16 px-6 sm:px-8 lg:pl-10">
                <h1 className={`${kalufira.className} text-5xl sm:text-7xl lg:text-[200px] leading-tight sm:leading-tight lg:leading-[170px]`}>
                  <span className="">TELL</span>
                  <span className="text-black ">MEH</span>
                  <span className="text-white block ">
                    <span className="text-3xl sm:text-5xl lg:text-[120px]">You're</span> AH
                  </span>
                  <span className="text-black block text-6xl sm:text-8xl lg:text-[250px]">TRINI</span>
                </h1>
              </div>
              <div className="w-full lg:w-1/2 relative flex justify-start items-center px-6 sm:px-8 ">
                <Image
                  src="/assets/layer-4.png"
                  alt="Layer background"
                  width={250}
                  height={250}
                  className="absolute object-contain lg:top-[-50px]  left-0 w-32 sm:w-40 lg:w-[250px] h-32 sm:h-40 lg:h-[250px]"
                  priority
                />
                <Image
                  src="/assets/layer-5.png"
                  alt="Layer background"
                  width={250}
                  height={250}
                  className="absolute object-contain top-10 right-4 sm:right-6 lg:right-10 w-32 sm:w-40 lg:w-[250px] h-32 sm:h-40 lg:h-[250px]"
                  priority
                />
                <Image
                  src="/assets/layer-6.png"
                  alt="Layer background"
                  width={200}
                  height={200}
                  className="absolute object-contain bottom-0 right-0 w-24 sm:w-32 lg:w-[200px] h-24 sm:h-32 lg:h-[200px]"
                  priority
                />
                <div className=" mt-10 sm:mt-28 lg:mt-36 relative z-10">
                  <p className="text-sm sm:text-base lg:text-xl mb-2 sm:mb-2.5 lg:mb-3">✓ Maracas Bake & Shark</p>
                  <p className="text-sm sm:text-base lg:text-xl mb-2 sm:mb-2.5 lg:mb-3">✓ Went ah pan yard</p>
                  <p className="text-sm sm:text-base lg:text-xl mb-2 sm:mb-2.5 lg:mb-3">
                    ✓ Doubles with everything and slight peppah for the win
                  </p>
                  <p className="text-sm sm:text-base lg:text-xl mb-2 sm:mb-2.5 lg:mb-3">
                    ✓ Saw d Magnificent Seven while chippin round the Savannah
                  </p>
                  <p className="text-sm sm:text-base lg:text-xl mb-2 sm:mb-2.5 lg:mb-3">
                    ✓ Coconut water straight from d nut by the truck on the Savannah
                  </p>
                  <p className="text-sm sm:text-base lg:text-xl mb-2 sm:mb-2.5 lg:mb-3">✓ Limed on the Avenue</p>
                  <p className="text-sm sm:text-base lg:text-xl mb-2 sm:mb-2.5 lg:mb-3">
                    ✓ Rum must drink – Angostura, Forres Park, or Fernandez
                  </p>
                  <p className="text-sm sm:text-base lg:text-xl mb-2 sm:mb-2.5 lg:mb-3">
                    ✓ Beastly cold Stag or Carib in the hot sun
                  </p>
                  <p className="text-sm sm:text-base lg:text-xl mb-2 sm:mb-2.5 lg:mb-3">✓ Roti & a soft drink was lashinnn</p>
                  <p className="text-sm sm:text-base lg:text-xl mb-2 sm:mb-2.5 lg:mb-3">✓ Legs sore from all the winin'</p>
                  <p className="text-sm sm:text-base lg:text-xl mb-2 sm:mb-2.5 lg:mb-3">
                    ✓ Took a lil' escape – beach, DDI, waterfalls
                  </p>
                  <p className="text-sm sm:text-base lg:text-xl mb-2 sm:mb-2.5 lg:mb-3">✓ Snow cone</p>
                  <p className="text-sm sm:text-base lg:text-xl mb-2 sm:mb-2.5 lg:mb-3">✓ Unwind in Nylon Pool</p>
                </div>
              </div>
            </section>
    </>
  )
}

export default ForthPage