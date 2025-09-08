import Image from "next/image";
import styles from "./BlogHero.module.scss";

export default function BlogHero() {
  return (
    <div className={styles["blog-hero"]}>
      <div className={styles["blog-hero__container"]}>
        <div className={styles["blog-hero__content"]}>
          <h1 className={styles["blog-hero__title"]}>
            Home Services{" "}
            <span className={styles["blog-hero__highlight"]}>Expert Tips</span>
          </h1>
          <p className={styles["blog-hero__description"]}>
            Get professional advice, tips, and insights for managing your Lagos
            home. From cleaning and laundry to cooking and pest control, our
            experts share their knowledge to help you maintain a beautiful,
            comfortable home.
          </p>
          <div className={styles["blog-hero__stats"]}>
            <div className={styles["blog-hero__stat"]}>
              <span className={styles["blog-hero__stat-number"]}>50+</span>
              <span className={styles["blog-hero__stat-label"]}>
                Expert Articles
              </span>
            </div>
            <div className={styles["blog-hero__stat"]}>
              <span className={styles["blog-hero__stat-number"]}>6</span>
              <span className={styles["blog-hero__stat-label"]}>
                Service Categories
              </span>
            </div>
            <div className={styles["blog-hero__stat"]}>
              <span className={styles["blog-hero__stat-number"]}>1000+</span>
              <span className={styles["blog-hero__stat-label"]}>
                Helpful Tips
              </span>
            </div>
          </div>
        </div>
        <div className={styles["blog-hero__visual"]}>
          <div className={styles["blog-hero__image-container"]}>
            <Image
              src="/images/blog/blog-hero.jpg"
              alt="Home services expert tips and guides for Lagos homes"
              className={styles["blog-hero__hero-image"]}
              priority
              width={500}
              height={500}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
