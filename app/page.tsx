import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1 className={styles.title}>2005年6月13日 香川県善通寺未解決暴動事件</h1>
        <p className={styles.description}>
          Okutama Game Jam 2026 - Team B
        </p>

        <div className={styles.actions}>
          <Link href="/game" className={styles.button}>
            Start
          </Link>
        </div>
      </main>
    </div>
  );
}
