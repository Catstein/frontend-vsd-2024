import { ReactNode } from "react";

interface PrivatePageProps {
  children: ReactNode;
}

export function PrivatePage({ children }: PrivatePageProps) {
  return (
    <div className="flex h-full w-full items-center flex-col px-4">
      {children}
    </div>
  );
}
