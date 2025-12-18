"use client";


import { useEffect, useRef } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const InsideYourBook = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLDivElement>(null);

  const images = [
    { src: "/spread-1.jpg", title: "Capturing the Dance", subtitle: "Monday | Parade" },
    { src: "/spread-2.jpg", title: "The Street Party", subtitle: "Tuesday | Celebrations" },
    { src: "/spread-3.jpg", title: "Jouvert Morning", subtitle: "Paint | Powder | Joy" },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title fade in
      gsap.fromTo(
        titleRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 85%",
          },
        }
      );

      // Images horizontal scroll effect on mobile, stagger on desktop
      const imageItems = imagesRef.current?.querySelectorAll(".image-item");
      if (imageItems) {
        imageItems.forEach((item, index) => {
          const direction = index % 2 === 0 ? -50 : 50;
          
          gsap.fromTo(
            item,
            { 
              x: direction,
              opacity: 0,
              rotate: index % 2 === 0 ? -5 : 5,
            },
            {
              x: 0,
              opacity: 1,
              rotate: 0,
              duration: 1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: item,
                start: "top 85%",
              },
            }
          );

          // Parallax on images
          gsap.to(item.querySelector("img"), {
            yPercent: -15,
            ease: "none",
            scrollTrigger: {
              trigger: item,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          });
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className=" bg-secondary py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div ref={titleRef} className="text-center mb-20">
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-secondary-foreground">
            INSIDE YOUR BOOK
          </h2>
          <p className="font-body text-secondary-foreground/80 mt-4 max-w-xl mx-auto">
            The best moments from your carnival, beautifully laid out across premium pages
          </p>
        </div>

        {/* Horizontal Scroll Gallery */}
        <div
          ref={imagesRef}
          className="flex flex-col lg:flex-row gap-8 lg:gap-6 max-w-7xl mx-auto"
        >
          {images.map((image, index) => (
            <div
              key={index}
              className={`image-item flex-1 group ${
                index === 1 ? "lg:-mt-8" : ""
              }`}
            >
              <div className="relative aspect-[5/5] rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={image.src}
                  alt={image.title}
                  className="w-full h-[120%] object-cover"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />
                
                {/* Caption */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="font-display text-2xl text-black">
                    {image.title}
                  </h3>
                  <p className="font-handwritten text-xl text-black/80">
                    {image.subtitle}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InsideYourBook;