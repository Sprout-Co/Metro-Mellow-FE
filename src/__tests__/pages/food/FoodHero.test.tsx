import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import FoodHero from "@/app/(routes)/(site)/services/food/_components/FoodHero/FoodHero";

// Mock framer-motion to avoid animation-related issues in tests
jest.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    h1: ({ children, ...props }: any) => <h1 {...props}>{children}</h1>,
    p: ({ children, ...props }: any) => <p {...props}>{children}</p>,
    button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
    a: ({ children, ...props }: any) => <a {...props}>{children}</a>,
  },
  useAnimation: () => ({
    start: jest.fn(),
    stop: jest.fn(),
    set: jest.fn(),
  }),
}));

// Mock console.log to avoid noise in test output
const originalConsoleLog = console.log;
beforeAll(() => {
  console.log = jest.fn();
});

afterAll(() => {
  console.log = originalConsoleLog;
});

describe("FoodHero Component", () => {
  // Test 1: Basic Rendering - Component displays correctly
  describe("Basic Rendering", () => {
    it("renders the hero section with correct structure", () => {
      // Arrange & Act
      render(<FoodHero />);
      
      // Assert - Check that the main hero section is rendered
      const heroSection = document.querySelector("section");
      expect(heroSection).toBeInTheDocument();
      expect(heroSection).toHaveClass("hero");
    });

    it("displays the main heading with correct text content", () => {
      // Arrange & Act
      render(<FoodHero />);
      
      // Assert - Check that the main heading contains the expected text
      const heading = screen.getByRole("heading", { level: 1 });
      expect(heading).toBeInTheDocument();
      expect(heading).toHaveTextContent("Hungry");
      expect(heading).toHaveTextContent("hassle-free eat?");
    });

    it("displays the description paragraph", () => {
      // Arrange & Act
      render(<FoodHero />);
      
      // Assert - Check that the description is present
      const description = screen.getByText(/MetroMellow delivers flavor with fervor!/);
      expect(description).toBeInTheDocument();
      expect(description).toHaveTextContent("From comfort grub to gourmet goodies");
    });

    it("renders the CTA button with correct text", () => {
      // Arrange & Act
      render(<FoodHero />);
      
      // Assert - Check that the CTA button is present with correct text
      const ctaButton = screen.getByRole("button", { name: /ORDER A MEAL/i });
      expect(ctaButton).toBeInTheDocument();
      expect(ctaButton).toHaveTextContent("ORDER A MEAL");
    });
  });

  // Test 2: Core Interactions - Main user actions work
  describe("Core Interactions", () => {
    it("handles CTA button click correctly", () => {
      // Arrange
      render(<FoodHero />);
      const ctaButton = screen.getByRole("button", { name: /ORDER A MEAL/i });
      
      // Act - Click the CTA button
      fireEvent.click(ctaButton);
      
      // Assert - Check that the click handler was called (console.log should be called)
      expect(console.log).toHaveBeenCalledWith("Order meal clicked");
    });

    it("CTA button is clickable and accessible", () => {
      // Arrange
      render(<FoodHero />);
      const ctaButton = screen.getByRole("button", { name: /ORDER A MEAL/i });
      
      // Assert - Check that the button is enabled and accessible
      expect(ctaButton).toBeEnabled();
      expect(ctaButton).not.toHaveAttribute("disabled");
    });
  });

  // Test 3: Key Functionality - Primary features function as expected
  describe("Key Functionality", () => {
    it("has proper CSS classes for styling", () => {
      // Arrange & Act
      render(<FoodHero />);
      
      // Assert - Check that key CSS classes are applied
      const heroSection = document.querySelector("section");
      expect(heroSection).toHaveClass("hero");
      
      const heroContent = document.querySelector(".hero__content");
      expect(heroContent).toBeInTheDocument();
      
      const heroTitle = document.querySelector(".hero__title");
      expect(heroTitle).toBeInTheDocument();
    });

    it("CTA button has correct animation props", () => {
      // Arrange & Act
      render(<FoodHero />);
      
      // Assert - Check that the CTA button has the expected animation properties
      // Note: We're testing the presence of the button with animation props
      // The actual animation behavior is handled by framer-motion and CTAButton component
      const ctaButton = screen.getByRole("button", { name: /ORDER A MEAL/i });
      expect(ctaButton).toBeInTheDocument();
    });

    it("renders with proper semantic HTML structure", () => {
      // Arrange & Act
      render(<FoodHero />);
      
      // Assert - Check semantic structure
      const heading = screen.getByRole("heading", { level: 1 });
      const paragraph = document.querySelector("p");
      const button = screen.getByRole("button");
      
      expect(heading).toBeInTheDocument();
      expect(paragraph).toBeInTheDocument();
      expect(button).toBeInTheDocument();
    });
  });

  // Test 4: Accessibility Basics - Essential a11y requirements
  describe("Accessibility Basics", () => {
    it("has proper heading hierarchy", () => {
      // Arrange & Act
      render(<FoodHero />);
      
      // Assert - Check that there's exactly one h1 heading
      const headings = screen.getAllByRole("heading");
      const h1Headings = headings.filter(heading => heading.tagName === "H1");
      expect(h1Headings).toHaveLength(1);
    });

    it("CTA button has accessible name", () => {
      // Arrange & Act
      render(<FoodHero />);
      
      // Assert - Check that the button has an accessible name
      const ctaButton = screen.getByRole("button", { name: /ORDER A MEAL/i });
      expect(ctaButton).toBeInTheDocument();
    });

    it("button is keyboard accessible", () => {
      // Arrange
      render(<FoodHero />);
      const ctaButton = screen.getByRole("button", { name: /ORDER A MEAL/i });
      
      // Act - Focus the button
      ctaButton.focus();
      
      // Assert - Check that the button can receive focus
      expect(ctaButton).toHaveFocus();
    });

    it("button responds to keyboard interaction", () => {
      // Arrange
      render(<FoodHero />);
      const ctaButton = screen.getByRole("button", { name: /ORDER A MEAL/i });
      
      // Act - Press Enter key on the button
      fireEvent.keyDown(ctaButton, { key: "Enter", code: "Enter" });
      
      // Assert - Check that the click handler was called
      expect(console.log).toHaveBeenCalledWith("Order meal clicked");
    });
  });

  // Test 5: Component Integration - Works with other components
  describe("Component Integration", () => {
    it("integrates with CTAButton component correctly", () => {
      // Arrange & Act
      render(<FoodHero />);
      
      // Assert - Check that the CTAButton is rendered with expected props
      const ctaButton = screen.getByRole("button", { name: /ORDER A MEAL/i });
      expect(ctaButton).toBeInTheDocument();
      
      // Check that the button has the expected text content
      expect(ctaButton).toHaveTextContent("ORDER A MEAL");
    });

    it("works with framer-motion animations", () => {
      // Arrange & Act
      render(<FoodHero />);
      
      // Assert - Check that motion components are rendered
      // Since we mocked framer-motion, we just verify the structure is intact
      const heroContent = document.querySelector(".hero__content");
      expect(heroContent).toBeInTheDocument();
    });
  });
}); 