"use client";

import { MessageToast } from "@/components/MessageToast";
import { PrivateCardContainer } from "@/components/PrivateCardContainer";
import { PrivateSection } from "@/components/PrivateSection";
import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { useToken } from "@/contexts/useToken";
import { ECategoryStatus } from "@/models/ECategoryStatus";
import { ESocialServiceStatus } from "@/models/ESocialServiceStatus";
import { managementOptions } from "@/models/staticOptionValues/managementOptions";
import { organizationOptions } from "@/models/staticOptionValues/organizationOptions";
import { organOptions } from "@/models/staticOptionValues/organOptions";
import { publicUnitOptions } from "@/models/staticOptionValues/publicUnitOptions";
import { serviceProviderOptions } from "@/models/staticOptionValues/serviceProviderOptions";
import { findManyPublicServiceCategory } from "@/services/serviceCategories/findManyPublicServiceCategory";
import { getSocialService } from "@/services/socialServices/getSocialService";
import { handleSocialService } from "@/services/socialServices/handleSocialService";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";
import { SelectInput } from "./SelectInput";

interface ProjectFormProps {
  serviceUid?: string;
}

const socialServiceFormSchema = z
  .object({
    service_name: z
      .string({ message: "Campo obrigatório" })
      .min(1, "Campo obrigatório")
      .max(100, "Limite de caracteres excedido.Permitido até: 100."),
    service_category: z
      .string({ message: "Campo obrigatório" })
      .min(1, "Campo obrigatório"),
    description: z
      .string({ message: "Campo obrigatório" })
      .min(1, "Campo obrigatório")
      .max(1500, "Limite de caracteres excedido.Permitido até: 1500."),
    agent_name: z
      .string({ message: "Campo obrigatório" })
      .min(1, "Campo obrigatório")
      .max(80, "Limite de caracteres excedido.Permitido até: 80."),
    agent_role: z
      .string({ message: "Campo obrigatório" })
      .min(1, "Campo obrigatório")
      .max(50, "Limite de caracteres excedido.Permitido até: 50."),
    phone: z.string().optional(),
    email: z.string().optional(),
    website: z
      .string({ message: "Campo obrigatório" })
      .min(1, "Campo obrigatório")
      .url("O site deve possuir o prefixo: 'https://'"),
    status: z.enum([
      ESocialServiceStatus.ENABLED,
      ESocialServiceStatus.DISABLED,
    ]),
    organ: z.string().max(100).optional().nullish(),
    management: z.string().max(100).optional().nullish(),
    public_unit: z.string().max(100).optional().nullish(),
    organization: z.string().max(100).optional().nullish(),
    service_provider: z.string().max(100).optional().nullish(),
    main_law: z.string().max(255).optional().nullish(),
    municipal_law: z.string().max(255).optional().nullish(),
    laws: z.string().max(255).optional().nullish(),
    naming_of_laws: z.string().max(255).optional().nullish(),
  })
  .refine(
    (data) => {
      return data.phone || data.email;
    },
    {
      path: ["phone"],
      message:
        "Cadastre ao menos uma informação de contato (Telefone ou E-mail)",
    }
  );

type SocialServiceFormSchema = z.infer<typeof socialServiceFormSchema>;

