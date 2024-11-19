"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm  transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-[#0057A6] text-[#FFFFFF] !font-semibold text-sm leading-[1.3125rem] text-center shadow hover:bg-[#2B659A]",
        secondary:
          "bg-[#D9EBFE] text-[#18181B] !font-semibold text-sm leading-[1.3125rem] text-center shadow hover:bg-[#F4F4F5]",
        link: "underline-offset-2  hover:underline hover:decoration-solid text-[#18181B] !font-medium text-sm leading-[1.5rem] text-center",
      },
      size: {
        default: "h-[2.3125rem] py-2 px-4",
        linkButton: "h-[2.3125rem] py-2 mr-4",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  type: "submit" | "reset" | "button";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
