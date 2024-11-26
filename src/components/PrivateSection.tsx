import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface PrivateSectionProps {
  children: ReactNode;
  className?: string;
}

export function PrivateSection({ children, className }: PrivateSectionProps) {
  return (
    <div
      className={cn(
        "pt-8 px-4 pb-4 md:pb-14 w-[80rem] h-max max-w-full flex flex-col md:gap-6 gap-4",
        className
      )}
    >
      {children}
    </div>
  );
}
