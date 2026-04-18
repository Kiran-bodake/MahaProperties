import { cn } from "@/lib/utils";
import styles from "./skeleton.module.scss";

interface SkeletonProps { className?: string; variant?: "rect" | "text" | "circle" | "card"; }

export function Skeleton({ className, variant = "rect" }: SkeletonProps) {
  if (variant === "card") {
    return (
      <div className={styles.card}>
        <div className={styles.image} />
        <div className={styles.content}>
          <div className={cn(styles.base, styles.text, "w-3/4")} />
          <div className={cn(styles.base, styles.text, "w-1/2")} />
          <div className={cn(styles.base, styles.text, "w-1/3 h-6")} />
          <div className={styles.actions}>
            <div className={cn(styles.base, "h-9 flex-1 rounded-xl")} />
            <div className={cn(styles.base, "h-9 flex-1 rounded-xl")} />
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className={cn(
      styles.base,
      variant === "circle" && styles.circle,
      variant === "text"   && styles.text,
      variant === "rect"   && styles.rect,
      className
    )} />
  );
}
