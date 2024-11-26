"use client";

import { Button } from "@/components/ui/Button";
import { PlusIcon } from "@heroicons/react/24/outline";
import { PrivateSection } from "@/components/PrivateSection";
import Link from "next/link";
import { SocialServicesTable } from "./SocialServicesTable";

export function Container() {
  return (
    <PrivateSection>
      <div className="flex justify-between items-center">
        <h1 className="font-semibold text-[1rem] md:text-[1.5rem] leading-[1.33rem] md:leading-[1.8rem] text-[#18181B]">
          Serviços
        </h1>

        <Link href="/socialServices/create">
          <Button
            type="button"
            className="inline-flex gap-[0.625rem] items-center justify-center"
          >
            <>
              <span>Adicionar serviço</span>
              <PlusIcon className="!size-[1.3125rem]" />
            </>
          </Button>
        </Link>
      </div>

      <SocialServicesTable />
    </PrivateSection>
  );
}
