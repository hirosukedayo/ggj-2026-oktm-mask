import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1 className={styles.title}>Project: MASK</h1>
        <p className={styles.description}>
          Okutama Game Jam 2026 - Team B
        </p>

        <div className={styles.actions}>
          <Link href="/game" className={styles.button}>
            Start Investigation
          </Link>
        </div>
      </main>
    </div>
  );
}
