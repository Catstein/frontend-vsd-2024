import { ReactNode } from "react";

interface TableRowProps {
  children: ReactNode;
}

export function TableRow({ children }: TableRowProps) {
  return <tr>{children}</tr>;
}
