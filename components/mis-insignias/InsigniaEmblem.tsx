import { Sparkle, Star } from "lucide-react";
import styles from "./insignia.module.css";

export function InsigniaEmblem({
  siglas,
  resultado,
}: {
  siglas: string;
  resultado: number;
}) {
  return (
    <div aria-hidden="true" className={styles.emblem}>
      <div className={styles.glow} />
      <div className={styles.shield}>
        <div className={styles.gold} />
        <div className={styles.enamel} />
        <div className={styles.inset} />
      </div>
      <div className={styles.medallion}><span>{siglas}</span></div>
      <div className={styles.stars}>
        <Star fill="currentColor" strokeWidth={0} />
        <Star fill="currentColor" strokeWidth={0} />
        <Star fill="currentColor" strokeWidth={0} />
      </div>
      <Sparkle className={styles.sparkleTop} fill="currentColor" strokeWidth={0} />
      <Sparkle className={styles.sparkleLight} fill="currentColor" strokeWidth={0} />
      <Sparkle className={styles.sparkleLeft} fill="currentColor" strokeWidth={0} />
      <Sparkle className={styles.sparkleRight} fill="currentColor" strokeWidth={0} />
      <div className={styles.ribbon}><span>{resultado} %</span></div>
    </div>
  );
}
