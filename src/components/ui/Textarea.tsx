import { cn } from "@/lib/utils";
import { ChangeEvent, ComponentProps, FocusEvent } from "react";
import { Control, Controller } from "react-hook-form";

interface TextAreaProps extends ComponentProps<"textarea"> {
  name: string;
  title?: string;
  subtitle?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  onChangeHandler?(
    event: ChangeEvent<HTMLTextAreaElement>
  ): ChangeEvent<HTMLTextAreaElement>;
  onBlurHandler?(
    event: FocusEvent<HTMLTextAreaElement>
  ): FocusEvent<HTMLTextAreaElement>;
  changeValueOnChange?: boolean;
  changeValueOnBlur?: boolean;
}

export function Textarea({
  name,
  title,
  subtitle,
  control,
  onChangeHandler,
  onBlurHandler,
  changeValueOnChange = true,
  changeValueOnBlur = true,
  className,
  ...props
}: TextAreaProps) {
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
            <textarea
              id={name}
              data-invalid={invalid}
              className={cn(
                "leading-[1.3125rem] placeholder:text-[#70707B] flex w-full rounded-md bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:bg-transparent focus-visible:ring-1  disabled:cursor-not-allowed disabled:opacity-50 md:text-sm border-[1px] border-[#D1D1D6] resize-none",
                "focus:shadow-[0_0_0_2px] focus:shadow-[#2B659A] focus:border-none",
                "focus:outline-1 focus:outline-[#D1D1D6] focus:-outline-offset-2",
                "active:shadow-[0_0_0_2px] active:shadow-[#2B659A]",
                "data-[invalid=true]:outline-[#DC2625]",
                className
              )}
              placeholder={props.placeholder}
              rows={props.rows}
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
