import { ReactNode } from "react";

interface PrivateCardContainerProps {
  children: ReactNode;
}

export function PrivateCardContainer({ children }: PrivateCardContainerProps) {
  return (
    <div className="flex flex-col max-w-full w-full h-max rounded-[0.5rem] bg-[#FFFFFF] p-8 gap-8 justify-between">
      {children}
    </div>
  );
}
