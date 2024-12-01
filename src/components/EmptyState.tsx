import { ElementType, ReactNode } from "react";

interface EmptyStateProps {
  icon?: ElementType;
  title: string;
  description: string;
  children?: ReactNode;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  children,
}: EmptyStateProps) {
  return (
    <div className="mx-auto max-w-[18.75rem] py-[6rem] flex flex-col gap-6 self-center">
      <div className="flex flex-col gap-2 items-center">
        {Icon && <Icon className="w-[1.5rem] text-[#000]" />}

        <h1 className="font-semibold text-sm md:text-base md:leading-[1.33rem] leading-[1.3125rem] text-[#18181B] text-center">
          {title}
        </h1>
        <p className="md:text-sm text-[0.75rem] md:leading-[1.3125rem] leading-[1.125rem] text-[#51525C] text-center">
          {description}
        </p>
      </div>
      {children}
    </div>
  );
}
