"use client";

import CreatePortal from "@/hooks/CreatePortal";
import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface ModalRootProps {
  children: ReactNode;
  className?: string;
}

export function ModalRoot({ children, className }: ModalRootProps) {
  return (
    <CreatePortal selector="#modal-root">
      <div className="fixed bottom-[0] left-[0] right-[0] top-[0] z-50 flex h-full w-full items-center justify-center overflow-y-auto bg-[#04234452] p-4">
        <div
          data-testid="modal-root"
          className={twMerge(
            "max-w-full flex h-auto flex-col rounded-[0.5rem] border-[1px] border-[#D1D1D6] bg-[#FFFFFF] p-6",
            className
          )}
        >
          {children}
        </div>
      </div>
    </CreatePortal>
  );
}
