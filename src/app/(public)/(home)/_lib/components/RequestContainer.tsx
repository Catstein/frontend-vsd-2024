"use client";

import { ISocialService } from "@/models/entities/socialService";
import {
  findManyPublicSocialServices,
  PublicSocialServiceParams,
} from "@/services/socialServices/findManyPublicSocialServices";
import { useMemo, useState, useTransition } from "react";
import { CardSection } from "./CardSection";
import { SearchSocialServiceForm } from "./SearchSocialServiceForm";
import { useSearchParams } from "next/navigation";
import { ServiceModal } from "./ServiceModal";

export function RequestContainer() {
  const searchParams = useSearchParams();

  const currentModalOpen = useMemo(() => {
    return searchParams.get("socialService") !== null;
  }, [searchParams]);

  const [serviceList, setServiceList] = useState<
    Array<
      Pick<
        ISocialService,
        "uid" | "service_category" | "agent_name" | "agent_role"
      >
    >
  >([]);

  const requestPageSize = 10;

  const [hasRequested, setHasRequested] = useState(false);

  const [isLoadingSocialServices, startTransition] = useTransition();

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  function handleSetCurrentPage(newPageValue: number) {
    setCurrentPage(newPageValue);
  }

  const handleFindManyPublicSocialServices = (searchForm: {
    search?: string;
    categoryUid?: string;
  }) => {
    startTransition(async () => {
      setHasRequested(true);

      const metadata: PublicSocialServiceParams = {
        search: searchForm.search,
        categoryUid:
          searchForm.categoryUid === "1" ? undefined : searchForm.categoryUid,
        page: currentPage,
        pageSize: requestPageSize,
      };

      const res = await findManyPublicSocialServices({
        payload: metadata,
        config: {},
      });

      const currentTotalPages = Math.ceil(
        res.pagination.count / requestPageSize
      );

      setTotalPages(currentTotalPages);

      setServiceList(res.data);
    });
  };

  return (
    <>
      <summary className="flex w-full h-min pt-[6rem] pb-[2rem] px-[2rem] justify-center">
        <div className="flex flex-col max-w-full w-[60rem] gap-10">
          <div className="flex flex-col max-md:gap-2 gap-4">
            <h1 className="max-md:leading-[1.8rem] max-md:text-[1.5rem] font-semibold text-[3rem] leading-[3rem] text-center text-[#18181B]">
              O que você procura?
            </h1>
            <p className="max-md:text-sm max-md:leading-[1.3125rem] font-normal text-[1.25rem] leading-[1.875rem] text-center text-[#51525C]">
              Encontre profissionais e serviços especializados em proteger e
              garantir os direitos de crianças e adolescentes.
            </p>
          </div>

          <SearchSocialServiceForm
            submit={handleFindManyPublicSocialServices}
          />
        </div>
      </summary>

      {currentModalOpen === true && <ServiceModal />}

      <CardSection
        serviceList={serviceList}
        isLoading={isLoadingSocialServices}
        hasRequested={hasRequested}
        currentPage={currentPage}
        totalPages={totalPages}
        handleSetCurrentPage={handleSetCurrentPage}
      />
    </>
  );
}
