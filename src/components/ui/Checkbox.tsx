"use client";

import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { cn } from "@/lib/utils";
import { Control, Controller } from "react-hook-form";
import { CheckIcon } from "lucide-react";

interface CheckboxProps
  extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> {
  name: string;
  title?: string;
  subtitle?: string;
  message?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  possibleValues: {
    checked: string;
    unchecked: string;
  };
  disabled?: boolean;
}

export function Checkbox({
  title,
  subtitle,
  message,
  className,
  control,
  name,
  possibleValues,
  disabled = false,
}: CheckboxProps) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { invalid }, formState: { errors } }) => (
        <div className="flex flex-col gap-2 w-full">
          {title && (
            <label
              // htmlFor={name}
              className="font-semibold text-sm leading-[1.3125rem] text-[#18181B]"
            >
              {title}{" "}
              {subtitle && (
                <span className="font-normal text-[#51525C]">{subtitle}</span>
              )}
            </label>
          )}
          <div className="flex items-center gap-2">
            <div
              data-invalid={invalid}
              className="data-[invalid=true]:border-[#DC2625] data-[invalid=true]:border-[1px] rounded-[0.125rem]"
            >
              <CheckboxPrimitive.Root
                id={name}
                data-invalid={invalid}
                className={cn(
                  "peer shrink-0 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground leading-[1.3125rem] flex rounded-[0.125rem] bg-transparent w-[0.875rem] h-[0.875rem] max-w-[0.875rem] max-h-[0.875rem] text-base shadow-sm transition-colors file:bg-transparent focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm border-[1px] border-[#D1D1D6]",
                  "focus:shadow-[0_0_0_2px] focus:shadow-[#2B659A] focus:border-none",
                  "focus:outline-1 focus:outline-[#D1D1D6] focus:-outline-offset-2",
                  "active:shadow-[0_0_0_2px] active:shadow-[#2B659A]",
                  "data-[invalid=true]:outline-[#DC2625]",
                  className
                )}
                ref={field.ref}
                name={field.name}
                checked={field.value === possibleValues.checked}
                onCheckedChange={(checked) => {
                  field.onChange(
                    checked === true
                      ? possibleValues.checked
                      : possibleValues.unchecked
                  );
                }}
                disabled={disabled}
              >
                <CheckboxPrimitive.Indicator
                  className={cn(
                    "flex items-center justify-center text-current w-full h-full"
                  )}
                >
                  <CheckIcon className="h-3 w-3" />
                </CheckboxPrimitive.Indicator>
              </CheckboxPrimitive.Root>
            </div>

            {message && (
              <label
                htmlFor={name}
                className="cursor-pointer font-medium text-sm leading-[0.875rem] text-[#000000]"
              >
                {message}
              </label>
            )}
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
