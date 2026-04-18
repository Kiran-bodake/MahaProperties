import Link from "next/link";
import { cn } from "@/lib/utils";
import styles from "./logo.module.scss";

interface LogoProps { className?: string; variant?: "default"|"light"|"dark"; size?: "sm"|"md"|"lg"; }

export function Logo({ className, variant = "default", size = "md" }: LogoProps) {
  return (
    <Link href="/" className={cn(styles.wrapper, styles[variant], styles[size], className)}>
      <div className={styles.iconWrap}>
        <div className={styles.iconBack} />
        <div className={styles.iconFront} />
        <span className={styles.iconLetter}>P</span>
      </div>
      <div className={styles.textWrap}>
        <span className={styles.name}>Prop<span className={styles.accent}>Vista</span></span>
        <span className={styles.sub}>Nashik Properties</span>
      </div>
    </Link>
  );
}
