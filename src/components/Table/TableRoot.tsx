import { ReactNode } from "react";

interface TableRootProps {
  children: ReactNode;
}

export function TableRoot({ children }: TableRootProps) {
  return <table className="w-full h-min">{children}</table>;
}
