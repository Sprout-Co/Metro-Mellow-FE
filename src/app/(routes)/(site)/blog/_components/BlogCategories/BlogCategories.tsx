import Link from "next/link";
import { BlogCategory } from "@/lib/services/blog";
import styles from "./BlogCategories.module.scss";

interface BlogCategoriesProps {
  categories: BlogCategory[];
}

export default function BlogCategories({ categories }: BlogCategoriesProps) {
  return (
    <div className={styles["blog-categories"]}>
      <div className={styles["blog-categories__container"]}>
        <div className={styles["blog-categories__header"]}>
          <h2 className={styles["blog-categories__title"]}>Browse by Category</h2>
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
              style={{ '--category-color': category.color } as React.CSSProperties}
            >
              <div className={styles["blog-categories__icon"]}>{category.icon}</div>
              <h3 className={styles["blog-categories__name"]}>{category.name}</h3>
              <p className={styles["blog-categories__category-description"]}>{category.description}</p>
              <div className={styles["blog-categories__post-count"]}>
                {category.postCount} {category.postCount === 1 ? 'article' : 'articles'}
              </div>
              <div className={styles["blog-categories__arrow"]}>→</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}