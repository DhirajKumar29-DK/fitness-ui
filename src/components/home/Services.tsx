"use client";

import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { homeData } from "@/data/dummy";
import { ArrowRight, ChevronLeft, ChevronRight, Dumbbell, PersonStanding, HeartPulse, Utensils, Activity, MonitorSmartphone } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const IconMap: Record<string, React.ElementType> = {
  Dumbbell,
  PersonStanding,
  HeartPulse,
  Utensils,
  Activity,
  MonitorSmartphone,
};

export function Services() {
  const { services } = homeData;
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, align: "start", dragFree: true });
  
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index: number) => emblaApi && emblaApi.scrollTo(index), [emblaApi]);

  const onInit = useCallback((emblaApi: any) => {
    setScrollSnaps(emblaApi.scrollSnapList());
  }, []);

  const onSelect = useCallback((emblaApi: any) => {
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onInit(emblaApi);
    onSelect(emblaApi);
    emblaApi.on("reInit", onInit);
    emblaApi.on("reInit", onSelect);
    emblaApi.on("select", onSelect);
  }, [emblaApi, onInit, onSelect]);

  return (
    <section id="services" className="py-12 bg-[#030303] relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-12 relative z-10 max-w-[1440px]">
        
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-4 mb-3">
            <div className="h-[1px] w-8 bg-white/20"></div>
            <span className="text-primary text-[10px] font-bold tracking-[0.3em] uppercase">
              {services.badge}
            </span>
            <div className="h-[1px] w-8 bg-white/20"></div>
          </div>
          
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight uppercase mb-3 tracking-tight">
            {services.headingLine1} <span className="text-primary">{services.headingLine2}</span>
          </h2>
          
          <p className="text-zinc-400 text-sm max-w-2xl mx-auto font-medium leading-relaxed">
            {services.description}
          </p>
        </div>

        {/* Carousel Section */}
        <div className="relative group mt-6">
          <div className="overflow-hidden px-2 md:px-4 py-2" ref={emblaRef}>
            <div className="flex gap-4">
              {services.items.map((item) => {
                const Icon = IconMap[item.icon] || Activity;
                return (
                  <div 
                    key={item.id} 
                    className="flex-[0_0_100%] sm:flex-[0_0_50%] md:flex-[0_0_33.33%] lg:flex-[0_0_25%] min-w-0"
                  >
                    <div className="h-[460px] rounded-lg overflow-hidden bg-black group/card cursor-pointer flex flex-col relative shadow-2xl transition-all duration-500 hover:-translate-y-2">
                      
                      {/* Background Image filling the card */}
                      <img 
                        src={item.image} 
                        alt={item.title}
                        className="absolute inset-0 w-full h-full object-cover opacity-60 transition-all duration-700 group-hover/card:scale-110 group-hover/card:opacity-80 grayscale group-hover/card:grayscale-0"
                      />
                      
                      {/* Premium Deep Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent opacity-90 transition-opacity duration-500 group-hover/card:opacity-100" />

                      {/* Content overlay */}
                      <div className="relative h-full flex flex-col items-center justify-end px-5 pb-8 z-10">
                        
                        {/* Premium Glowing Icon */}
                        <div className="w-12 h-12 rounded-full border border-primary/50 flex items-center justify-center text-primary mb-5 bg-black/50 backdrop-blur-md transition-all duration-500 group-hover/card:border-primary group-hover/card:shadow-[0_0_20px_rgba(163,230,53,0.3)] group-hover/card:scale-110">
                          <Icon className="w-5 h-5" />
                        </div>

                        <h3 className="text-white text-[17px] font-black text-center uppercase tracking-widest mb-3 drop-shadow-md transition-colors duration-300 group-hover/card:text-white">
                          {item.title}
                        </h3>
                        
                        <p className="text-zinc-300 text-[13px] text-center mb-6 leading-[1.6] font-medium max-w-[90%] mx-auto opacity-80 group-hover/card:opacity-100 transition-opacity duration-300">
                          {item.description}
                        </p>

                        <span className="text-primary text-[11px] font-black tracking-[0.2em] uppercase flex items-center gap-2 group-hover/card:gap-3 transition-all duration-300">
                          EXPLORE <ArrowRight className="w-3.5 h-3.5" />
                        </span>

                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Premium Floating Navigation Arrows */}
          <button
            onClick={scrollPrev}
            disabled={prevBtnDisabled}
            className="absolute top-1/2 -left-2 md:-left-4 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center justify-center disabled:opacity-0 transition-all z-20 hover:bg-primary hover:text-black hover:border-primary hover:scale-110"
          >
            <ChevronLeft className="w-4 h-4 stroke-[3]" />
          </button>
          <button
            onClick={scrollNext}
            disabled={nextBtnDisabled}
            className="absolute top-1/2 -right-2 md:-right-4 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center justify-center disabled:opacity-0 transition-all z-20 hover:bg-primary hover:text-black hover:border-primary hover:scale-110"
          >
            <ChevronRight className="w-4 h-4 stroke-[3]" />
          </button>
        </div>

        {/* Premium Dots */}
        <div className="flex justify-center gap-2 mt-8 mb-10">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={`h-1 rounded-full transition-all duration-500 ${
                index === selectedIndex ? "bg-primary w-6" : "bg-white/20 w-1 hover:bg-white/40"
              }`}
            />
          ))}
        </div>

        {/* Premium Outline CTA */}
        <div className="flex justify-center">
          <Link
            href="/#contact"
            className="group inline-flex items-center justify-center h-12 px-8 bg-transparent border border-white/20 text-white text-[11px] font-black tracking-widest uppercase transition-all duration-300 hover:bg-primary hover:border-primary hover:text-black hover:shadow-[0_0_30px_rgba(163,230,53,0.3)] rounded-[4px]"
          >
            {services.cta} <ArrowRight className="ml-3 h-3 w-3 transition-transform group-hover:translate-x-2" />
          </Link>
        </div>

      </div>
    </section>
  );
}
