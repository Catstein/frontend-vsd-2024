import { ElementType } from "react";

interface ContactCardProps {
  icon: ElementType;
  title: string;
  text: string;
}

export function ContactCard({ icon: Icon, title, text }: ContactCardProps) {
  return (
    <div className="flex flex-col rounded-[0.5rem] max-w-full w-[24rem] max-md:w-full p-[1.5rem] h-[14.125rem] bg-[#F4F4F5] justify-between">
      <Icon className="w-[1.5rem] text-[#51525C]" />

      <div className="flex flex-col gap-2">
        <p
          title={title}
          className="font-normal text-[0.875rem] leading-[1.3125rem] text-[#51525C]"
        >
          {title}
        </p>
        <p
          title={text}
          className="font-semibold text-[1.25rem] leading-[1.6625rem] text-[#18181B] truncate"
        >
          {text}
        </p>
      </div>
    </div>
  );
}
