"use client";

import { Table } from "@/components/Table";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/Pagination";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useCallback, useEffect, useState } from "react";

export function SocialProjectsTable() {
  const [windowWidth, setWindowWidth] = useState<number>();

  const getVideoSize = useCallback((window: Window) => {
    setWindowWidth(window.innerWidth);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("resize", () => getVideoSize(window));

      setWindowWidth(window.innerWidth);
    }
  }, [getVideoSize]);

  return (
    <div className="flex flex-col max-w-full w-[80rem] h-full rounded-[0.5rem] bg-[#FFFFFF] p-8 gap-8 justify-between">
      {/* <EmptyState
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
      </EmptyState> */}

      {windowWidth !== undefined && windowWidth > 640 && (
        <Table.Root>
          <Table.Header>
            <Table.Row>
              <Table.Column>Nome do profissional</Table.Column>
              <Table.Column>Contato</Table.Column>
              <Table.Column>Status</Table.Column>
              <Table.Column>Categoria</Table.Column>
              <Table.Column>Ações</Table.Column>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            <Table.Row>
              <Table.Data>Vanderlei Camelo Dias</Table.Data>
              <Table.Data>(19) 3578-0355</Table.Data>
              <Table.Data>Ativo</Table.Data>
              <Table.Data>
                <Badge>Psicologia</Badge>
              </Table.Data>
              <Table.Data>
                <Button type="button" variant="iconButton" size="iconButton">
                  <PencilSquareIcon className="w-[1.2rem] text-[#51525C]" />
                </Button>
                <Button type="button" variant="iconButton" size="iconButton">
                  <TrashIcon className="w-[1.2rem] text-[#DC2625]" />
                </Button>
              </Table.Data>
            </Table.Row>

            <Table.Row>
              <Table.Data>Vanderlei Camelo Dias</Table.Data>
              <Table.Data>(19) 3578-0355</Table.Data>
              <Table.Data>Ativo</Table.Data>
              <Table.Data>
                <Badge>Psicologia</Badge>
              </Table.Data>
              <Table.Data>
                <Button type="button" variant="iconButton" size="iconButton">
                  <PencilSquareIcon className="w-[1.2rem] text-[#51525C]" />
                </Button>
                <Button type="button" variant="iconButton" size="iconButton">
                  <TrashIcon className="w-[1.2rem] text-[#DC2625]" />
                </Button>
              </Table.Data>
            </Table.Row>

            <Table.Row>
              <Table.Data>Vanderlei Camelo Dias</Table.Data>
              <Table.Data>(19) 3578-0355</Table.Data>
              <Table.Data>Ativo</Table.Data>
              <Table.Data>
                <Badge>Psicologia</Badge>
              </Table.Data>
              <Table.Data>
                <Button type="button" variant="iconButton" size="iconButton">
                  <PencilSquareIcon className="w-[1.2rem] text-[#51525C]" />
                </Button>
                <Button type="button" variant="iconButton" size="iconButton">
                  <TrashIcon className="w-[1.2rem] text-[#DC2625]" />
                </Button>
              </Table.Data>
            </Table.Row>

            <Table.Row>
              <Table.Data>Vanderlei Camelo Dias</Table.Data>
              <Table.Data>(19) 3578-0355</Table.Data>
              <Table.Data>Ativo</Table.Data>
              <Table.Data>
                <Badge>Psicologia</Badge>
              </Table.Data>
              <Table.Data>
                <Button type="button" variant="iconButton" size="iconButton">
                  <PencilSquareIcon className="w-[1.2rem] text-[#51525C]" />
                </Button>
                <Button type="button" variant="iconButton" size="iconButton">
                  <TrashIcon className="w-[1.2rem] text-[#DC2625]" />
                </Button>
              </Table.Data>
            </Table.Row>

            <Table.Row>
              <Table.Data>Vanderlei Camelo Dias</Table.Data>
              <Table.Data>(19) 3578-0355</Table.Data>
              <Table.Data>Ativo</Table.Data>
              <Table.Data>
                <Badge>Psicologia</Badge>
              </Table.Data>
              <Table.Data>
                <Button type="button" variant="iconButton" size="iconButton">
                  <PencilSquareIcon className="w-[1.2rem] text-[#51525C]" />
                </Button>
                <Button type="button" variant="iconButton" size="iconButton">
                  <TrashIcon className="w-[1.2rem] text-[#DC2625]" />
                </Button>
              </Table.Data>
            </Table.Row>

            <Table.Row>
              <Table.Data>Vanderlei Camelo Dias</Table.Data>
              <Table.Data>(19) 3578-0355</Table.Data>
              <Table.Data>Ativo</Table.Data>
              <Table.Data>
                <Badge>Psicologia</Badge>
              </Table.Data>
              <Table.Data>
                <Button type="button" variant="iconButton" size="iconButton">
                  <PencilSquareIcon className="w-[1.2rem] text-[#51525C]" />
                </Button>
                <Button type="button" variant="iconButton" size="iconButton">
                  <TrashIcon className="w-[1.2rem] text-[#DC2625]" />
                </Button>
              </Table.Data>
            </Table.Row>

            <Table.Row>
              <Table.Data>Vanderlei Camelo Dias</Table.Data>
              <Table.Data>(19) 3578-0355</Table.Data>
              <Table.Data>Ativo</Table.Data>
              <Table.Data>
                <Badge>Psicologia</Badge>
              </Table.Data>
              <Table.Data>
                <Button type="button" variant="iconButton" size="iconButton">
                  <PencilSquareIcon className="w-[1.2rem] text-[#51525C]" />
                </Button>
                <Button type="button" variant="iconButton" size="iconButton">
                  <TrashIcon className="w-[1.2rem] text-[#DC2625]" />
                </Button>
              </Table.Data>
            </Table.Row>

            <Table.Row>
              <Table.Data>Vanderlei Camelo Dias</Table.Data>
              <Table.Data>(19) 3578-0355</Table.Data>
              <Table.Data>Ativo</Table.Data>
              <Table.Data>
                <Badge>Psicologia</Badge>
              </Table.Data>
              <Table.Data>
                <Button type="button" variant="iconButton" size="iconButton">
                  <PencilSquareIcon className="w-[1.2rem] text-[#51525C]" />
                </Button>
                <Button type="button" variant="iconButton" size="iconButton">
                  <TrashIcon className="w-[1.2rem] text-[#DC2625]" />
                </Button>
              </Table.Data>
            </Table.Row>

            <Table.Row>
              <Table.Data>Vanderlei Camelo Dias</Table.Data>
              <Table.Data>(19) 3578-0355</Table.Data>
              <Table.Data>Ativo</Table.Data>
              <Table.Data>
                <Badge>Psicologia</Badge>
              </Table.Data>
              <Table.Data>
                <Button type="button" variant="iconButton" size="iconButton">
                  <PencilSquareIcon className="w-[1.2rem] text-[#51525C]" />
                </Button>
                <Button type="button" variant="iconButton" size="iconButton">
                  <TrashIcon className="w-[1.2rem] text-[#DC2625]" />
                </Button>
              </Table.Data>
            </Table.Row>

            <Table.Row>
              <Table.Data>Vanderlei Camelo Dias</Table.Data>
              <Table.Data>(19) 3578-0355</Table.Data>
              <Table.Data>Ativo</Table.Data>
              <Table.Data>
                <Badge>Psicologia</Badge>
              </Table.Data>
              <Table.Data>
                <Button type="button" variant="iconButton" size="iconButton">
                  <PencilSquareIcon className="w-[1.2rem] text-[#51525C]" />
                </Button>
                <Button type="button" variant="iconButton" size="iconButton">
                  <TrashIcon className="w-[1.2rem] text-[#DC2625]" />
                </Button>
              </Table.Data>
            </Table.Row>
          </Table.Body>
        </Table.Root>
      )}

      {windowWidth !== undefined && windowWidth <= 640 && (
        <Table.Root>
          <Table.Header>
            <Table.Row>
              <Table.Column>Nome do profissional</Table.Column>
              <Table.Column>Ações</Table.Column>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            <Table.Row>
              <Table.Data className="flex-col gap-1">
                <h1 className="font-normal text-xs leading-[1.5rem] text-[#51525C]">
                  Vanderlei Camelo Dias
                </h1>
                <span className="font-normal text-[0.75rem] leading-[0.9975rem] text-[#70707B]">
                  <span className="text-[#51525C]">Status:</span> Ativo
                </span>
                <span className="font-normal text-[0.75rem] leading-[0.9975rem] text-[#70707B]">
                  <span className="text-[#51525C]">Categoria: Psicologia</span>
                </span>
              </Table.Data>
              <Table.Data>
                <Button type="button" variant="iconButton" size="iconButton">
                  <PencilSquareIcon className="w-[1.2rem] text-[#51525C]" />
                </Button>
                <Button type="button" variant="iconButton" size="iconButton">
                  <TrashIcon className="w-[1.2rem] text-[#DC2625]" />
                </Button>
              </Table.Data>
            </Table.Row>
          </Table.Body>
        </Table.Root>
      )}

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
