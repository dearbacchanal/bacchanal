import Image from 'next/image'
import React from 'react'

const EleventhPage = () => {
  return (
    <>
       {/* Eleventh Page */}
            <section className="relative min-h-screen w-full">
              <Image
                src="/assets/layer-15.png"
                alt="Overlay"
                fill
                className="object-cover absolute pointer-events-none"
                priority
              />
            </section>
    </>
  )
}

export default EleventhPage
