"use client";
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";
import type { Property } from "@/types/property";
import styles from "./property-grid.module.scss";

const PropertyCard = dynamic(
  () => import("@/components/property/property-card").then((m) => ({ default: m.PropertyCard })),
  { ssr: false }
);

interface PropertyGridProps { properties: Property[]; isLoading?: boolean; skeletonCount?: number; }

export function PropertyGrid({ properties, isLoading, skeletonCount = 6 }: PropertyGridProps) {
  if (isLoading) {
    return (
      <div className={styles.grid}>
        {Array.from({ length: skeletonCount }).map((_, i) => <Skeleton key={i} variant="card" />)}
      </div>
    );
  }
  if (!properties.length) {
    return (
      <div className={styles.empty}>
        <div className={styles.emptyIcon}>🏘️</div>
        <h3 className={styles.emptyTitle}>No properties found</h3>
        <p className={styles.emptyText}>Try adjusting your filters.</p>
      </div>
    );
  }
  return (
    <div className={styles.grid}>
      {properties.map((p, i) => <PropertyCard key={p._id} property={p} index={i} />)}
    </div>
  );
}
