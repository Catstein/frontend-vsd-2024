"use client";

import { ToggleOption } from "@/components/ToggleOption";
import { IServiceCategory } from "@/models/entities/serviceCategory";
import { useCallback, useEffect } from "react";
import { FieldValues, UseFormSetValue, UseFormWatch } from "react-hook-form";

interface AccessGroupToggleStatusProps {
  watch: UseFormWatch<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
  name: string;
  categoryList: IServiceCategory[];
  submitForm?(): void;
}

export function SocialServiceCategoryToggle({
  watch,
  setValue,
  name,
  categoryList,
  submitForm,
}: AccessGroupToggleStatusProps) {
  useEffect(() => {
    const subscription = watch((formValue) => {
      return formValue;
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [watch]);

  const setCategory = useCallback(
    (currentCategory: IServiceCategory) => {
      setValue(name, currentCategory.uid);
      if (submitForm !== undefined) {
        submitForm();
      }
    },
    [name, setValue, submitForm]
  );

  return (
    <div className="flex flex-row gap-2 max-md:w-full overflow-x-scroll">
      {categoryList.map((currentCategory) => (
        <ToggleOption
          key={currentCategory.uid}
          isSelected={watch(name) === currentCategory.uid}
          text={currentCategory.name}
          onClick={() => {
            setCategory(currentCategory);
          }}
        />
      ))}
    </div>
  );
}
