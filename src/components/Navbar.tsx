"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { Button } from "./ui/Button";
import { useToken } from "@/contexts/useToken";

export function Navbar() {
  const pathname = usePathname();

  const dontNeedNavbar = pathname !== "/login";

  const { token, setToken } = useToken();

  console.log("pathname", pathname);
  console.log("here", token);

  return (
    dontNeedNavbar && (
      <nav className="flex w-full h-[5rem] bg-[#FFFFFF] items-center">
        <div className="px-8 flex justify-between w-full h-min">
          {/* content */}
          <div className="flex gap-4 items-center">
            <Image
              src={"/logo.png"}
              alt="Logo do conselho tutelar de piracicaba"
              className="h-[2.625rem] w-auto"
              width={100}
              height={100}
            />

            <div className="border-[1px] border-[#D1D1D6] h-[2.625rem]" />

            <h1 className="antialiased font-semibold text-xs md:text-base leading-[1.125rem] md:leading-[1.33rem] text-[#18181B]">
              Conselho Tutelar de Piracicaba
            </h1>
          </div>

          {token && (
            <Button
              type="button"
              variant="link"
              size="linkButton"
              onClick={() => {
                setToken("");
              }}
            >
              Sair
            </Button>
          )}
        </div>
      </nav>
    )
  );
}
