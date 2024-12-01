import Image from "next/image";

export function FooterSection() {
  return (
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
  );
}
