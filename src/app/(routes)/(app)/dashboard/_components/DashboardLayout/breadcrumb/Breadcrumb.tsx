import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { ChevronRight, Home } from "lucide-react";
import styles from "./Breadcrumb.module.scss";

export interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: React.ReactNode;
}

interface BreadcrumbProps {
  items?: BreadcrumbItem[];
  separator?: React.ReactNode;
  showHomeIcon?: boolean;
  className?: string;
  autoGenerate?: boolean;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items,
  separator = <ChevronRight size={16} />,
  showHomeIcon = true,
  className = "",
  autoGenerate = true,
}) => {
  const pathname = usePathname();

  // Generate breadcrumb items from pathname if autoGenerate is true and no items provided
  const breadcrumbItems = React.useMemo(() => {
    if (items) return items;

    if (!autoGenerate) return [];

    const pathSegments = pathname.split("/").filter(Boolean);
    const generatedItems: BreadcrumbItem[] = [];

    // Add home item
    generatedItems.push({ label: "Home", href: "/" });

    // Build breadcrumb items from path segments
    let currentPath = "";
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`;

      // Convert segment to readable label
      const label = segment
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

      // Don't add href for the last item (current page)
      const isLast = index === pathSegments.length - 1;
      generatedItems.push({
        label,
        href: isLast ? undefined : currentPath,
      });
    });

    return generatedItems;
  }, [pathname, items, autoGenerate]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  return (
    <nav
      className={`${styles.breadcrumb} ${className}`}
      aria-label="Breadcrumb navigation"
    >
      <motion.ol
        className={styles.breadcrumb__list}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {breadcrumbItems.map((item, index) => {
          const isLast = index === breadcrumbItems.length - 1;
          const isFirst = index === 0;

          return (
            <motion.li
              key={`${item.label}-${index}`}
              className={styles.breadcrumb__item}
              variants={itemVariants}
            >
              {/* Item content */}
              {item.href && !isLast ? (
                <Link href={item.href} className={styles.breadcrumb__link}>
                  <motion.span
                    className={styles.breadcrumb__linkContent}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {isFirst && showHomeIcon && !item.icon && (
                      <Home size={16} className={styles.breadcrumb__homeIcon} />
                    )}
                    {item.icon && (
                      <span className={styles.breadcrumb__icon}>
                        {item.icon}
                      </span>
                    )}
                    <span className={styles.breadcrumb__label}>
                      {item.label}
                    </span>
                  </motion.span>
                </Link>
              ) : (
                <span
                  className={`${styles.breadcrumb__current} ${
                    isLast ? styles["breadcrumb__current--active"] : ""
                  }`}
                  aria-current={isLast ? "page" : undefined}
                >
                  {isFirst && showHomeIcon && !item.icon && (
                    <Home size={16} className={styles.breadcrumb__homeIcon} />
                  )}
                  {item.icon && (
                    <span className={styles.breadcrumb__icon}>{item.icon}</span>
                  )}
                  <span className={styles.breadcrumb__label}>{item.label}</span>
                </span>
              )}

              {/* Separator */}
              {!isLast && (
                <span
                  className={styles.breadcrumb__separator}
                  aria-hidden="true"
                >
                  {separator}
                </span>
              )}
            </motion.li>
          );
        })}
      </motion.ol>
    </nav>
  );
};

// Example usage component for demonstration
export const BreadcrumbExample: React.FC = () => {
  const breadcrumbItems: BreadcrumbItem[] = [
    { label: "Home", href: "/" },
    { label: "Dashboard", href: "/dashboard" },
    { label: "Services", href: "/dashboard/services" },
    { label: "Cleaning", href: "/dashboard/services/cleaning" },
    { label: "Book Service" },
  ];

  const simpleBreadcrumb: BreadcrumbItem[] = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Profile Settings" },
  ];

  return (
    <div style={{ padding: "2rem", backgroundColor: "#f5f5f5" }}>
      <h3 style={{ marginBottom: "1rem" }}>Default Breadcrumb</h3>
      <Breadcrumb items={breadcrumbItems} />

      <h3 style={{ marginTop: "2rem", marginBottom: "1rem" }}>
        Simple Breadcrumb
      </h3>
      <Breadcrumb items={simpleBreadcrumb} showHomeIcon={false} />

      <h3 style={{ marginTop: "2rem", marginBottom: "1rem" }}>
        Custom Separator
      </h3>
      <Breadcrumb
        items={simpleBreadcrumb}
        separator={<span style={{ margin: "0 8px" }}>/</span>}
      />
    </div>
  );
};

export default Breadcrumb;
