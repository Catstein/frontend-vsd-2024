"use client";

import { Badge } from "@/components/ui/Badge";
import Image from "next/image";
import { useEffect, useRef } from "react";

export function PartnersSection() {
  const partnerContainerRef = useRef<HTMLDivElement>(null);

  function continuousScroll() {
    const scrollableDiv = partnerContainerRef.current;

    const scrollAmount = 1;
    let scrollDirection = 1;

    const scroll = () => {
      if (scrollableDiv !== null) {
        scrollableDiv.scrollLeft += scrollAmount * scrollDirection;

        if (
          scrollableDiv.scrollLeft >=
          scrollableDiv.scrollWidth - scrollableDiv.clientWidth
        ) {
          scrollDirection = -1;
        } else if (scrollableDiv.scrollLeft <= 0) {
          scrollDirection = 1;
        }

        requestAnimationFrame(scroll);
      }
    };

    scroll();
  }

  useEffect(() => {
    continuousScroll();
  }, []);

  return (
    <section className="flex flex-col pt-[7rem] pb-[8.5rem] px-[2rem] md:px-[2rem] max-md:py-[2rem] gap-[4.5rem] items-center">
      <div className="flex flex-col w-[50rem] max-w-full gap-[1rem] items-center">
        <div className="flex flex-col w-full gap-[0.5rem] items-center">
          <div>
            <Badge className="bg-[#FFFFFF]">Juntos na jornada</Badge>
          </div>

          <h1 className="max-md:leading-[1.8rem] max-md:text-[1.5rem] font-semibold text-[2rem] leading-[2.4rem]  text-[#18181B]">
            Nossos parceiros
          </h1>
        </div>

        <p className="font-normal text-[1rem] leading-[1.5rem] text-[#51525C]">
          Juntos, construindo uma rede de apoio que ajuda a garantir um futuro
          para nossas crianças.
        </p>
      </div>
      <div
        ref={partnerContainerRef}
        className="block overflow-x-scroll hiddenScroll whitespace-nowrap"
      >
        <a target="_blank" href="https://pecege.com/">
          <Image
            src="/partners/pcg-logo.svg"
            alt="Logo do conselho tutelar de piracicaba"
            className="inline-flex mx-[1rem] !h-auto !w-[10.9375rem]"
            width={0}
            height={0}
          />
        </a>
        <a target="_blank" href="https://www.atepi.com.br/">
          <Image
            src="/partners/atepi-logo.svg"
            alt="Logo do conselho tutelar de piracicaba"
            className="inline-flex mx-[1rem] !h-auto !w-[10.9375rem]"
            width={0}
            height={0}
          />
        </a>
        <a target="_blank" href="https://www.devpira.com.br/">
          <Image
            src="/partners/devpira-logo.svg"
            alt="Logo do conselho tutelar de piracicaba"
            className="inline-flex mx-[1rem] !h-auto !w-[10.9375rem]"
            width={0}
            height={0}
          />
        </a>

        <a target="_blank" href="https://stack2u.net/">
          <Image
            src="/partners/stack-2u-logo.png"
            alt="Logo do conselho tutelar de piracicaba"
            className="inline-flex mx-[1rem] object-contain !h-auto !w-[10.9375rem]"
            width={175}
            height={70}
          />
        </a>
      </div>
    </section>
  );
}
