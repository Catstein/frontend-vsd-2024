"use client";

import { MessageToast } from "@/components/MessageToast";
import { ModalRoot } from "@/components/ModalRoot";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ISocialService } from "@/models/entities/socialService";
import { getSocialService } from "@/services/socialServices/getSocialService";
import {
  EnvelopeIcon,
  MapPinIcon,
  PhoneIcon,
  ShareIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { toast } from "react-toastify";

export function ServiceModal() {
  const searchParams = useSearchParams();

  const socialServiceUid = searchParams.get("socialService") ?? "";

  const [isLoading, startTransition] = useTransition();

  const [currentSocialService, setCurrentSocialService] =
    useState<ISocialService>();

  const handleGetSocialService = () => {
    startTransition(async () => {
      const res = await getSocialService({
        payload: {
          uid: socialServiceUid,
        },
        config: {},
      });

      setCurrentSocialService(res);
    });
  };

  useEffect(() => {
    handleGetSocialService();
  }, []);

  function handlePhoneValue(phone: string) {
    if (phone === undefined) {
      return "";
    }

    let result;

    if (phone.length === 11) {
      result = phone
        .replace(/(\d{2})(\d)/, "($1) $2")
        .replace(/(\d{5})(\d)/, "$1-$2")
        .replace(/(\d{4})/, "$1");
    } else {
      result = phone
        .replace(/(\d{2})(\d)/, "($1) $2")
        .replace(/(\d{4})(\d)/, "$1-$2")
        .replace(/(\d{4})/, "$1");
    }

    return result;
  }

  return (
    <ModalRoot>
      {isLoading === true && "Carregando..."}
      {isLoading === false && (
        <div className="max-w-full w-[43.5rem] h-min flex flex-col gap-6">
          <div className="flex justify-between w-full">
            <div>
              <Badge>{currentSocialService?.service_category?.name}</Badge>
            </div>

            <Link href="/">
              <Button type="button" variant="iconButton" size="iconButton">
                <XMarkIcon />
              </Button>
            </Link>
          </div>

          <div className="flex w-full h-min flex-col gap-6">
            <div className="flex flex-col gap-2 w-full">
              <div className="flex flex-col gap-1">
                <h1 className="font-semibold text-xl leading-[1.6625rem] text-[#18181B]">
                  {currentSocialService?.agent_name}
                </h1>
                <div className="inline-flex gap-1 text-[#51525C]">
                  <MapPinIcon className="w-[1.3rem] h-auto" />
                  <p className="font-normal text-sm leading-[1.16375rem]">
                    Piracicaba, São Paulo
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-1 text-[#0057A6]">
                {currentSocialService?.phone && (
                  <div className="flex gap-1">
                    <PhoneIcon className="w-[1.3rem]" />
                    <p className="font-medium text-sm leading-[1.5rem] ">
                      {handlePhoneValue(currentSocialService?.phone)}
                    </p>
                  </div>
                )}

                {currentSocialService?.email && (
                  <div className="flex gap-1">
                    <EnvelopeIcon className="w-[1.3rem]" />
                    <p className="font-medium text-sm leading-[1.5rem] ">
                      {currentSocialService?.email}
                    </p>
                  </div>
                )}
              </div>
            </div>

            <p className="font-normal text-[1rem] leading-[1.5rem] text-[#51525C]">
              {currentSocialService?.description}
            </p>
          </div>

          <div className="flex justify-end">
            <Button
              type="button"
              variant="secondary"
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);

                toast((e) => (
                  <MessageToast
                    closeToast={e.closeToast}
                    type="success"
                    title="Serviço copiado"
                    text="Url do serviço social copiada com successo."
                  />
                ));
              }}
            >
              Compartilhar <ShareIcon className="w-[0.75rem]" />
            </Button>
          </div>
        </div>
      )}
    </ModalRoot>
  );
}
