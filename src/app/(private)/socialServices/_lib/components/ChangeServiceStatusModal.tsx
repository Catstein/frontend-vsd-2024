"use client";

import { MessageToast } from "@/components/MessageToast";
import { ModalRoot } from "@/components/ModalRoot";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { useToken } from "@/contexts/useToken";
import { ISocialService } from "@/models/entities/socialService";
import { ESocialServiceStatus } from "@/models/ESocialServiceStatus";
import { handleSocialServiceStatusUpdate } from "@/services/socialServices/handleSocialServiceStatusUpdate";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useTransition } from "react";
import { toast } from "react-toastify";

interface ChangeServiceStatusModalProps {
  serviceData: Pick<
    ISocialService,
    "uid" | "service_category" | "agent_name" | "status" | "service_name"
  >;
  onClose(): void;
}

export function ChangeServiceStatusModal({
  serviceData,
  onClose,
}: ChangeServiceStatusModalProps) {
  const { token, setToken } = useToken();

  const [isLoading, startTransition] = useTransition();

  const handleSocialServiceStatus = () => {
    startTransition(async () => {
      await handleSocialServiceStatusUpdate({
        payload: {
          uid: serviceData.uid,
          status:
            serviceData.status === ESocialServiceStatus.ENABLED
              ? ESocialServiceStatus.DISABLED
              : ESocialServiceStatus.ENABLED,
        },
        config: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      })
        .then(() => {
          toast((e) => (
            <MessageToast
              closeToast={e.closeToast}
              type="success"
              title="Serviço atualizado"
              text={`Status do serviço atualizado para ${
                serviceData.status === ESocialServiceStatus.ENABLED
                  ? "Inativo"
                  : "Ativo"
              } com sucesso`}
            />
          ));

          onClose();
        })
        .catch((err) => {
          toast((e) => (
            <MessageToast
              closeToast={e.closeToast}
              type="error"
              title="Token expirado"
              text="Efetue login novamente como medida de segurança"
            />
          ));

          setToken("");
        });
    });
  };

  return (
    <ModalRoot>
      <div className="max-w-full w-[23.5rem] h-min flex flex-col gap-6">
        <div className="flex justify-between w-full">
          <div>
            <Badge>{serviceData?.service_category?.name}</Badge>
          </div>

          <Button
            type="button"
            variant="iconButton"
            size="iconButton"
            disabled={isLoading === true}
            onClick={onClose}
          >
            <XMarkIcon />
          </Button>
        </div>

        <div className="flex w-full h-min flex-col gap-6">
          <div className="flex flex-col gap-1 w-full">
            <h1 className="font-semibold text-xl leading-[1.6625rem] text-[#18181B] text-center">
              Alterar status de exibição do serviço: <br />
              &ldquo;{serviceData.service_name}
              &ldquo;
            </h1>
          </div>

          <p className="text-center font-normal text-[1rem] leading-[1.5rem] text-[#51525C]">
            Tem certeza que deseja alterar o status de exibição do serviço para{" "}
            <b>
              {serviceData.status === ESocialServiceStatus.ENABLED
                ? "Não exibido para a população"
                : "Exibido para a população"}
            </b>
            ?
          </p>
        </div>

        <div className="flex justify-between">
          <Button
            type="button"
            variant="secondary"
            disabled={isLoading === true}
            onClick={onClose}
          >
            Não, cancelar
          </Button>

          <Button
            type="button"
            variant="default"
            disabled={isLoading === true}
            onClick={() => {
              handleSocialServiceStatus();
            }}
          >
            Alterar status
          </Button>
        </div>
      </div>
    </ModalRoot>
  );
}
