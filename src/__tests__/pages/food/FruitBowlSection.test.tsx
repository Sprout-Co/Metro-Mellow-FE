import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import FruitBowlSection from "@/app/(routes)/(site)/services/food/_components/FruitBowlSection/FruitBowlSection";

// Mock Next.js Image component to avoid image loading issues in tests
jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ src, alt, width, height, className, priority }: any) => (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      data-priority={priority}
      data-testid="fruit-bowl-image"
    />
  ),
}));

describe("FruitBowlSection Component", () => {
  // Test 1: Basic Rendering - Component displays correctly
  describe("Basic Rendering", () => {
    it("renders the fruit bowl section with correct structure", () => {
      // Arrange & Act
      render(<FruitBowlSection />);
      
      // Assert - Check that the main fruit bowl section is rendered
      const fruitBowlSection = document.querySelector("section");
      expect(fruitBowlSection).toBeInTheDocument();
      expect(fruitBowlSection).toHaveClass("fruitBowlSection");
    });

    it("displays the fruit bowl image with correct attributes", () => {
      // Arrange & Act
      render(<FruitBowlSection />);
      
      // Assert - Check that the image is present with correct attributes
      const image = screen.getByTestId("fruit-bowl-image");
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute("src", "/images/food/food-svg.png");
      expect(image).toHaveAttribute("alt", "Fruit bowl illustration");
      expect(image).toHaveAttribute("width", "500");
      expect(image).toHaveAttribute("height", "500");
    });

    it("has proper container structure", () => {
      // Arrange & Act
      render(<FruitBowlSection />);
      
      // Assert - Check that the container structure is present
      const container = document.querySelector(".fruitBowlSection__container");
      expect(container).toBeInTheDocument();
    });

    it("image has correct CSS classes", () => {
      // Arrange & Act
      render(<FruitBowlSection />);
      
      // Assert - Check that the image has the correct CSS class
      const image = screen.getByTestId("fruit-bowl-image");
      expect(image).toHaveClass("fruitBowlSection__image");
    });
  });

  // Test 2: Core Interactions - Main user actions work
  describe("Core Interactions", () => {
    it("image is accessible and has proper alt text", () => {
      // Arrange & Act
      render(<FruitBowlSection />);
      
      // Assert - Check that the image is accessible
      const image = screen.getByAltText("Fruit bowl illustration");
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute("alt", "Fruit bowl illustration");
    });

    it("image has priority loading attribute", () => {
      // Arrange & Act
      render(<FruitBowlSection />);
      
      // Assert - Check that the image has priority loading
      const image = screen.getByTestId("fruit-bowl-image");
      expect(image).toHaveAttribute("data-priority", "true");
    });
  });

  // Test 3: Key Functionality - Primary features function as expected
  describe("Key Functionality", () => {
    it("has proper CSS classes for styling", () => {
      // Arrange & Act
      render(<FruitBowlSection />);
      
      // Assert - Check that key CSS classes are applied
      const fruitBowlSection = document.querySelector("section");
      expect(fruitBowlSection).toHaveClass("fruitBowlSection");
      
      const container = document.querySelector(".fruitBowlSection__container");
      expect(container).toBeInTheDocument();
      
      const image = screen.getByTestId("fruit-bowl-image");
      expect(image).toHaveClass("fruitBowlSection__image");
    });

    it("renders with proper semantic HTML structure", () => {
      // Arrange & Act
      render(<FruitBowlSection />);
      
      // Assert - Check semantic structure
      const section = document.querySelector("section");
      const container = document.querySelector("div");
      const image = screen.getByRole("img");
      
      expect(section).toBeInTheDocument();
      expect(container).toBeInTheDocument();
      expect(image).toBeInTheDocument();
    });

    it("image has correct dimensions", () => {
      // Arrange & Act
      render(<FruitBowlSection />);
      
      // Assert - Check that the image has the correct dimensions
      const image = screen.getByTestId("fruit-bowl-image");
      expect(image).toHaveAttribute("width", "500");
      expect(image).toHaveAttribute("height", "500");
    });

    it("image source is correct", () => {
      // Arrange & Act
      render(<FruitBowlSection />);
      
      // Assert - Check that the image source is correct
      const image = screen.getByTestId("fruit-bowl-image");
      expect(image).toHaveAttribute("src", "/images/food/food-svg.png");
    });
  });

  // Test 4: Accessibility Basics - Essential a11y requirements
  describe("Accessibility Basics", () => {
    it("image has descriptive alt text", () => {
      // Arrange & Act
      render(<FruitBowlSection />);
      
      // Assert - Check that the image has descriptive alt text
      const image = screen.getByAltText("Fruit bowl illustration");
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute("alt", "Fruit bowl illustration");
    });

    it("image is properly labeled for screen readers", () => {
      // Arrange & Act
      render(<FruitBowlSection />);
      
      // Assert - Check that the image is properly labeled
      const image = screen.getByRole("img");
      expect(image).toHaveAttribute("alt", "Fruit bowl illustration");
    });

    it("section has proper semantic structure", () => {
      // Arrange & Act
      render(<FruitBowlSection />);
      
      // Assert - Check that the section has proper semantic structure
      const section = document.querySelector("section");
      expect(section).toBeInTheDocument();
      expect(section).toHaveClass("fruitBowlSection");
    });

    it("container has proper structure for layout", () => {
      // Arrange & Act
      render(<FruitBowlSection />);
      
      // Assert - Check that the container has proper structure
      const container = document.querySelector(".fruitBowlSection__container");
      expect(container).toBeInTheDocument();
    });
  });

  // Test 5: Component Integration - Works with other components
  describe("Component Integration", () => {
    it("integrates with Next.js Image component correctly", () => {
      // Arrange & Act
      render(<FruitBowlSection />);
      
      // Assert - Check that the Next.js Image component is rendered correctly
      const image = screen.getByTestId("fruit-bowl-image");
      expect(image).toBeInTheDocument();
      expect(image.tagName).toBe("IMG");
    });

    it("works with CSS modules styling", () => {
      // Arrange & Act
      render(<FruitBowlSection />);
      
      // Assert - Check that CSS modules classes are applied
      const section = document.querySelector("section");
      expect(section).toHaveClass("fruitBowlSection");
      
      const container = document.querySelector(".fruitBowlSection__container");
      expect(container).toBeInTheDocument();
      
      const image = screen.getByTestId("fruit-bowl-image");
      expect(image).toHaveClass("fruitBowlSection__image");
    });

    it("renders without any interactive elements", () => {
      // Arrange & Act
      render(<FruitBowlSection />);
      
      // Assert - Check that there are no interactive elements (buttons, links, etc.)
      const buttons = screen.queryAllByRole("button");
      const links = screen.queryAllByRole("link");
      
      expect(buttons).toHaveLength(0);
      expect(links).toHaveLength(0);
    });
  });

  // Test 6: Visual and Layout - Verifies the visual presentation
  describe("Visual and Layout", () => {
    it("displays the correct fruit bowl image", () => {
      // Arrange & Act
      render(<FruitBowlSection />);
      
      // Assert - Check that the correct image is displayed
      const image = screen.getByTestId("fruit-bowl-image");
      expect(image).toHaveAttribute("src", "/images/food/food-svg.png");
      expect(image).toHaveAttribute("alt", "Fruit bowl illustration");
    });

    it("image has proper dimensions for responsive design", () => {
      // Arrange & Act
      render(<FruitBowlSection />);
      
      // Assert - Check that the image has proper dimensions
      const image = screen.getByTestId("fruit-bowl-image");
      expect(image).toHaveAttribute("width", "500");
      expect(image).toHaveAttribute("height", "500");
    });

    it("section has proper background styling", () => {
      // Arrange & Act
      render(<FruitBowlSection />);
      
      // Assert - Check that the section has the correct CSS class for background
      const section = document.querySelector("section");
      expect(section).toHaveClass("fruitBowlSection");
      // Note: Actual background color testing would require visual testing tools
    });

    it("container provides proper layout structure", () => {
      // Arrange & Act
      render(<FruitBowlSection />);
      
      // Assert - Check that the container provides proper layout
      const container = document.querySelector(".fruitBowlSection__container");
      expect(container).toBeInTheDocument();
      
      // Check that the image is inside the container
      const image = screen.getByTestId("fruit-bowl-image");
      expect(container).toContainElement(image);
    });
  });
}); 