export function ProjectForm({ serviceUid }: ProjectFormProps) {
  const createMode = serviceUid === "create";

  const router = useRouter();

  const { token, setToken } = useToken();

  const {
    control,
    watch,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SocialServiceFormSchema>({
    resolver: zodResolver(socialServiceFormSchema),
    defaultValues: {
      website: "https://",
      status: ESocialServiceStatus.ENABLED,
    },
    mode: "onChange",
  });

  const [isLoadingCategoryList, startCategoryFetch] = useTransition();

  const [categoryList, setCategoryList] = useState<
    {
      value: string;
      label: string;
    }[]
  >([]);

  const getCategoryList = () => {
    startCategoryFetch(async () => {
      const res = await findManyPublicServiceCategory({
        payload: {
          search: "",
          status: ECategoryStatus.ENABLED,
          page: 1,
          pageSize: 30,
        },
        config: {},
      });

      const metaList = res.data.map((category) => {
        return {
          value: category.uid,
          label: category.name,
        };
      });

      setCategoryList(metaList);
    });
  };

  function onSubmit(data: SocialServiceFormSchema) {
    const isUid =
      /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i.test(
        data.service_category
      );

    const serviceCategoryMetadata = isUid
      ? { uid: data.service_category }
      : { name: data.service_category };

    startCategoryFetch(() => {
      handleSocialService({
        payload: {
          ...data,
          uid: serviceUid,
          service_category: serviceCategoryMetadata,
          phone: data.phone?.replace(/\D/g, ""),
        },
        config: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      })
        .then((res) => {
          toast((e) => (
            <MessageToast
              closeToast={e.closeToast}
              type="success"
              title={`Serviço ${
                createMode === true ? "adicionado" : "atualizado"
              }`}
              text={`Serviço ${
                createMode === true ? "adicionado" : "atualizado"
              } com sucesso`}
            />
          ));

          router.push("/socialServices");
        })
        .catch((err) => {
          toast((e) => (
            <MessageToast
              closeToast={e.closeToast}
              type="error"
              title="Algo errado ocorreu."
              text="Entre em contato com o suporte."
            />
          ));

          // setToken("");
        });
    });
  }

  const [isLoadingFormData, startTransition] = useTransition();

  function handleGetSocialService(serviceUid: string) {
    startTransition(async () => {
      const res = await getSocialService({
        payload: {
          uid: serviceUid,
        },
        config: {},
      });

      let formatedPhone;

      if (res.phone && res.phone.length >= 11) {
        formatedPhone = res.phone
          .replace(/(\d{2})(\d)/, "($1) $2")
          .replace(/(\d{5})(\d)/, "$1-$2")
          .replace(/(\d{4})/, "$1");
      } else if (res.phone) {
        formatedPhone = res.phone
          .replace(/(\d{2})(\d)/, "($1) $2")
          .replace(/(\d{4})(\d)/, "$1-$2")
          .replace(/(\d{4})/, "$1");
      }

      reset(
        {
          ...res,
          phone: formatedPhone,
          service_category: res.service_category.uid,
        },
        {
          keepValues: false,
        }
      );
    });
  }

  useEffect(() => {
    getCategoryList();

    if (serviceUid !== undefined && serviceUid !== "create") {
      handleGetSocialService(serviceUid);
    }
  }, [serviceUid]);

  return (
    <PrivateSection className="w-[50rem]">
      <div className="flex items-center w-full gap-2">
        <Button
          type="button"
          variant="iconButton"
          size="iconButton"
          onClick={() => {
            router.back();
          }}
        >
          <ChevronLeftIcon className="h-[0.625rem]" />
        </Button>
        <p className="font-semibold text-base leading-[1.33rem] text-[#18181B]">
          Voltar
        </p>
      </div>
      <form
        className="flex flex-col md:gap-6 gap-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <PrivateCardContainer>
          <h1 className="font-semibold text-[1rem] md:text-[1.5rem] leading-[1.33rem] md:leading-[1.8rem] text-[#18181B]">
            Cadastro de Serviços
          </h1>

          {isLoadingFormData === true && <div>Carregando...</div>}

          {isLoadingFormData === false && (
            <div className="w-full flex flex-col gap-4">
              <div className="flex gap-8 w-full">
                <Input
                  name="service_name"
                  title="Nome do serviço"
                  placeholder="Digite o nome do serviço"
                  control={control}
                />

                <SelectInput
                  name="service_category"
                  title="Categoria do serviço"
                  placeholder="Selecione a categoria do serviço"
                  control={control}
                  optionList={categoryList}
                />
              </div>

              <div className="flex w-full">
                <Textarea
                  name="description"
                  title="Descrição"
                  placeholder="Digite aqui a descrição do serviço "
                  control={control}
                  rows={3}
                />
              </div>

              <div className="flex gap-8 w-full">
                <Input
                  name="agent_name"
                  title="Nome do profissional"
                  placeholder="Nome do profissional responsável"
                  control={control}
                />

                <Input
                  name="agent_role"
                  title="Especialidade do profissional"
                  placeholder="Especialidade do profissional"
                  control={control}
                />
              </div>

              <div className="flex w-full">
                <Input
                  name="website"
                  title="Site do serviço "
                  defaultValue="https://"
                  placeholder="http://..."
                  control={control}
                />
              </div>

              <div className="flex gap-8 w-full">
                <Input
                  name="phone"
                  title="Telefone"
                  subtitle="(opcional)"
                  placeholder="Digite o Telefone"
                  control={control}
                  onChangeHandler={(event) => {
                    const phoneValue = event.target.value;

                    let result;
                    const valueWithouMask = phoneValue.replace(/\D/g, "");

                    if (valueWithouMask.length >= 11) {
                      result = valueWithouMask
                        .replace(/(\d{2})(\d)/, "($1) $2")
                        .replace(/(\d{5})(\d)/, "$1-$2")
                        .replace(/(\d{4})/, "$1");
                    } else {
                      result = valueWithouMask
                        .replace(/(\d{2})(\d)/, "($1) $2")
                        .replace(/(\d{4})(\d)/, "$1-$2")
                        .replace(/(\d{4})/, "$1");
                    }

                    event.target.value = result;

                    return event;
                  }}
                />

                <Input
                  name="email"
                  title="E-mail"
                  subtitle="(opcional)"
                  placeholder="Digite o E-mail"
                  control={control}
                />
              </div>

              <div className="flex gap-8 w-full">
                <SelectInput
                  name="organ"
                  title="Órgão"
                  subtitle="(opcional)"
                  placeholder="Selecione o órgão"
                  control={control}
                  optionList={organOptions}
                />

                <SelectInput
                  name="management"
                  title="Gestão"
                  subtitle="(opcional)"
                  placeholder="Selecione a gestão"
                  control={control}
                  optionList={managementOptions}
                />
              </div>

              <div className="flex w-full">
                <SelectInput
                  name="public_unit"
                  title="Unidade pública"
                  subtitle="(opcional)"
                  placeholder="Selecione a unidade pública "
                  control={control}
                  optionList={publicUnitOptions}
                />
              </div>

              <div className="flex gap-8 w-full">
                <SelectInput
                  name="organization"
                  title="Organização"
                  subtitle="(opcional)"
                  placeholder="Selecione a organização "
                  control={control}
                  optionList={organizationOptions}
                />

                <SelectInput
                  name="service_provider"
                  title="Prestadores de serviços"
                  subtitle="(opcional)"
                  placeholder="Selecione os prestadores de serviços"
                  control={control}
                  optionList={serviceProviderOptions}
                />
              </div>

              <div className="flex gap-8 w-full">
                <Input
                  name="main_law"
                  title="Lei principal"
                  subtitle="(opcional)"
                  placeholder="Selecione a lei principal"
                  control={control}
                />

                <Input
                  name="municipal_law"
                  title="Lei municipal"
                  subtitle="(opcional)"
                  placeholder="Selecione a lei municipal"
                  control={control}
                />
              </div>

              <div className="flex w-full">
                <Textarea
                  name="laws"
                  title="Leis"
                  subtitle="(opcional)"
                  placeholder="Digite aqui as leis"
                  control={control}
                  rows={3}
                />
              </div>

              <div className="flex w-full">
                <Textarea
                  name="naming_of_laws"
                  title="Nomeação das leis"
                  subtitle="(opcional)"
                  placeholder="Digite aqui a nomeação das leis"
                  control={control}
                  rows={3}
                />
              </div>

              <div className="flex w-full">
                <Checkbox
                  control={control}
                  name="status"
                  possibleValues={{
                    checked: ESocialServiceStatus.ENABLED,
                    unchecked: ESocialServiceStatus.DISABLED,
                  }}
                  title="Status de exibição"
                  message="Exibir serviço"
                  disabled={createMode}
                />
              </div>
            </div>
          )}
        </PrivateCardContainer>
        <Button
          type="submit"
          disabled={isLoadingCategoryList === true}
          className="self-end w-[11rem]"
        >
          {isLoadingCategoryList === true ? "Carregando" : "Salvar"}
        </Button>
      </form>
    </PrivateSection>
  );
}
