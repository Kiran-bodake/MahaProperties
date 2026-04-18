import { cn } from "@/lib/utils";
import styles from "./badge.module.scss";

export type BadgeVariant = "default"|"rera"|"featured"|"new"|"sold"|"success"|"warning"|"zero-brokerage";

interface BadgeProps { children: React.ReactNode; variant?: BadgeVariant; className?: string; icon?: React.ReactNode; }

export function Badge({ children, variant = "default", className, icon }: BadgeProps) {
  return (
    <span className={cn(styles.base, styles[variant.replace("-","_") as keyof typeof styles], className)}>
      {icon && <span className={styles.iconSlot}>{icon}</span>}
      {children}
    </span>
  );
}
