import React, { ReactNode } from "react";
import { motion } from "framer-motion";
import styles from "./Table.module.scss";

interface TableColumn {
  key: string;
  header: string;
  width?: string;
  render?: (value: any, item: any) => ReactNode;
}

interface TableProps {
  columns: TableColumn[];
  data: any[];
  className?: string;
  onRowClick?: (item: any) => void;
}

const Table: React.FC<TableProps> = ({
  columns,
  data,
  className = "",
  onRowClick,
}) => {
  const rowVariants = {
    hidden: { opacity: 0 },
    visible: (i: number) => ({
      opacity: 1,
      transition: {
        delay: i * 0.05,
      },
    }),
  };

  return (
    <div className={`${styles.table_container} ${className}`}>
      <table className={styles.table}>
        <thead className={styles.table__head}>
          <tr className={styles.table__row}>
            {columns.map((column) => (
              <th
                key={column.key}
                className={styles.table__header}
                style={{ width: column.width }}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className={styles.table__body}>
          {data.map((item, index) => (
            <motion.tr
              key={index}
              className={styles.table__row}
              custom={index}
              initial="hidden"
              animate="visible"
              variants={rowVariants}
              onClick={() => onRowClick && onRowClick(item)}
              whileHover={{ backgroundColor: "rgba(0, 0, 0, 0.02)" }}
            >
              {columns.map((column) => (
                <td
                  key={`${index}-${column.key}`}
                  className={styles.table__cell}
                >
                  {column.render
                    ? column.render(item[column.key], item)
                    : item[column.key]}
                </td>
              ))}
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
