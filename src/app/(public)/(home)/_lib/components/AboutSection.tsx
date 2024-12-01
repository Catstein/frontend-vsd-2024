import { Badge } from "@/components/ui/Badge";
import Image from "next/image";

export function AboutSection() {
  return (
    <section className="max-md:px-[1rem] p-[2rem] flex justify-center bg-[#FFFFFF]">
      <div className="flex flex-col max-w-full w-[50rem] py-[4.5rem] max-md:py-0 justify-center gap-12">
        <div className="flex gap-[2rem] flex-col w-full">
          <div>
            <Badge>Sobre o Conselho Tutelar de Piracicaba</Badge>
          </div>

          <div className="flex flex-col gap-6 w-full">
            <h1 className="font-semibold text-[1.5rem] leading-[1.8rem] text-[#18181B]">
              Protegendo as crianças, fortalecendo a comunidade
            </h1>

            <p className="max-md:text-base max-md:leading-[1.5rem] font-normal text-[1.25rem] leading-[1.875rem] text-[#51525C]">
              O Conselho Tutelar de Piracicaba existe para garantir que os
              direitos das crianças e adolescentes sejam cumpridos, oferecendo
              suporte e proteção para que possam viver com dignidade e
              segurança.
            </p>
          </div>
        </div>

        <Image
          src={"/main-page-banner.jpg"}
          alt="Logo do conselho tutelar de piracicaba"
          className="!h-auto !w-full rounded-[1.206875rem]"
          width={800}
          height={340}
        />
      </div>
    </section>
  );
}
