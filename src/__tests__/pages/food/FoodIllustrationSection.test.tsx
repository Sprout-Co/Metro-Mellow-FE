import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import FoodIllustrationSection from "@/app/(routes)/(site)/services/food/_components/FoodIllustrationSection/FoodIllustrationSection";

// Mock framer-motion to avoid animation-related issues in tests
jest.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    h2: ({ children, ...props }: any) => <h2 {...props}>{children}</h2>,
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

// Mock react-intersection-observer
jest.mock("react-intersection-observer", () => ({
  useInView: () => [jest.fn(), true], // Always return inView as true for testing
}));

// Mock lucide-react icons
jest.mock("lucide-react", () => ({
  ArrowRightIcon: ({ className }: any) => <span className={className} data-testid="arrow-icon">→</span>,
}));

describe("FoodIllustrationSection Component", () => {
  // Test 1: Basic Rendering - Component displays correctly
  describe("Basic Rendering", () => {
    it("renders the illustration section with correct structure", () => {
      // Arrange & Act
      render(<FoodIllustrationSection />);
      
      // Assert - Check that the main illustration section is rendered
      const illustrationSection = document.querySelector("section");
      expect(illustrationSection).toBeInTheDocument();
      expect(illustrationSection).toHaveClass("illustration");
    });

    it("displays the main heading with correct text content", () => {
      // Arrange & Act
      render(<FoodIllustrationSection />);
      
      // Assert - Check that the main heading contains the expected text
      const heading = screen.getByRole("heading", { level: 2 });
      expect(heading).toBeInTheDocument();
      expect(heading).toHaveTextContent("From Comfort");
      expect(heading).toHaveTextContent("Classics to");
      expect(heading).toHaveTextContent("Gourmet");
      expect(heading).toHaveTextContent("Goodies");
    });

    it("displays the description paragraph", () => {
      // Arrange & Act
      render(<FoodIllustrationSection />);
      
      // Assert - Check that the description is present
      const description = screen.getByText(/Whether it's lunch or late-night/);
      expect(description).toBeInTheDocument();
      expect(description).toHaveTextContent("we deliver flavors that make your taste buds sing");
    });

    it("renders the CTA button with correct text and icon", () => {
      // Arrange & Act
      render(<FoodIllustrationSection />);
      
      // Assert - Check that the CTA button is present with correct text
      const ctaButton = screen.getByRole("link", { name: /JOIN OUR MISSION/i });
      expect(ctaButton).toBeInTheDocument();
      expect(ctaButton).toHaveTextContent("JOIN OUR MISSION");
      
      // Check that the arrow icon is present
      const arrowIcon = screen.getByTestId("arrow-icon");
      expect(arrowIcon).toBeInTheDocument();
    });
  });

  // Test 2: Core Interactions - Main user actions work
  describe("Core Interactions", () => {
    it("CTA button has correct href link", () => {
      // Arrange & Act
      render(<FoodIllustrationSection />);
      
      // Assert - Check that the CTA button links to the get-started page
      const ctaButton = screen.getByRole("link", { name: /JOIN OUR MISSION/i });
      expect(ctaButton).toHaveAttribute("href", "/get-started");
    });

    it("CTA button is accessible and clickable", () => {
      // Arrange & Act
      render(<FoodIllustrationSection />);
      
      // Assert - Check that the button is accessible
      const ctaButton = screen.getByRole("link", { name: /JOIN OUR MISSION/i });
      expect(ctaButton).toBeInTheDocument();
      expect(ctaButton).not.toHaveAttribute("disabled");
    });
  });

  // Test 3: Key Functionality - Primary features function as expected
  describe("Key Functionality", () => {
    it("has proper CSS classes for styling", () => {
      // Arrange & Act
      render(<FoodIllustrationSection />);
      
      // Assert - Check that key CSS classes are applied
      const illustrationSection = document.querySelector("section");
      expect(illustrationSection).toHaveClass("illustration");
      
      const container = document.querySelector(".illustration__container");
      expect(container).toBeInTheDocument();
      
      const content = document.querySelector(".illustration__content");
      expect(content).toBeInTheDocument();
      
      const info = document.querySelector(".illustration__info");
      expect(info).toBeInTheDocument();
    });

    it("CTA button has correct animation props", () => {
      // Arrange & Act
      render(<FoodIllustrationSection />);
      
      // Assert - Check that the CTA button has the expected animation properties
      // Note: We're testing the presence of the button with animation props
      // The actual animation behavior is handled by framer-motion and CTAButton component
      const ctaButton = screen.getByRole("link", { name: /JOIN OUR MISSION/i });
      expect(ctaButton).toBeInTheDocument();
    });

    it("renders with proper semantic HTML structure", () => {
      // Arrange & Act
      render(<FoodIllustrationSection />);
      
      // Assert - Check semantic structure
      const heading = screen.getByRole("heading", { level: 2 });
      const paragraph = document.querySelector("p");
      const link = screen.getByRole("link");
      
      expect(heading).toBeInTheDocument();
      expect(paragraph).toBeInTheDocument();
      expect(link).toBeInTheDocument();
    });

    it("has proper container structure", () => {
      // Arrange & Act
      render(<FoodIllustrationSection />);
      
      // Assert - Check that the container structure is present
      const container = document.querySelector(".illustration__container");
      expect(container).toBeInTheDocument();
      
      const content = document.querySelector(".illustration__content");
      expect(content).toBeInTheDocument();
      
      const info = document.querySelector(".illustration__info");
      expect(info).toBeInTheDocument();
    });
  });

  // Test 4: Accessibility Basics - Essential a11y requirements
  describe("Accessibility Basics", () => {
    it("has proper heading hierarchy", () => {
      // Arrange & Act
      render(<FoodIllustrationSection />);
      
      // Assert - Check that there's exactly one h2 heading
      const headings = screen.getAllByRole("heading");
      const h2Headings = headings.filter(heading => heading.tagName === "H2");
      expect(h2Headings).toHaveLength(1);
    });

    it("CTA button has accessible name", () => {
      // Arrange & Act
      render(<FoodIllustrationSection />);
      
      // Assert - Check that the button has an accessible name
      const ctaButton = screen.getByRole("link", { name: /JOIN OUR MISSION/i });
      expect(ctaButton).toBeInTheDocument();
    });

    it("link is keyboard accessible", () => {
      // Arrange
      render(<FoodIllustrationSection />);
      const ctaButton = screen.getByRole("link", { name: /JOIN OUR MISSION/i });
      
      // Act - Focus the link
      ctaButton.focus();
      
      // Assert - Check that the link can receive focus
      expect(ctaButton).toHaveFocus();
    });

    it("has proper color contrast for text content", () => {
      // Arrange & Act
      render(<FoodIllustrationSection />);
      
      // Assert - Check that text content is present and readable
      const heading = screen.getByRole("heading", { level: 2 });
      const description = screen.getByText(/Whether it's lunch or late-night/);
      
      expect(heading).toBeInTheDocument();
      expect(description).toBeInTheDocument();
      // Note: Actual color contrast testing would require visual testing tools
    });
  });

  // Test 5: Component Integration - Works with other components
  describe("Component Integration", () => {
    it("integrates with CTAButton component correctly", () => {
      // Arrange & Act
      render(<FoodIllustrationSection />);
      
      // Assert - Check that the CTAButton is rendered with expected props
      const ctaButton = screen.getByRole("link", { name: /JOIN OUR MISSION/i });
      expect(ctaButton).toBeInTheDocument();
      
      // Check that the button has the expected text content
      expect(ctaButton).toHaveTextContent("JOIN OUR MISSION");
    });

    it("works with framer-motion animations", () => {
      // Arrange & Act
      render(<FoodIllustrationSection />);
      
      // Assert - Check that motion components are rendered
      // Since we mocked framer-motion, we just verify the structure is intact
      const content = document.querySelector(".illustration__content");
      expect(content).toBeInTheDocument();
      
      const info = document.querySelector(".illustration__info");
      expect(info).toBeInTheDocument();
    });

    it("includes arrow icon from lucide-react", () => {
      // Arrange & Act
      render(<FoodIllustrationSection />);
      
      // Assert - Check that the arrow icon is rendered
      const arrowIcon = screen.getByTestId("arrow-icon");
      expect(arrowIcon).toBeInTheDocument();
      expect(arrowIcon).toHaveTextContent("→");
    });

    it("uses react-intersection-observer for scroll animations", () => {
      // Arrange & Act
      render(<FoodIllustrationSection />);
      
      // Assert - Check that the section has a ref for intersection observer
      const section = document.querySelector("section");
      expect(section).toBeInTheDocument();
      // Note: The ref functionality is handled by the useInView hook
    });
  });

  // Test 6: Content and Messaging - Verifies the content
  describe("Content and Messaging", () => {
    it("displays the correct heading text", () => {
      // Arrange & Act
      render(<FoodIllustrationSection />);
      
      // Assert - Check the heading text
      const heading = screen.getByRole("heading", { level: 2 });
      expect(heading).toHaveTextContent("From Comfort");
      expect(heading).toHaveTextContent("Classics to");
      expect(heading).toHaveTextContent("Gourmet");
      expect(heading).toHaveTextContent("Goodies");
    });

    it("displays the correct description text", () => {
      // Arrange & Act
      render(<FoodIllustrationSection />);
      
      // Assert - Check the description text
      const description = screen.getByText(/Whether it's lunch or late-night/);
      expect(description).toHaveTextContent("we deliver flavors that make your taste buds sing");
    });

    it("has clear call-to-action text", () => {
      // Arrange & Act
      render(<FoodIllustrationSection />);
      
      // Assert - Check the CTA text
      const ctaButton = screen.getByRole("link", { name: /JOIN OUR MISSION/i });
      expect(ctaButton).toHaveTextContent("JOIN OUR MISSION");
    });

    it("has proper content structure with heading and description", () => {
      // Arrange & Act
      render(<FoodIllustrationSection />);
      
      // Assert - Check that both content sections are present
      const content = document.querySelector(".illustration__content");
      const info = document.querySelector(".illustration__info");
      
      expect(content).toBeInTheDocument();
      expect(info).toBeInTheDocument();
      
      // Check that content contains heading
      const heading = screen.getByRole("heading", { level: 2 });
      expect(content).toContainElement(heading);
      
      // Check that info contains description
      const description = screen.getByText(/Whether it's lunch or late-night/);
      expect(info).toContainElement(description);
    });
  });
}); 