"use client";

import { ComponentProps } from "react";
import { Button } from "./ui/Button";

interface ToggleOptionProps extends ComponentProps<"button"> {
  disabled?: boolean;
  isSelected: boolean;
  text: string;
}

export function ToggleOption({
  disabled,
  isSelected,
  text,
  ...props
}: ToggleOptionProps) {
  return (
    <Button
      disabled={disabled}
      data-isselected={isSelected}
      type="button"
      variant={"rounded"}
      {...props}
    >
      {text}
    </Button>
  );
}
