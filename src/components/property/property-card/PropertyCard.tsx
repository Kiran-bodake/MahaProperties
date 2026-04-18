"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin, Ruler, Eye, Heart, CheckCircle, Phone } from "lucide-react";
import { Badge }  from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn, formatPrice, formatPriceRange, categoryLabel } from "@/lib/utils";
import { usePropertyStore } from "@/store/property.store";
import type { Property } from "@/types/property";
import styles from "./property-card.module.scss";

export function PropertyCard({ property, index = 0 }: { property: Property; index?: number }) {
  const [imgLoaded, setImgLoaded] = useState(false);
  const { toggleSaved, isSaved }  = usePropertyStore();
  const saved       = isSaved(property._id);
  const primaryImg  = property.images.find((i) => i.isPrimary) ?? property.images[0];

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      className={styles.card}
    >
      <div className={styles.imageWrap}>
        {!imgLoaded && <div className={styles.imageSkeleton} />}
        {primaryImg && (
          <Image
            src={primaryImg.url} alt={property.title} fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className={cn(styles.image, imgLoaded && styles.imageLoaded)}
            onLoad={() => setImgLoaded(true)}
          />
        )}
        <div className={styles.topLeft}>
          {property.isRERA        && <Badge variant="rera"           icon={<CheckCircle />}>RERA</Badge>}
          {property.isZeroBrokerage && <Badge variant="zero-brokerage">Zero Brokerage</Badge>}
        </div>
        <button
          onClick={(e) => { e.preventDefault(); toggleSaved(property._id); }}
          className={cn(styles.saveBtn, saved && "bg-red-50")}
        >
          <Heart className={cn(styles.heartIcon, saved && styles.heartActive)} />
        </button>
        <div className={styles.bottomLeft}>
          <span className={styles.categoryPill}>{categoryLabel(property.category)}</span>
        </div>
      </div>

      <div className={styles.content}>
        <Link href={`/properties/${property.slug}`} className={styles.titleLink}>
          <h3 className={styles.title}>{property.title}</h3>
        </Link>
        <div className={styles.location}>
          <MapPin className={styles.locationIcon} />
          <span>{property.locality}, {property.city}</span>
        </div>
        <p className={styles.price}>
          {property.priceMin && property.priceMax
            ? formatPriceRange(property.priceMin, property.priceMax)
            : formatPrice(property.price)}
        </p>
        <div className={styles.meta}>
          <span className={styles.metaItem}><Ruler className={styles.metaIcon} />{property.area.toLocaleString()} {property.areaUnit}</span>
          <span className={styles.metaItem}><Eye className={styles.metaIcon} />{property.views} views</span>
        </div>
        <div className={styles.actions}>
          <Link href={`/properties/${property.slug}`} className="flex-1">
            <Button variant="secondary" size="sm" className="w-full">View Details</Button>
          </Link>
          <Button size="sm" className="flex-1" leftIcon={<Phone className="w-3.5 h-3.5" />}>Contact</Button>
        </div>
      </div>
    </motion.article>
  );
}
