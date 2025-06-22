import React, { ReactNode, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./Table.module.scss";

interface TableColumn {
  key: string;
  header: string;
  width?: string;
  sortable?: boolean;
  render?: (value: any, item: any, index: number) => ReactNode;
}

interface TableProps {
  columns: TableColumn[];
  data: any[];
  className?: string;
  onRowClick?: (item: any) => void;
  loading?: boolean;
  selectable?: boolean;
  onSelectionChange?: (selectedItems: any[]) => void;
  pagination?: {
    enabled: boolean;
    pageSize?: number;
    showSizeSelector?: boolean;
  };
  emptyState?: {
    icon?: string;
    message?: string;
    submessage?: string;
  };
  highlightOnHover?: boolean;
}

const Table: React.FC<TableProps> = ({
  columns,
  data,
  className = "",
  onRowClick,
  loading = false,
  selectable = false,
  onSelectionChange,
  pagination = { enabled: false, pageSize: 10 },
  emptyState = {
    icon: "📋",
    message: "No data available",
    submessage: "Try adjusting your filters or search criteria",
  },
  highlightOnHover = true,
}) => {
  const [sortConfig, setSortConfig] = useState<{
    key: string | null;
    direction: "asc" | "desc";
  }>({ key: null, direction: "asc" });

  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(pagination.pageSize || 10);

  // Sorting logic
  const sortedData = useMemo(() => {
    if (!sortConfig.key) return data;

    const sorted = [...data].sort((a, b) => {
      const aValue = a[sortConfig.key!];
      const bValue = b[sortConfig.key!];

      if (aValue === null || aValue === undefined) return 1;
      if (bValue === null || bValue === undefined) return -1;

      if (aValue < bValue) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
      return 0;
    });

    return sorted;
  }, [data, sortConfig]);

  // Pagination logic
  const paginatedData = useMemo(() => {
    if (!pagination.enabled) return sortedData;

    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return sortedData.slice(startIndex, endIndex);
  }, [sortedData, currentPage, pageSize, pagination.enabled]);

  const totalPages = Math.ceil(sortedData.length / pageSize);

  const handleSort = (key: string) => {
    if (!columns.find((col) => col.key === key)?.sortable) return;

    setSortConfig((prevConfig) => ({
      key,
      direction:
        prevConfig.key === key && prevConfig.direction === "asc"
          ? "desc"
          : "asc",
    }));
  };

  const handleSelectAll = () => {
    if (selectedRows.size === paginatedData.length) {
      setSelectedRows(new Set());
    } else {
      const newSelected = new Set(paginatedData.map((_, index) => index));
      setSelectedRows(newSelected);
    }

    if (onSelectionChange) {
      const selectedItems =
        selectedRows.size === paginatedData.length ? [] : paginatedData;
      onSelectionChange(selectedItems);
    }
  };

  const handleSelectRow = (index: number, item: any) => {
    const newSelected = new Set(selectedRows);
    if (newSelected.has(index)) {
      newSelected.delete(index);
    } else {
      newSelected.add(index);
    }
    setSelectedRows(newSelected);

    if (onSelectionChange) {
      const selectedItems = paginatedData.filter((_, i) => newSelected.has(i));
      onSelectionChange(selectedItems);
    }
  };

  const renderSortIcon = (column: TableColumn) => {
    if (!column.sortable) return null;

    const isActive = sortConfig.key === column.key;
    const direction = isActive ? sortConfig.direction : "asc";

    return (
      <span className={styles.table__sort_icon}>
        {direction === "asc" ? "↑" : "↓"}
      </span>
    );
  };

  const rowVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.03,
        duration: 0.3,
        ease: "easeOut",
      },
    }),
    exit: { opacity: 0, y: -20 },
  };

  if (loading) {
    return (
      <div className={`${styles.table} ${className}`}>
        <div className={styles.table__loading}>
          <div className={styles.table__loader}></div>
          <p className={styles.table__loading_text}>Loading data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`${styles.table} ${className}`}>
      <div className={styles.table__wrapper}>
        <table className={styles.table__container}>
          <thead className={styles.table__head}>
            <tr className={styles.table__header_row}>
              {selectable && (
                <th className={styles.table__header} style={{ width: "50px" }}>
                  <label className={styles.table__checkbox}>
                    <input
                      type="checkbox"
                      checked={
                        selectedRows.size === paginatedData.length &&
                        paginatedData.length > 0
                      }
                      onChange={handleSelectAll}
                    />
                    <span className={styles.table__checkbox_mark}></span>
                  </label>
                </th>
              )}
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={`${styles.table__header} ${
                    column.sortable ? styles["table__header--sortable"] : ""
                  } ${
                    sortConfig.key === column.key
                      ? styles["table__header--sorted"]
                      : ""
                  } ${
                    column.key === "actions"
                      ? styles["table__header--actions"]
                      : ""
                  }`}
                  style={{ width: column.width }}
                  onClick={() => column.sortable && handleSort(column.key)}
                >
                  {column.header}
                  {renderSortIcon(column)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className={styles.table__body}>
            <AnimatePresence>
              {paginatedData.length === 0 ? (
                <tr>
                  <td
                    colSpan={columns.length + (selectable ? 1 : 0)}
                    className={styles.table__empty}
                  >
                    <div className={styles.table__empty_icon}>
                      {emptyState.icon}
                    </div>
                    <p className={styles.table__empty_message}>
                      {emptyState.message}
                    </p>
                    <p className={styles.table__empty_submessage}>
                      {emptyState.submessage}
                    </p>
                  </td>
                </tr>
              ) : (
                paginatedData.map((item, index) => (
                  <motion.tr
                    key={index}
                    className={`${styles.table__row} ${
                      onRowClick && highlightOnHover
                        ? styles["table__row--clickable"]
                        : ""
                    } ${
                      selectedRows.has(index)
                        ? styles["table__row--selected"]
                        : ""
                    }`}
                    custom={index}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={rowVariants}
                    onClick={() => onRowClick && onRowClick(item)}
                  >
                    {selectable && (
                      <td
                        className={styles.table__cell}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <label className={styles.table__checkbox}>
                          <input
                            type="checkbox"
                            checked={selectedRows.has(index)}
                            onChange={() => handleSelectRow(index, item)}
                          />
                          <span className={styles.table__checkbox_mark}></span>
                        </label>
                      </td>
                    )}
                    {columns.map((column) => (
                      <td
                        key={`${index}-${column.key}`}
                        className={`${styles.table__cell} ${
                          column.key === "actions"
                            ? styles["table__cell--actions"]
                            : ""
                        }`}
                      >
                        {column.render
                          ? column.render(item[column.key], item, index)
                          : item[column.key]}
                      </td>
                    ))}
                  </motion.tr>
                ))
              )}
            </AnimatePresence>
          </tbody>
        </table>
      </div>

      {pagination.enabled && sortedData.length > 0 && (
        <div className={styles.table__pagination}>
          <div className={styles.table__pagination_info}>
            Showing {(currentPage - 1) * pageSize + 1} to{" "}
            {Math.min(currentPage * pageSize, sortedData.length)} of{" "}
            {sortedData.length} entries
          </div>
          <div className={styles.table__pagination_controls}>
            <button
              className={styles.table__pagination_button}
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
            >
              First
            </button>
            <button
              className={styles.table__pagination_button}
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Prev
            </button>

            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNumber;
              if (totalPages <= 5) {
                pageNumber = i + 1;
              } else if (currentPage <= 3) {
                pageNumber = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNumber = totalPages - 4 + i;
              } else {
                pageNumber = currentPage - 2 + i;
              }

              return (
                <button
                  key={pageNumber}
                  className={`${styles.table__pagination_button} ${
                    currentPage === pageNumber
                      ? styles["table__pagination_button--active"]
                      : ""
                  }`}
                  onClick={() => setCurrentPage(pageNumber)}
                >
                  {pageNumber}
                </button>
              );
            })}

            <button
              className={styles.table__pagination_button}
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
            <button
              className={styles.table__pagination_button}
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages}
            >
              Last
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Table;
