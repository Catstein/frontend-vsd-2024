"use client";

import { EmptyState } from "@/components/EmptyState";
import { Button } from "@/components/ui/Button";
import { PlusIcon } from "@heroicons/react/24/outline";

export function Container() {
  return (
    <div className="pt-8 px-4 pb-4 md:pb-14 w-[80rem] h-full max-w-full flex flex-col md:gap-6 gap-4">
      <h1 className="font-semibold text-2xl leading-[1.8rem] text-[#18181B]">
        Serviços
      </h1>

      <div className="flex flex-col justify-center max-w-full w-[80rem] h-full rounded-[0.5rem] bg-[#FFFFFF] p-8 gap-8">
        <EmptyState
          title="Não há serviços cadastrados"
          description="Adicione um novo serviço no botão abaixo."
        >
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
        </EmptyState>
      </div>
    </div>
  );
}
