"use client";

import {
  Pagination,
  PaginationButton,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "./ui/Pagination";

interface PaginationNavProps {
  currentPage: number;
  totalPages: number;
  handleSetCurrentPage(newPageValue: number): void;
}

export function PaginationNav({
  currentPage,
  totalPages,
  handleSetCurrentPage,
}: PaginationNavProps) {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            disabled={currentPage === 1}
            onClick={() => handleSetCurrentPage(currentPage - 1)}
          />
        </PaginationItem>

        {currentPage > 1 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {currentPage > 1 && (
          <PaginationItem>
            <PaginationButton
              onClick={() => handleSetCurrentPage(currentPage - 1)}
            >
              {currentPage - 1}
            </PaginationButton>
          </PaginationItem>
        )}

        <PaginationItem>
          <PaginationButton isActive>{currentPage}</PaginationButton>
        </PaginationItem>

        {currentPage < totalPages && (
          <PaginationItem>
            <PaginationButton
              onClick={() => handleSetCurrentPage(currentPage + 1)}
            >
              {currentPage + 1}
            </PaginationButton>
          </PaginationItem>
        )}

        {currentPage < totalPages && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        <PaginationItem>
          <PaginationNext
            disabled={currentPage >= totalPages}
            onClick={() => handleSetCurrentPage(currentPage + 1)}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
