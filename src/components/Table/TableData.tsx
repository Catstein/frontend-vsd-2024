import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface TableDataProps {
  children: ReactNode;
  className?: string;
}

export function TableData({ children, className }: TableDataProps) {
  return (
    <td className="py-4 border-t-[0.125rem] border-[#D1D1D6] text-[0.875rem] leading-[1.3125rem] text-[#51525C]">
      <div className={cn("inline-flex flex-row gap-2", className)}>
        {children}
      </div>
    </td>
  );
}
