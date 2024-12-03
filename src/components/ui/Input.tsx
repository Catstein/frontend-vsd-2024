"use client";

import { cn } from "@/lib/utils";
import { FocusEvent, ChangeEvent, ComponentProps } from "react";
import { Control, Controller } from "react-hook-form";

export interface InputProps extends ComponentProps<"input"> {
  name: string;
  title?: string;
  subtitle?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  onChangeHandler?(
    event: ChangeEvent<HTMLInputElement>
  ): ChangeEvent<HTMLInputElement>;
  onBlurHandler?(
    event: FocusEvent<HTMLInputElement>
  ): FocusEvent<HTMLInputElement>;
  changeValueOnChange?: boolean;
  changeValueOnBlur?: boolean;
}

export function Input({
  title,
  subtitle,
  type,
  className,
  control,
  name,
  onChangeHandler,
  onBlurHandler,
  changeValueOnChange = true,
  changeValueOnBlur = true,
  ...props
}: InputProps) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { invalid }, formState: { errors } }) => (
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
            className="data-[invalid=true]:border-[#DC2625] data-[invalid=true]:border-[1px] rounded-md"
          >
            <input
              id={name}
              data-invalid={invalid}
              type={type}
              className={cn(
                "bg-[#FFFFFF] leading-[1.3125rem] placeholder:text-[#70707B] flex h-11 w-full rounded-md px-3 py-1 text-base shadow-sm transition-colors focus-visible:ring-1  disabled:cursor-not-allowed disabled:opacity-50 md:text-sm border-[1px] border-[#D1D1D6]",
                "focus:shadow-[0_0_0_2px] focus:shadow-[#2B659A] focus:border-none",
                "focus:outline-1 focus:outline-[#D1D1D6] focus:-outline-offset-2",
                "active:shadow-[0_0_0_2px] active:shadow-[#2B659A]",
                "data-[invalid=true]:outline-[#DC2625]",
                className
              )}
              placeholder={props.placeholder}
              ref={field.ref}
              name={field.name}
              onChange={(event) => {
                if (onChangeHandler) {
                  event = onChangeHandler(event);
                }
                if (changeValueOnChange === true) {
                  field.onChange(event.target.value);
                }
              }}
              onBlur={(event) => {
                if (onBlurHandler) {
                  event = onBlurHandler(event);
                }
                if (changeValueOnBlur === true) {
                  field.onChange(event.target.value);
                }
              }}
              value={field.value ?? ""}
            />
          </div>
          {errors[field.name]?.message && (
            <span className="text-[#DC2625] font-normal text-sm leading-[1.3125rem] ">
              {errors[field.name]?.message as string}
            </span>
          )}
        </div>
      )}
    />
  );
}
