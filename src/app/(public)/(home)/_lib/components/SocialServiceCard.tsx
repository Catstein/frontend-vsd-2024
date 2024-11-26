import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ISocialService } from "@/models/entities/socialService";
import { MapPinIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

interface SocialServiceCardProps {
  service: Pick<
    ISocialService,
    "service_category" | "agent_name" | "agent_role" | "uid"
  >;
}

export function SocialServiceCard({ service }: SocialServiceCardProps) {
  return (
    <div className="w-[17.5rem] max-md:w-full h-min rounded-[0.5rem] bg-[#FFFFFF] p-[1.5rem]">
      <div className="flex w-full flex-col gap-[2rem] ">
        <div>
          <Badge>
            <>{service.service_category.name}</>
          </Badge>
        </div>

        <div className="flex flex-col w-full h-min gap-2">
          <h1 className="font-semibold text-xl leading-[1.6625rem] text-[#18181B] truncate">
            {service.agent_name}
          </h1>

          <div className="inline-flex gap-1 text-[#51525C]">
            <MapPinIcon className="w-[1.3rem] h-auto" />
            <p className="font-normal text-sm leading-[1.16375rem] truncate">
              Piracicaba, São Paulo
            </p>
          </div>

          <p className="font-normal text-sm leading-[1.16375rem] text-[#51525C] truncate">
            {service.agent_role}
          </p>
        </div>

        <Link href={`?socialService=${service.uid}`}>
          <Button type="button" className="h-full" variant={"secondary"}>
            Visualizar
          </Button>
        </Link>
      </div>
    </div>
  );
}
