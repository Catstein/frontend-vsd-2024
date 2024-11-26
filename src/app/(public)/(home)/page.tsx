import { Badge } from "@/components/ui/Badge";
import { EnvelopeIcon, PhoneIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { AboutSection } from "./_lib/components/AboutSection";
import { ContactCard } from "./_lib/components/ContactCard";
import { RequestContainer } from "./_lib/components/RequestContainer";

export default function Home() {
  return (
    <div className="flex w-full h-full bg-[#F4F4F5] flex-col">
      <RequestContainer />

      <AboutSection />

      {/* contact */}
      <section className="flex px-[1rem] md:px-[2rem] max-md:py-[2rem] pb-[4.5rem] justify-center bg-[#FFFFFF]">
        <div className="flex flex-col w-[50rem] max-w-full gap-[2rem]">
          <div className="flex flex-col w-full gap-[2rem]">
            <h1 className="max-md:leading-[1.8rem] max-md:text-[1.5rem] font-semibold text-[2rem] leading-[2.4rem]  text-[#18181B]">
              Entre em contato
            </h1>

            <p className="font-normal text-[1rem] leading-[1.5rem] text-[#51525C]">
              Entre em contato conosco para mais informações
            </p>
          </div>

          <div className="flex w-full flex-wrap gap-[2rem]">
            <ContactCard
              icon={PhoneIcon}
              title={"Telefone"}
              text={"(61) 9 8582-5417"}
            />
            <ContactCard
              icon={EnvelopeIcon}
              title={"E-mail"}
              text={"conselhodepiracicaba@gmail.com"}
            />
          </div>
        </div>
      </section>

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
        <div className="flex w-full flex-wrap gap-[2rem] justify-center">
          <Image
            src={"/pcg-logo.svg"}
            alt="Logo do conselho tutelar de piracicaba"
            className="!h-auto !w-[10.9375rem]"
            width={0}
            height={0}
          />
        </div>
      </section>

      <section className="flex pt-[6.5rem] pb-[2rem] bg-[#FFFFFF] gap-[4rem] justify-center">
        <div className="w-[54.5625rem] flex gap-12 md:justify-center flex-wrap max-md:flex-col max-md:items-center">
          <div className="max-w-full w-[16.1875rem]  leading-[1.52rem]">
            <span className="text-[#18181B] text-[1rem] leading-[1.33rem] font-semibold">
              Conselho Tutelar I
            </span>
            <p className="text-[#51525C] text-[0.875rem] leading-[1.1.3125rem] font-normal">
              Endereço: Rua José Ferraz de Carvalho, 320, Centro.
              <br />
              Telefone: (19) 3422-9026 / 3432-5775
              <br />
              E-mail: conselho­tutelar1@piracicaba.sp.gov.br
            </p>
          </div>

          <div className="max-w-full w-[16.1875rem]  leading-[1.52rem]">
            <span className="text-[#18181B] text-[1rem] leading-[1.33rem] font-semibold">
              Conselho Tutelar II
            </span>
            <p className="text-[#51525C] text-[0.875rem] leading-[1.1.3125rem] font-normal">
              Endereço: Avenida Dr. João Teodoro, 360, Vila Rezende.
              <br />
              Telefone: (19) 3421-8962 / 3413-5497
              <br />
              E-mail: conselhotutelar2@piracicaba.sp.gov.br
            </p>
          </div>

          <div className="max-w-full w-[16.1875rem]  leading-[1.52rem]">
            <span className="text-[#18181B] text-[1rem] leading-[1.33rem] font-semibold">
              Conselho Tutelar III
            </span>
            <p className="text-[#51525C] text-[0.875rem] leading-[1.1.3125rem] font-normal">
              Endereço: Rua Cel. João Mendes Pereira de Almeida, 200, Nova
              América.
              <br />
              Telefone: (19) 3435-4646 / 3411-1450
              <br />
              E-mail: conselhotutelar3@piracicaba.sp.gov.br
            </p>
          </div>
        </div>
      </section>

      <section className="flex w-full bg-[#FFFFFF] px-[2rem] pb-[2rem]">
        <div className="flex flex-wrap w-full border-[#D1D1D6] border-t-[0.125rem] pt-[2rem] max-md:justify-center justify-between items-end max-md:gap-[2rem]">
          <div className="flex gap-4 items-center max-md:w-[full]">
            <Image
              src={"/logo.png"}
              alt="Logo do conselho tutelar de piracicaba"
              className="h-[2.625rem] w-auto"
              width={100}
              height={100}
            />

            <div className="border-l-[0.0625rem] border-[#D1D1D6] h-[2.625rem]" />

            <h1 className="antialiased font-semibold text-[0.875rem] md:text-base leading-[1.125rem] md:leading-[1.33rem] text-[#18181B]">
              Conselho Tutelar de Piracicaba
            </h1>
          </div>

          <p className="text-[#18181B] text-[0.875rem] leading-[1.1.3125rem] font-normal">
            Criado por Vem Ser Dev 2024
          </p>
        </div>
      </section>
    </div>
  );
}
