"use client";

import { InputProps } from "@/components/ui/Input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/Select";
import { cn } from "@/lib/utils";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { Controller } from "react-hook-form";

type SelectInputProps = InputProps & {
  optionList: {
    value: string;
    label?: string;
  }[];
};

export function SelectInput({
  placeholder,
  title,
  subtitle,
  type,
  className,
  control,
  name,
  onChangeHandler,
  changeValueOnChange = true,
  optionList,
  ...props
}: SelectInputProps) {
  const [inputValue, setInputValue] = useState<string>("");

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { invalid }, formState: { errors } }) => (
        <Select
          onValueChange={(currentValue) => {
            const optionValues = optionList.find(
              (option) => option.value === currentValue
            );

            setInputValue(optionValues?.label ?? currentValue);
            field.onChange(currentValue);
          }}
        >
          <div className="flex flex-col gap-2 w-full">
            {title && (
              <label
                htmlFor={name}
                className="font-semibold text-sm leading-[1.3125rem] text-[#18181B]"
              >
                {title}{" "}
                {subtitle && (
                  <span className="font-normal text-[#51525C]">{subtitle}</span>
                )}
              </label>
            )}
            <div
              data-invalid={invalid}
              className="relative w-full data-[invalid=true]:border-[#DC2625] data-[invalid=true]:border-[1px] rounded-md"
            >
              <SelectTrigger
                hasClasses={false}
                className="w-full relative"
                asChild
              >
                <input
                  id={name}
                  data-invalid={invalid}
                  type={type}
                  className={cn(
                    "absolute top-0 left-0 bottom-0 right-0 bg-[#FFFFFF] leading-[1.3125rem] placeholder:text-[#70707B] flex h-11 w-full rounded-md px-3 py-1 text-base shadow-sm transition-colors focus-visible:ring-1  disabled:cursor-not-allowed disabled:opacity-50 md:text-sm border-[1px] border-[#D1D1D6]",
                    "focus:shadow-[0_0_0_2px] focus:shadow-[#2B659A] focus:border-none",
                    "focus:outline-1 focus:outline-[#D1D1D6] focus:-outline-offset-2",
                    "active:shadow-[0_0_0_2px] active:shadow-[#2B659A]",
                    "data-[invalid=true]:outline-[#DC2625]",
                    className
                  )}
                  value={
                    optionList.find((option) => option.value === field.value)
                      ?.label ?? inputValue
                  }
                  readOnly={props.readOnly}
                  placeholder={placeholder}
                  onChange={(event) => {
                    if (onChangeHandler) {
                      event = onChangeHandler(event);
                    }
                    if (changeValueOnChange === true) {
                      setInputValue(event.target.value);
                      field.onChange(event.target.value);
                    }
                  }}
                />
              </SelectTrigger>

              <ChevronDownIcon className="pointer-events-none absolute w-4 right-4 top-3 text-[]" />

              <input
                data-invalid={invalid}
                type={type}
                className={cn(
                  "bg-[#FFFFFF] leading-[1.3125rem] placeholder:text-[#70707B] flex h-11 w-full rounded-md px-3 py-1 text-base shadow-sm transition-colors focus-visible:ring-1  disabled:cursor-not-allowed disabled:opacity-50 md:text-sm border-[1px] border-[#D1D1D6]",
                  "focus:shadow-[0_0_0_2px] focus:shadow-[#2B659A] focus:border-none",
                  "focus:outline-1 focus:outline-[#D1D1D6] focus:-outline-offset-2",
                  "active:shadow-[0_0_0_2px] active:shadow-[#2B659A]",
                  "data-[invalid=true]:outline-[#DC2625] hidden",
                  className
                )}
                placeholder={placeholder}
                name={field.name}
                value={field.value?.label ?? field.value ?? ""}
                readOnly
                {...props}
              />

              <SelectContent>
                {optionList.map((currentOption) => (
                  <SelectItem
                    key={currentOption.value}
                    value={currentOption.value}
                  >
                    {currentOption.label ?? currentOption.value}
                  </SelectItem>
                ))}
              </SelectContent>
            </div>
            {errors[field.name]?.message && (
              <span className="text-[#DC2625] font-normal text-sm leading-[1.3125rem] ">
                {errors[field.name]?.message as string}
              </span>
            )}
          </div>
        </Select>
      )}
    />
  );
}
