import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const alertVariants = cva(
  "relative w-full rounded-lg border p-4 text-sm [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground [&>svg~*]:pl-7",
  {
    variants: {
      variant: {
        default: "bg-[hsl(0,0%,9%)] text-[var(--white-2)] border-[hsla(0,0%,100%,0.1)]",
        success:
          "bg-[hsla(120,40%,10%,0.6)] text-[hsl(120,60%,75%)] border-[hsla(120,50%,50%,0.3)] [&>svg]:text-[hsl(120,60%,65%)]",
        warning:
          "bg-[hsla(45,100%,72%,0.08)] text-[var(--orange-yellow-crayola)] border-[hsla(45,100%,72%,0.3)] [&>svg]:text-[var(--orange-yellow-crayola)]",
        destructive:
          "bg-[hsla(0,50%,12%,0.6)] text-[hsl(0,80%,75%)] border-[hsla(0,60%,50%,0.3)] [&>svg]:text-[hsl(0,80%,65%)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    role="alert"
    className={cn(alertVariants({ variant }), className)}
    {...props}
  />
));
Alert.displayName = "Alert";

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn("mb-1 font-semibold leading-none tracking-tight", className)}
    {...props}
  />
));
AlertTitle.displayName = "AlertTitle";

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-xs [&_p]:leading-relaxed text-[var(--light-gray-70)]", className)}
    {...props}
  />
));
AlertDescription.displayName = "AlertDescription";

export { Alert, AlertTitle, AlertDescription };
