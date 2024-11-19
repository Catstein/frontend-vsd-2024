import Image from "next/image";
import { LoginForm } from "./LoginForm";

export function Card() {
  return (
    <div className="flex flex-col items-center max-w-full w-[37rem] h-min rounded-[0.5rem] bg-[#FFFFFF] p-[2rem] gap-6">
      <Image
        src={"/logo.png"}
        alt="Logo do conselho tutelar de piracicaba"
        className="h-[4.875rem] w-auto max-md:h-[3.5rem]"
        width={100}
        height={100}
      />

      <div className="flex flex-col w-full h-min gap-6">
        <div className="flex w-full h-min gap-1 flex-col">
          <h1 className="font-semibold text-xl leading-[1.6625rem] text-center text-[#18181B]">
            Boas vindas
          </h1>

          <p className="font-normal text-sm leading-[1.3125rem] text-center text-[#51525C]">
            Entre com seu email e senha
          </p>
        </div>

        <LoginForm />
      </div>
    </div>
  );
}
