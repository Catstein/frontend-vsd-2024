import { EnvelopeIcon, PhoneIcon } from "@heroicons/react/24/outline";
import { ContactCard } from "./ContactCard";

export function ContactSection() {
  return (
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

        <div className="flex w-full max-md:flex-wrap gap-[2rem] overflow-x-scroll">
          <ContactCard
            icon={PhoneIcon}
            title={"Telefone"}
            text={"(19) 3422-9026 / 3432-5775"}
          />
          <ContactCard
            icon={EnvelopeIcon}
            title={"E-mail"}
            text={"conselho­tutelar1@piracicaba.sp.gov.br"}
          />
        </div>
      </div>
    </section>
  );
}
