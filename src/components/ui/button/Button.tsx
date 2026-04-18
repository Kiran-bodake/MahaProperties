"use client";
import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import styles from "./button.module.scss";

const buttonVariants = cva(styles.base, {
  variants: {
    variant: {
      primary: styles.primary, secondary: styles.secondary,
      ghost: styles.ghost,     danger: styles.danger,
      gold: styles.gold,       outline: styles.outline,
    },
    size: { sm: styles.sm, md: styles.md, lg: styles.lg, icon: styles.icon },
  },
  defaultVariants: { variant: "primary", size: "md" },
});

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, loading, leftIcon, rightIcon, children, disabled, ...props }, ref) => (
    <button ref={ref} className={cn(buttonVariants({ variant, size }), className)} disabled={loading ?? disabled} {...props}>
      {loading
        ? <span className={styles.spinner} aria-hidden />
        : leftIcon
          ? <span className="flex items-center">{leftIcon}</span>
          : null}
      {children}
      {!loading && rightIcon && <span className="flex items-center">{rightIcon}</span>}
    </button>
  )
);
Button.displayName = "Button";
