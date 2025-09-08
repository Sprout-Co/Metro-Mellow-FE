import Link from "next/link";
import { BlogCategory } from "@/lib/services/blog";
import styles from "./BlogCategories.module.scss";

interface BlogCategoriesProps {
  categories: BlogCategory[];
}

export default function BlogCategories({ categories }: BlogCategoriesProps) {
  // Convert hex color to RGB for CSS variable
  const hexToRgb = (hex: string) => {
    // Remove # if present
    hex = hex.replace("#", "");

    // Parse hex values
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    return `${r}, ${g}, ${b}`;
  };

  return (
    <div className={styles["blog-categories"]}>
      <div className={styles["blog-categories__container"]}>
        <div className={styles["blog-categories__header"]}>
          <h2 className={styles["blog-categories__title"]}>
            Browse by Category
          </h2>
          <p className={styles["blog-categories__description"]}>
            Find expert advice organized by service type
          </p>
        </div>

        <div className={styles["blog-categories__grid"]}>
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/blog/category/${category.slug}`}
              className={styles["blog-categories__category-card"]}
              style={
                {
                  "--category-color": category.color,
                  "--category-color-rgb": hexToRgb(category.color),
                } as React.CSSProperties
              }
            >
              <div className={styles["blog-categories__icon-wrapper"]}>
                <span className={styles["blog-categories__icon"]}>
                  {category.icon}
                </span>
              </div>

              <div className={styles["blog-categories__content"]}>
                <h3 className={styles["blog-categories__name"]}>
                  {category.name}
                </h3>
                <p className={styles["blog-categories__category-description"]}>
                  {category.description}
                </p>
              </div>

              <div className={styles["blog-categories__footer"]}>
                <div className={styles["blog-categories__post-count"]}>
                  {category.postCount}{" "}
                  {category.postCount === 1 ? "article" : "articles"}
                </div>
                <div className={styles["blog-categories__arrow-wrapper"]}>
                  <span className={styles["blog-categories__arrow"]}>→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
