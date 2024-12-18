"use client";

import { EmptyState } from "@/components/EmptyState";
import { PaginationNav } from "@/components/PaginationNav";
import { ISocialService } from "@/models/entities/socialService";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { SocialServiceCard } from "./SocialServiceCard";

interface CardSectionProps {
  serviceList: Array<
    Pick<
      ISocialService,
      "uid" | "service_category" | "agent_name" | "agent_role"
    >
  >;
  isLoading: boolean;
  hasRequested: boolean;
  currentPage: number;
  totalPages: number;
  handleSetCurrentPage(newPageValue: number): void;
}

export function CardSection({
  serviceList,
  isLoading,
  hasRequested,
  currentPage,
  totalPages,
  handleSetCurrentPage,
}: CardSectionProps) {
  return (
    <section className="flex w-full justify-center">
      <div className="flex pt-[2rem] pb-[2.5rem] px-[2rem] max-w-full w-[80.3rem]">
        <div className="flex flex-col max-md:gap-4 gap-10 w-full">
          {hasRequested === true && isLoading === true && (
            <div className="mx-auto">Carregando...</div>
          )}

          {hasRequested === true &&
            isLoading === false &&
            serviceList.length === 0 && (
              <EmptyState
                icon={MagnifyingGlassIcon}
                title={"Busca não encontrada"}
                description={"Revise sua busca ou volte mais tarde"}
              />
            )}

          {isLoading === false && serviceList.length > 0 && (
            <>
              <p className="font-normal text-sm leading-[1.3125rem] text-[#51525C]">
                {serviceList.length ?? 0} profissionais e serviços disponíveis
              </p>

              <div className="gap-[2rem] flex w-full flex-wrap max-h-[35rem] overflow-y-scroll">
                {serviceList.map((currentService) => (
                  <SocialServiceCard
                    key={currentService.uid}
                    service={{
                      uid: currentService.uid,
                      agent_name: currentService.agent_name,
                      service_category: {
                        uid: currentService.service_category.uid,
                        name: currentService.service_category.name,
                        status: currentService.service_category.status,
                      },
                      agent_role: currentService.agent_role,
                    }}
                  />
                ))}
              </div>

              <PaginationNav
                currentPage={currentPage}
                totalPages={totalPages}
                handleSetCurrentPage={handleSetCurrentPage}
              />
            </>
          )}
        </div>
      </div>
    </section>
  );
}
