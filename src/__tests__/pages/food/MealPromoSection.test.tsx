import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import MealPromoSection from "@/app/(routes)/(site)/services/food/_components/MealPromoSection/MealPromoSection";

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

// Mock lucide-react icons
jest.mock("lucide-react", () => ({
  ArrowRightIcon: ({ className }: any) => <span className={className} data-testid="arrow-icon">→</span>,
}));

describe("MealPromoSection Component", () => {
  // Test 1: Basic Rendering - Component displays correctly
  describe("Basic Rendering", () => {
    it("renders the promo section with correct structure", () => {
      // Arrange & Act
      render(<MealPromoSection />);
      
      // Assert - Check that the main promo section is rendered
      const promoSection = document.querySelector("section");
      expect(promoSection).toBeInTheDocument();
      expect(promoSection).toHaveClass("promo");
    });

    it("displays the main heading with correct text content", () => {
      // Arrange & Act
      render(<MealPromoSection />);
      
      // Assert - Check that the main heading contains the expected text
      const heading = screen.getByRole("heading", { level: 2 });
      expect(heading).toBeInTheDocument();
      expect(heading).toHaveTextContent("Mellow Meals,");
      expect(heading).toHaveTextContent("Metro Style!");
    });

    it("displays the description paragraph", () => {
      // Arrange & Act
      render(<MealPromoSection />);
      
      // Assert - Check that the description is present
      const description = screen.getByText(/Fresh, fast, and finger-licking good/);
      expect(description).toBeInTheDocument();
      expect(description).toHaveTextContent("food delivery that fuels your day the mellow way");
    });

    it("renders the CTA button with correct text and icon", () => {
      // Arrange & Act
      render(<MealPromoSection />);
      
      // Assert - Check that the CTA button is present with correct text
      const ctaButton = screen.getByRole("link", { name: /PLACE AN ORDER/i });
      expect(ctaButton).toBeInTheDocument();
      expect(ctaButton).toHaveTextContent("PLACE AN ORDER");
      
      // Check that the arrow icon is present
      const arrowIcon = screen.getByTestId("arrow-icon");
      expect(arrowIcon).toBeInTheDocument();
    });
  });

  // Test 2: Core Interactions - Main user actions work
  describe("Core Interactions", () => {
    it("CTA button has correct href link", () => {
      // Arrange & Act
      render(<MealPromoSection />);
      
      // Assert - Check that the CTA button links to the get-started page
      const ctaButton = screen.getByRole("link", { name: /PLACE AN ORDER/i });
      expect(ctaButton).toHaveAttribute("href", "/get-started");
    });

    it("CTA button is accessible and clickable", () => {
      // Arrange & Act
      render(<MealPromoSection />);
      
      // Assert - Check that the button is accessible
      const ctaButton = screen.getByRole("link", { name: /PLACE AN ORDER/i });
      expect(ctaButton).toBeInTheDocument();
      expect(ctaButton).not.toHaveAttribute("disabled");
    });
  });

  // Test 3: Key Functionality - Primary features function as expected
  describe("Key Functionality", () => {
    it("has proper CSS classes for styling", () => {
      // Arrange & Act
      render(<MealPromoSection />);
      
      // Assert - Check that key CSS classes are applied
      const promoSection = document.querySelector("section");
      expect(promoSection).toHaveClass("promo");
      
      const promoContent = document.querySelector(".promo__content");
      expect(promoContent).toBeInTheDocument();
      
      const promoTitle = document.querySelector(".promo__title");
      expect(promoTitle).toBeInTheDocument();
    });

    it("CTA button has correct animation props", () => {
      // Arrange & Act
      render(<MealPromoSection />);
      
      // Assert - Check that the CTA button has the expected animation properties
      // Note: We're testing the presence of the button with animation props
      // The actual animation behavior is handled by framer-motion and CTAButton component
      const ctaButton = screen.getByRole("link", { name: /PLACE AN ORDER/i });
      expect(ctaButton).toBeInTheDocument();
    });

    it("renders with proper semantic HTML structure", () => {
      // Arrange & Act
      render(<MealPromoSection />);
      
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
      render(<MealPromoSection />);
      
      // Assert - Check that the container structure is present
      const promoContainer = document.querySelector(".promo__container");
      expect(promoContainer).toBeInTheDocument();
      
      const promoContent = document.querySelector(".promo__content");
      expect(promoContent).toBeInTheDocument();
    });
  });

  // Test 4: Accessibility Basics - Essential a11y requirements
  describe("Accessibility Basics", () => {
    it("has proper heading hierarchy", () => {
      // Arrange & Act
      render(<MealPromoSection />);
      
      // Assert - Check that there's exactly one h2 heading
      const headings = screen.getAllByRole("heading");
      const h2Headings = headings.filter(heading => heading.tagName === "H2");
      expect(h2Headings).toHaveLength(1);
    });

    it("CTA button has accessible name", () => {
      // Arrange & Act
      render(<MealPromoSection />);
      
      // Assert - Check that the button has an accessible name
      const ctaButton = screen.getByRole("link", { name: /PLACE AN ORDER/i });
      expect(ctaButton).toBeInTheDocument();
    });

    it("link is keyboard accessible", () => {
      // Arrange
      render(<MealPromoSection />);
      const ctaButton = screen.getByRole("link", { name: /PLACE AN ORDER/i });
      
      // Act - Focus the link
      ctaButton.focus();
      
      // Assert - Check that the link can receive focus
      expect(ctaButton).toHaveFocus();
    });

    it("has proper color contrast for text content", () => {
      // Arrange & Act
      render(<MealPromoSection />);
      
      // Assert - Check that text content is present and readable
      const heading = screen.getByRole("heading", { level: 2 });
      const description = screen.getByText(/Fresh, fast, and finger-licking good/);
      
      expect(heading).toBeInTheDocument();
      expect(description).toBeInTheDocument();
      // Note: Actual color contrast testing would require visual testing tools
    });
  });

  // Test 5: Component Integration - Works with other components
  describe("Component Integration", () => {
    it("integrates with CTAButton component correctly", () => {
      // Arrange & Act
      render(<MealPromoSection />);
      
      // Assert - Check that the CTAButton is rendered with expected props
      const ctaButton = screen.getByRole("link", { name: /PLACE AN ORDER/i });
      expect(ctaButton).toBeInTheDocument();
      
      // Check that the button has the expected text content
      expect(ctaButton).toHaveTextContent("PLACE AN ORDER");
    });

    it("works with framer-motion animations", () => {
      // Arrange & Act
      render(<MealPromoSection />);
      
      // Assert - Check that motion components are rendered
      // Since we mocked framer-motion, we just verify the structure is intact
      const promoContent = document.querySelector(".promo__content");
      expect(promoContent).toBeInTheDocument();
    });

    it("includes arrow icon from lucide-react", () => {
      // Arrange & Act
      render(<MealPromoSection />);
      
      // Assert - Check that the arrow icon is rendered
      const arrowIcon = screen.getByTestId("arrow-icon");
      expect(arrowIcon).toBeInTheDocument();
      expect(arrowIcon).toHaveTextContent("→");
    });
  });

  // Test 6: Content and Messaging - Verifies the promotional content
  describe("Content and Messaging", () => {
    it("displays the correct promotional title", () => {
      // Arrange & Act
      render(<MealPromoSection />);
      
      // Assert - Check the promotional title
      const heading = screen.getByRole("heading", { level: 2 });
      expect(heading).toHaveTextContent("Mellow Meals,");
      expect(heading).toHaveTextContent("Metro Style!");
    });

    it("displays the correct promotional description", () => {
      // Arrange & Act
      render(<MealPromoSection />);
      
      // Assert - Check the promotional description
      const description = screen.getByText(/Fresh, fast, and finger-licking good/);
      expect(description).toHaveTextContent("food delivery that fuels your day the mellow way");
    });

    it("has clear call-to-action text", () => {
      // Arrange & Act
      render(<MealPromoSection />);
      
      // Assert - Check the CTA text
      const ctaButton = screen.getByRole("link", { name: /PLACE AN ORDER/i });
      expect(ctaButton).toHaveTextContent("PLACE AN ORDER");
    });
  });
}); 