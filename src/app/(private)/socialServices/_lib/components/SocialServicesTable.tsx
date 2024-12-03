"use client";

import { EmptyState } from "@/components/EmptyState";
import { MessageToast } from "@/components/MessageToast";
import { PaginationNav } from "@/components/PaginationNav";
import { PrivateCardContainer } from "@/components/PrivateCardContainer";
import { Table } from "@/components/Table";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { useToken } from "@/contexts/useToken";
import { ISocialService } from "@/models/entities/socialService";
import { ESocialServiceStatus } from "@/models/ESocialServiceStatus";
import {
  FindManyServicesResult,
  findManySocialServices,
  SocialServiceParams,
} from "@/services/socialServices/findManySocialServices";
import {
  EyeIcon,
  EyeSlashIcon,
  PencilSquareIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { useCallback, useEffect, useState, useTransition } from "react";
import { toast } from "react-toastify";
import { ChangeServiceStatusModal } from "./ChangeServiceStatusModal";

export function SocialServicesTable() {
  const [serviceToUpdateStatus, setServiceToUpdateStatus] =
    useState<ISocialService>();

  const [windowWidth, setWindowWidth] = useState<number>();

  const requestPageSize = 10;

  const { token, setToken } = useToken();
  const [socialServiceList, setSocialServiceList] = useState<ISocialService[]>(
    []
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [hasRequested, setHasRequested] = useState(false);
  const [isLoading, startTransition] = useTransition();

  const getVideoSize = useCallback((window: Window) => {
    setWindowWidth(window.innerWidth);
  }, []);

  async function findSocialServices(metadata: SocialServiceParams) {
    await startTransition(async () => {
      setHasRequested(true);
      await findManySocialServices({
        payload: metadata,
        config: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      })
        .then((res: FindManyServicesResult) => {
          const currentTotalPages = Math.ceil(
            res.pagination.count / requestPageSize
          );

          setTotalPages(currentTotalPages);

          const data = res.data.map((currentService) => {
            const maskedPhone = currentService.phone?.replace(
              /^(\d{2}\s?)(\d{4,5})(\d{4})$/,
              "($1) $2-$3"
            );

            return { ...currentService, phone: maskedPhone };
          });

          setSocialServiceList(data);
        })
        .catch((err) => {
          toast((e) => (
            <MessageToast
              closeToast={e.closeToast}
              type="error"
              title="Token expirado"
              text="Efetue login novamente como medida de segurança"
            />
          ));

          setToken("");
        });
    });
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("resize", () => getVideoSize(window));

      setWindowWidth(window.innerWidth);
    }

    if (serviceToUpdateStatus === undefined) {
      const searchMetadata: SocialServiceParams = {
        page: currentPage,
        pageSize: requestPageSize,
      };

      findSocialServices(searchMetadata);
    }

    return () => {
      window.removeEventListener("resize", () => getVideoSize(window));
    };
  }, [currentPage, serviceToUpdateStatus]);

  function handleSetCurrentPage(newPageValue: number) {
    setCurrentPage(newPageValue);
  }

  return (
    <PrivateCardContainer>
      {serviceToUpdateStatus !== undefined && (
        <ChangeServiceStatusModal
          serviceData={serviceToUpdateStatus}
          onClose={() => setServiceToUpdateStatus(undefined)}
        />
      )}

      {hasRequested === true &&
        isLoading === false &&
        socialServiceList.length === 0 && (
          <EmptyState
            title="Não há serviços cadastrados"
            description="Adicione um novo serviço no botão abaixo."
          >
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
          </EmptyState>
        )}
      {isLoading === true && <div className="mx-auto">Carregando...</div>}
      {socialServiceList?.length > 0 &&
        isLoading === false &&
        windowWidth !== undefined &&
        windowWidth > 640 && (
          <>
            <Table.Root>
              <Table.Header>
                <Table.Row>
                  <Table.Column>Nome do profissional</Table.Column>
                  <Table.Column>Contato</Table.Column>
                  <Table.Column>Status de exibição</Table.Column>
                  <Table.Column>Categoria</Table.Column>
                  <Table.Column>Ações</Table.Column>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {socialServiceList.map((currentService) => (
                  <Table.Row key={currentService.uid}>
                    <Table.Data>{currentService.agent_name}</Table.Data>
                    <Table.Data>{currentService.phone}</Table.Data>
                    <Table.Data>
                      {currentService.status === ESocialServiceStatus.ENABLED
                        ? "Exibindo para a população"
                        : "Não exibido para a população"}
                    </Table.Data>
                    <Table.Data>
                      <Badge>{currentService.service_category.name}</Badge>
                    </Table.Data>
                    <Table.Data>
                      <Link href={`socialServices/${currentService.uid}`}>
                        <Button
                          type="button"
                          variant="iconButton"
                          size="iconButton"
                        >
                          <PencilSquareIcon className="w-[1.2rem] text-[#51525C]" />
                        </Button>
                      </Link>
                      <Button
                        type="button"
                        variant="iconButton"
                        size="iconButton"
                        onClick={() => {
                          setServiceToUpdateStatus(currentService);
                        }}
                      >
                        {currentService.status ===
                        ESocialServiceStatus.ENABLED ? (
                          <EyeSlashIcon className="w-[1.2rem] text-[#51525C]" />
                        ) : (
                          <EyeIcon className="w-[1.2rem] text-[#51525C]" />
                        )}
                      </Button>
                    </Table.Data>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Root>

            <PaginationNav
              currentPage={currentPage}
              totalPages={totalPages}
              handleSetCurrentPage={handleSetCurrentPage}
            />
          </>
        )}
      {socialServiceList?.length > 0 &&
        isLoading === false &&
        windowWidth !== undefined &&
        windowWidth <= 640 && (
          <>
            <Table.Root>
              <Table.Header>
                <Table.Row>
                  <Table.Column>Nome do profissional</Table.Column>
                  <Table.Column>Ações</Table.Column>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {socialServiceList.map((currentService) => (
                  <Table.Row key={currentService.uid}>
                    <Table.Data className="flex-col gap-1">
                      <h1 className="font-normal text-xs leading-[1.5rem] text-[#51525C]">
                        {currentService.agent_name}
                      </h1>
                      <span className="font-normal text-[0.75rem] leading-[0.9975rem] text-[#70707B]">
                        <span className="text-[#51525C]">Status:</span>{" "}
                        {currentService.status === ESocialServiceStatus.ENABLED
                          ? "Ativo"
                          : "Inativo"}
                      </span>
                      <span className="font-normal text-[0.75rem] leading-[0.9975rem] text-[#70707B]">
                        <span className="text-[#51525C]">
                          Categoria: {currentService.service_category.name}
                        </span>
                      </span>
                    </Table.Data>
                    <Table.Data>
                      <Link href={`socialServices/${currentService.uid}`}>
                        <Button
                          type="button"
                          variant="iconButton"
                          size="iconButton"
                        >
                          <PencilSquareIcon className="w-[1.2rem] text-[#51525C]" />
                        </Button>
                      </Link>
                      <Button
                        type="button"
                        variant="iconButton"
                        size="iconButton"
                        onClick={() => {
                          setServiceToUpdateStatus(currentService);
                        }}
                      >
                        <TrashIcon className="w-[1.2rem] text-[#DC2625]" />
                      </Button>
                    </Table.Data>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Root>

            <PaginationNav
              currentPage={currentPage}
              totalPages={totalPages}
              handleSetCurrentPage={handleSetCurrentPage}
            />
          </>
        )}
    </PrivateCardContainer>
  );
}
