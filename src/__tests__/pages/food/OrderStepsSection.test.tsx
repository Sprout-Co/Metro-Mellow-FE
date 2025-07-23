import React from 'react';
import { render, screen } from '@testing-library/react';
import OrderStepsSection from '@/app/(routes)/(site)/services/food/_components/OrderStepsSection/OrderStepsSection';
import { Routes } from '@/constants/routes';

// Mock Next.js Image component
jest.mock('next/image', () => ({
  default: ({ src, alt, ...props }: any) => (
    <img src={src} alt={alt} {...props} />
  ),
}));

// Mock framer-motion to avoid animation-related issues in tests
jest.mock('framer-motion', () => ({
  motion: {
    section: ({ children, ...props }: any) => <section {...props}>{children}</section>,
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    h2: ({ children, ...props }: any) => <h2 {...props}>{children}</h2>,
    p: ({ children, ...props }: any) => <p {...props}>{children}</p>,
    ul: ({ children, ...props }: any) => <ul {...props}>{children}</ul>,
    li: ({ children, ...props }: any) => <li {...props}>{children}</li>,
  },
}));

// Mock the CTAButton component
jest.mock('@/components/ui/Button/CTAButton', () => ({
  CTAButton: ({ children, href, ...props }: any) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

// Mock the ArrowRightIcon
jest.mock('lucide-react', () => ({
  ArrowRightIcon: ({ className }: any) => (
    <svg className={className} data-testid="arrow-icon" />
  ),
}));

describe('OrderStepsSection', () => {
  // Test basic rendering
  describe('Basic Rendering', () => {
    it('renders the component without crashing', () => {
      // Render the component
      render(<OrderStepsSection />);
      
      // Verify the component renders without errors
      expect(screen.getByRole('banner')).toBeInTheDocument();
    });

    it('displays the main title correctly', () => {
      // Render the component
      render(<OrderStepsSection />);
      
      // Check that the main title is displayed
      expect(screen.getByText(/What do I/)).toBeInTheDocument();
      expect(screen.getByText(/Need to do\?/)).toBeInTheDocument();
    });

    it('displays the subtitle correctly', () => {
      // Render the component
      render(<OrderStepsSection />);
      
      // Check that the subtitle is displayed
      expect(screen.getByText(/Tap into tasty with just a few clicks/)).toBeInTheDocument();
    });

    it('renders the food image with correct attributes', () => {
      // Render the component
      render(<OrderStepsSection />);
      
      // Check that the food image is rendered with correct src and alt text
      const image = screen.getByAltText('Plate with delicious food');
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute('src', '/images/food/plate-svg.png');
    });
  });

  // Test core interactions
  describe('Core Interactions', () => {
    it('displays all three order steps', () => {
      // Render the component
      render(<OrderStepsSection />);
      
      // Check that all three steps are displayed
      expect(screen.getByText('1')).toBeInTheDocument();
      expect(screen.getByText('2')).toBeInTheDocument();
      expect(screen.getByText('3')).toBeInTheDocument();
      
      // Check that step descriptions are displayed
      expect(screen.getByText('Choose your crave')).toBeInTheDocument();
      expect(screen.getByText('Track your order')).toBeInTheDocument();
      expect(screen.getByText('Enjoy every bite')).toBeInTheDocument();
    });

    it('renders the CTA button with correct text and link', () => {
      // Render the component
      render(<OrderStepsSection />);
      
      // Check that the CTA button is displayed with correct text
      const ctaButton = screen.getByRole('link', { name: /ORDER NOW/i });
      expect(ctaButton).toBeInTheDocument();
      
      // Check that the button links to the correct route
      expect(ctaButton).toHaveAttribute('href', Routes.GET_STARTED);
    });

    it('includes the arrow icon in the CTA button', () => {
      // Render the component
      render(<OrderStepsSection />);
      
      // Check that the arrow icon is present in the CTA button
      expect(screen.getByTestId('arrow-icon')).toBeInTheDocument();
    });
  });

  // Test key functionality
  describe('Key Functionality', () => {
    it('maintains proper step order and numbering', () => {
      // Render the component
      render(<OrderStepsSection />);
      
      // Get all step numbers and verify they are in correct order
      const stepNumbers = screen.getAllByText(/^[1-3]$/);
      expect(stepNumbers).toHaveLength(3);
      
      // Verify the order is correct (1, 2, 3)
      expect(stepNumbers[0]).toHaveTextContent('1');
      expect(stepNumbers[1]).toHaveTextContent('2');
      expect(stepNumbers[2]).toHaveTextContent('3');
    });

    it('displays step content in a logical flow', () => {
      // Render the component
      render(<OrderStepsSection />);
      
      // Verify the steps follow a logical order: choose -> track -> enjoy
      const stepTexts = [
        'Choose your crave',
        'Track your order', 
        'Enjoy every bite'
      ];
      
      stepTexts.forEach(text => {
        expect(screen.getByText(text)).toBeInTheDocument();
      });
    });

    it('has proper container structure', () => {
      // Render the component
      render(<OrderStepsSection />);
      
      // Check that the main section exists
      const section = screen.getByRole('banner');
      expect(section).toBeInTheDocument();
      
      // Check that the steps list is properly structured
      const stepsList = screen.getByRole('list');
      expect(stepsList).toBeInTheDocument();
      
      // Check that there are exactly 3 list items
      const listItems = screen.getAllByRole('listitem');
      expect(listItems).toHaveLength(3);
    });
  });

  // Test accessibility basics
  describe('Accessibility Basics', () => {
    it('has proper heading structure', () => {
      // Render the component
      render(<OrderStepsSection />);
      
      // Check that the main heading is an h2 element
      const heading = screen.getByRole('heading', { level: 2 });
      expect(heading).toBeInTheDocument();
      expect(heading).toHaveTextContent(/What do I/);
    });

    it('provides meaningful alt text for images', () => {
      // Render the component
      render(<OrderStepsSection />);
      
      // Check that the image has descriptive alt text
      const image = screen.getByAltText('Plate with delicious food');
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute('alt', 'Plate with delicious food');
    });

    it('has accessible link text for the CTA button', () => {
      // Render the component
      render(<OrderStepsSection />);
      
      // Check that the CTA button has clear, descriptive text
      const ctaButton = screen.getByRole('link', { name: /ORDER NOW/i });
      expect(ctaButton).toBeInTheDocument();
      expect(ctaButton).toHaveTextContent('ORDER NOW');
    });

    it('maintains proper list semantics', () => {
      // Render the component
      render(<OrderStepsSection />);
      
      // Check that steps are properly structured as a list
      const stepsList = screen.getByRole('list');
      expect(stepsList).toBeInTheDocument();
      
      // Check that each step is a list item
      const listItems = screen.getAllByRole('listitem');
      expect(listItems).toHaveLength(3);
      
      // Verify each list item contains step content
      listItems.forEach((item, index) => {
        expect(item).toHaveTextContent(String(index + 1));
      });
    });
  });
}); 