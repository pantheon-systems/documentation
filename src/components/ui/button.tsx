import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "../../lib/utils";
import styles from "./button.module.css";

type ButtonVariant = "primary" | "secondary" | "violet";
type ButtonSize = "large" | "small" | "icon" | "full";

function Button({
  className,
  variant = "primary",
  size = "small",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  asChild?: boolean;
}) {
  const Comp = asChild ? Slot : "button";

  const buttonClasses = cn(
    styles.button,
    styles[variant],
    styles[size],
    className
  );

  return <Comp data-slot="button" className={buttonClasses} {...props} />;
}

export { Button };
