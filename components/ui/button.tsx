import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-[var(--orange-yellow-crayola)] text-[var(--smoky-black)] font-semibold hover:brightness-105 shadow-sm active:scale-[0.98] transition-all",
        outline:
          "border border-[hsla(0,0%,100%,0.15)] bg-transparent text-[var(--white-2)] hover:bg-[hsla(0,0%,100%,0.05)] hover:border-[var(--orange-yellow-crayola)]",
        secondary:
          "bg-[var(--onyx)] text-[var(--white-2)] hover:bg-[var(--jet)]",
        ghost:
          "text-[var(--light-gray)] hover:bg-[hsla(0,0%,100%,0.06)] hover:text-[var(--white-2)]",
        link: "text-[var(--orange-yellow-crayola)] underline-offset-4 hover:underline",
        shimmer:
          "shimmer-btn bg-[var(--orange-yellow-crayola)] text-[var(--smoky-black)] font-semibold active:scale-[0.98]",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-11 rounded-md px-8 text-base",
        icon: "h-10 w-10",
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
