"use client";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { ECategoryStatus } from "@/models/ECategoryStatus";
import { IServiceCategory } from "@/models/entities/serviceCategory";
import { findManyPublicServiceCategory } from "@/services/serviceCategories/findManyPublicServiceCategory";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { SocialServiceCategoryToggle } from "./SocialServiceCategoryToggle";

const searchForm = z.object({
  search: z.string().optional(),
  categoryUid: z.string().optional(),
});

type SearchForm = z.infer<typeof searchForm>;

interface SearchSocialServiceFormProps {
  submit(searchForm: SearchForm): void;
}

export function SearchSocialServiceForm({
  submit,
}: SearchSocialServiceFormProps) {
  const [categoryList, setCategoryList] = useState<IServiceCategory[]>([]);

  const { control, watch, setValue, handleSubmit, reset } = useForm<SearchForm>(
    {
      resolver: zodResolver(searchForm),
      defaultValues: {
        search: "",
        categoryUid: "1",
      },
    }
  );

  const [isLoadingCategory, startTransition] = useTransition();

  const getCategoryList = () => {
    startTransition(async () => {
      const res = await findManyPublicServiceCategory({
        payload: {
          search: "",
          status: ECategoryStatus.ENABLED,
          page: 1,
          pageSize: 30,
        },
        config: {},
      });

      setCategoryList([
        {
          uid: "1",
          name: "Todos",
          status: ECategoryStatus.ENABLED,
        },
        ...res.data,
      ]);
    });
  };

  useEffect(() => {
    submit({
      search: "",
      categoryUid: "1",
    });

    getCategoryList();
  }, []);

  return (
    <article className="flex w-full">
      <form
        onSubmit={handleSubmit(submit)}
        className="flex flex-col w-full gap-10 items-center"
      >
        <div className="flex gap-4 max-w-full w-[27.875rem]">
          <Input
            name="search"
            placeholder="Digite o que procura aqui"
            control={control}
          />

          <Button
            type="submit"
            className="h-full"
            disabled={isLoadingCategory === true}
          >
            Buscar
          </Button>
        </div>

        {isLoadingCategory === true && "Carregando..."}
        {isLoadingCategory === false && (
          <SocialServiceCategoryToggle
            watch={watch}
            setValue={setValue}
            categoryList={categoryList}
            name="categoryUid"
            submitForm={() => {
              handleSubmit((formValue) => {
                submit(formValue);
              })();
            }}
          />
        )}
      </form>
    </article>
  );
}
