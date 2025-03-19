// src/components/ui/Chart.tsx
import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import styles from "./Chart.module.scss";

interface ChartProps {
  data: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      color: string;
    }[];
  };
  height?: number;
  type?: "bar" | "line";
  className?: string;
}

const Chart: React.FC<ChartProps> = ({
  data,
  height = 300,
  type = "bar",
  className = "",
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Set canvas dimensions
    canvas.width = canvas.offsetWidth;
    canvas.height = height;

    // Calculate dimensions
    const padding = 40;
    const chartWidth = canvas.width - padding * 2;
    const chartHeight = canvas.height - padding * 2;

    // Draw axes
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, canvas.height - padding);
    ctx.lineTo(canvas.width - padding, canvas.height - padding);
    ctx.strokeStyle = "#e2e8f0";
    ctx.stroke();

    // Draw axis labels
    ctx.fillStyle = "#64748b";
    ctx.font = "12px Inter, sans-serif";
    ctx.textAlign = "center";

    // X-axis labels
    const xStep = chartWidth / (data.labels.length - 1);
    data.labels.forEach((label, i) => {
      const x = padding + i * xStep;
      ctx.fillText(label, x, canvas.height - padding + 20);
    });

    // Y-axis labels
    const maxValue = Math.max(...data.datasets.flatMap((ds) => ds.data));
    const yStep = chartHeight / 5;

    for (let i = 0; i <= 5; i++) {
      const y = canvas.height - padding - i * yStep;
      const value = ((maxValue / 5) * i).toFixed(0);
      ctx.fillText(value, padding - 20, y + 5);

      // Draw grid line
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(canvas.width - padding, y);
      ctx.strokeStyle = "#e2e8f0";
      ctx.stroke();
    }

    // Draw data
    data.datasets.forEach((dataset, datasetIndex) => {
      const yScale = chartHeight / maxValue;

      if (type === "line") {
        // Draw line
        ctx.beginPath();
        dataset.data.forEach((value, i) => {
          const x = padding + i * xStep;
          const y = canvas.height - padding - value * yScale;

          if (i === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        });
        ctx.strokeStyle = dataset.color;
        ctx.lineWidth = 2;
        ctx.stroke();

        // Draw points
        dataset.data.forEach((value, i) => {
          const x = padding + i * xStep;
          const y = canvas.height - padding - value * yScale;

          ctx.beginPath();
          ctx.arc(x, y, 4, 0, Math.PI * 2);
          ctx.fillStyle = dataset.color;
          ctx.fill();
        });
      } else {
        // Draw bars
        const barWidth = xStep / (data.datasets.length + 1);

        dataset.data.forEach((value, i) => {
          const x =
            padding + i * xStep - barWidth / 2 + datasetIndex * barWidth;
          const y = canvas.height - padding - value * yScale;

          ctx.fillStyle = dataset.color;
          ctx.fillRect(x, y, barWidth, value * yScale);
        });
      }
    });
  }, [data, height, type]);

  return (
    <div className={`${styles.chart} ${className}`}>
      <motion.canvas
        ref={canvasRef}
        className={styles.chart__canvas}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      />
    </div>
  );
};

export default Chart;
