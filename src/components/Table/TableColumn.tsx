import { ReactNode } from "react";

interface TableColumnProps {
  children: ReactNode;
}

export function TableColumn({ children }: TableColumnProps) {
  return (
    <th className="text-left font-semibold text-base leading-[1.33rem] text-[#18181B] pb-4">
      {children}
    </th>
  );
}
