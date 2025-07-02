import { render, screen } from "@testing-library/react";
import MetricCard from "../MetricCard";

// Mock framer-motion
jest.mock("framer-motion", () => ({
  motion: {
    div: ({ children, className, ...props }: any) => (
      <div className={className}>{children}</div>
    ),
  },
}));

describe("MetricCard", () => {
  const defaultProps = {
    title: "Test Metric",
    value: "100",
    icon: "$",
    progress: {
      current: 75,
      total: 100,
      label: "Test Progress",
    },
    color: "primary" as const,
  };

  it("renders with all required props", () => {
    render(<MetricCard {...defaultProps} />);

    expect(screen.getByText("Test Metric")).toBeInTheDocument();
    expect(screen.getByText("100")).toBeInTheDocument();
    expect(screen.getByText("$")).toBeInTheDocument();
  });

  it("displays progress information correctly", () => {
    render(<MetricCard {...defaultProps} />);

    expect(screen.getByText("Test Progress")).toBeInTheDocument();
    expect(screen.getByText("75 / 100")).toBeInTheDocument();
  });

  it("applies correct color classes", () => {
    const { rerender } = render(
      <MetricCard {...defaultProps} color="primary" />
    );

    const metricCard = screen.getByText("Test Metric").closest(".metric_card");
    expect(metricCard).toHaveClass("metric_card--primary");

    rerender(<MetricCard {...defaultProps} color="secondary" />);
    expect(metricCard).toHaveClass("metric_card--secondary");

    rerender(<MetricCard {...defaultProps} color="success" />);
    expect(metricCard).toHaveClass("metric_card--success");

    rerender(<MetricCard {...defaultProps} color="info" />);
    expect(metricCard).toHaveClass("metric_card--info");
  });

  it("calculates progress percentage correctly", () => {
    const propsWithProgress = {
      ...defaultProps,
      progress: {
        current: 80,
        total: 100,
        label: "Progress Test",
      },
    };

    render(<MetricCard {...propsWithProgress} />);

    expect(screen.getByText("80 / 100")).toBeInTheDocument();
    expect(screen.getByText("Progress Test")).toBeInTheDocument();
  });

  it("handles edge case with zero total", () => {
    const propsWithZeroTotal = {
      ...defaultProps,
      progress: {
        current: 10,
        total: 0,
        label: "Zero Total",
      },
    };

    render(<MetricCard {...propsWithZeroTotal} />);

    expect(screen.getByText("10 / 0")).toBeInTheDocument();
    expect(screen.getByText("Zero Total")).toBeInTheDocument();
  });

  it("handles progress over 100%", () => {
    const propsWithOverProgress = {
      ...defaultProps,
      progress: {
        current: 150,
        total: 100,
        label: "Over 100%",
      },
    };

    render(<MetricCard {...propsWithOverProgress} />);

    expect(screen.getByText("150 / 100")).toBeInTheDocument();
    expect(screen.getByText("Over 100%")).toBeInTheDocument();
  });

  it("renders with different value formats", () => {
    const { rerender } = render(<MetricCard {...defaultProps} value="24/38" />);
    expect(screen.getByText("24/38")).toBeInTheDocument();

    rerender(<MetricCard {...defaultProps} value="72.4%" />);
    expect(screen.getByText("72.4%")).toBeInTheDocument();

    rerender(<MetricCard {...defaultProps} value="$1,234" />);
    expect(screen.getByText("$1,234")).toBeInTheDocument();
  });

  it("renders with different icons", () => {
    const { rerender } = render(<MetricCard {...defaultProps} icon="↑" />);
    expect(screen.getByText("↑")).toBeInTheDocument();

    rerender(<MetricCard {...defaultProps} icon="□" />);
    expect(screen.getByText("□")).toBeInTheDocument();

    rerender(<MetricCard {...defaultProps} icon="%" />);
    expect(screen.getByText("%")).toBeInTheDocument();
  });

  it("renders without progress when not provided", () => {
    const propsWithoutProgress = {
      title: "Simple Metric",
      value: "42",
      icon: "♦",
      color: "primary" as const,
    };

    render(<MetricCard {...propsWithoutProgress} />);

    expect(screen.getByText("Simple Metric")).toBeInTheDocument();
    expect(screen.getByText("42")).toBeInTheDocument();
    expect(screen.getByText("♦")).toBeInTheDocument();

    // Should not have progress elements
    expect(screen.queryByText("/")).not.toBeInTheDocument();
  });

  it("renders with decimal progress values", () => {
    const propsWithDecimal = {
      ...defaultProps,
      progress: {
        current: 72.4,
        total: 100,
        label: "Decimal Progress",
      },
    };

    render(<MetricCard {...propsWithDecimal} />);

    expect(screen.getByText("72.4 / 100")).toBeInTheDocument();
    expect(screen.getByText("Decimal Progress")).toBeInTheDocument();
  });
});
