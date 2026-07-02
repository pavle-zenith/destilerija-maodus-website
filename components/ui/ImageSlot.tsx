import Image from "next/image";
import styles from "./ImageSlot.module.css";

type Props = {
  /** provide once real photography exists; otherwise a styled placeholder renders */
  src?: string;
  alt?: string;
  label?: string;
  ratio?: string;
  height?: number;
  className?: string;
  sizes?: string;
};

/**
 * Placeholder for the design's user-fillable image slots (about photo, blog
 * thumbnails). Swap in real photography by passing `src` (or wiring to Sanity).
 */
export function ImageSlot({
  src,
  alt = "",
  label,
  ratio,
  height,
  className,
  sizes = "100vw",
}: Props) {
  const style: React.CSSProperties = {};
  if (ratio) style.aspectRatio = ratio;
  if (height) style.height = height;

  return (
    <div className={`${styles.slot} ${className ?? ""}`} style={style}>
      {src ? (
        <Image src={src} alt={alt} fill sizes={sizes} className={styles.img} />
      ) : (
        <span className={styles.label}>{label ?? "Foto"}</span>
      )}
    </div>
  );
}
