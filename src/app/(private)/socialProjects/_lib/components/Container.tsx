"use client";

import { Button } from "@/components/ui/Button";
import { PlusIcon } from "@heroicons/react/24/outline";
import { SocialProjectsTable } from "./SocialProjectsTable";

export function Container() {
  return (
    <div className="pt-8 px-4 pb-4 md:pb-14 w-[80rem] h-full max-w-full flex flex-col md:gap-6 gap-4">
      <div className="flex justify-between items-center">
        <h1 className="font-semibold text-2xl leading-[1.8rem] text-[#18181B]">
          Serviços
        </h1>

        <Button
          type="button"
          className="inline-flex gap-[0.625rem] items-center justify-center"
          onClick={() => {
            console.log("wip: create social project");
          }}
        >
          <>
            <span>Adicionar serviço</span>
            <PlusIcon className="!size-[1.3125rem]" />
          </>
        </Button>
      </div>

      <SocialProjectsTable />
    </div>
  );
}
