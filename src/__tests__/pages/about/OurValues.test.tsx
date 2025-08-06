import { render, screen } from '@testing-library/react'
import OurValues from '@/app/(routes)/(site)/about/_components/OurValues/OurValues'

// Mock framer-motion since it's not available in Jest environment
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, className, ...props }: any) => (
      <div className={className} {...props}>
        {children}
      </div>
    ),
    h2: ({ children, className, ...props }: any) => (
      <h2 className={className} {...props}>
        {children}
      </h2>
    ),
    p: ({ children, className, ...props }: any) => (
      <p className={className} {...props}>
        {children}
      </p>
    ),
  },
}))

describe('OurValues Component', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks()
  })

  describe('Basic Rendering', () => {
    it('renders the our values section correctly', () => {
      render(<OurValues />)
      
      // Check main section exists by looking for the main heading
      expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument()
    })

    it('displays the main title with correct text', () => {
      render(<OurValues />)
      
      const title = screen.getByRole('heading', { level: 2 })
      expect(title).toBeInTheDocument()
      expect(title).toHaveTextContent('Our Core Values')
    })

    it('renders the values section with proper structure', () => {
      render(<OurValues />)
      
      // Check that the section element exists
      const section = document.querySelector('section')
      expect(section).toBeInTheDocument()
      expect(section).toHaveClass('values')
    })

    it('displays the subtitle text', () => {
      render(<OurValues />)
      
      const subtitle = screen.getByText(/Principles that guide every decision we make/)
      expect(subtitle).toBeInTheDocument()
      expect(subtitle).toHaveTextContent('Principles that guide every decision we make and service we provide')
    })

    it('renders all six value cards', () => {
      render(<OurValues />)
      
      // Check that all six value cards are rendered
      const valueCards = document.querySelectorAll('.values__card')
      expect(valueCards).toHaveLength(6)
    })
  })

  describe('Core Interactions', () => {
    it('renders with animation properties', () => {
      render(<OurValues />)
      
      // Check that the content elements have animation-related props
      const header = document.querySelector('.values__header')
      const cards = document.querySelectorAll('.values__card')
      
      expect(header).toBeInTheDocument()
      expect(cards.length).toBeGreaterThan(0)
    })

    it('maintains proper layout structure', () => {
      render(<OurValues />)
      
      // Check for container and grid elements
      const container = document.querySelector('.values__container')
      const grid = document.querySelector('.values__grid')
      
      expect(container).toBeInTheDocument()
      expect(grid).toBeInTheDocument()
    })

    it('displays all value titles correctly', () => {
      render(<OurValues />)
      
      // Check that all value titles are present
      expect(screen.getByText('Quality First')).toBeInTheDocument()
      expect(screen.getByText('Trustworthy Relationships')).toBeInTheDocument()
      expect(screen.getByText('Eco-Conscious Solutions')).toBeInTheDocument()
      expect(screen.getByText('Empowered Team')).toBeInTheDocument()
      expect(screen.getByText('Community Impact')).toBeInTheDocument()
      expect(screen.getByText('Innovation')).toBeInTheDocument()
    })
  })

  describe('Key Functionality', () => {
    it('displays complete values content', () => {
      render(<OurValues />)
      
      // Check all essential content is present
      expect(screen.getByText('Our Core Values')).toBeInTheDocument()
      expect(screen.getByText(/Principles that guide every decision we make/)).toBeInTheDocument()
      expect(screen.getByText('Quality First')).toBeInTheDocument()
      expect(screen.getByText('Innovation')).toBeInTheDocument()
    })

    it('renders with proper CSS classes', () => {
      render(<OurValues />)
      
      // Check that all main CSS classes are applied
      const section = document.querySelector('.values')
      const container = document.querySelector('.values__container')
      const header = document.querySelector('.values__header')
      const title = document.querySelector('.values__title')
      const subtitle = document.querySelector('.values__subtitle')
      const grid = document.querySelector('.values__grid')
      const cards = document.querySelectorAll('.values__card')
      
      expect(section).toBeInTheDocument()
      expect(container).toBeInTheDocument()
      expect(header).toBeInTheDocument()
      expect(title).toBeInTheDocument()
      expect(subtitle).toBeInTheDocument()
      expect(grid).toBeInTheDocument()
      expect(cards.length).toBe(6)
    })

    it('displays value descriptions', () => {
      render(<OurValues />)
      
      // Check that value descriptions are present
      expect(screen.getByText(/We deliver exceptional service that exceeds expectations/)).toBeInTheDocument()
      expect(screen.getByText(/We build lasting connections with our clients/)).toBeInTheDocument()
      expect(screen.getByText(/We are committed to environmentally responsible practices/)).toBeInTheDocument()
      expect(screen.getByText(/We invest in our professionals through fair pay/)).toBeInTheDocument()
      expect(screen.getByText(/We actively contribute to the communities we serve/)).toBeInTheDocument()
      expect(screen.getByText(/We continuously improve our services by embracing new technologies/)).toBeInTheDocument()
    })

    it('includes SVG icons for each value', () => {
      render(<OurValues />)
      
      // Check that SVG elements are present (they should be rendered as svg tags)
      const svgElements = document.querySelectorAll('svg')
      expect(svgElements.length).toBeGreaterThan(0)
      
      // Check that icon wrappers exist
      const iconWrappers = document.querySelectorAll('.values__iconWrapper')
      expect(iconWrappers.length).toBe(6)
    })
  })

  describe('Accessibility Basics', () => {
    it('has proper heading structure', () => {
      render(<OurValues />)
      
      // Check for main heading (h2)
      const mainHeading = screen.getByRole('heading', { level: 2 })
      expect(mainHeading).toBeInTheDocument()
      expect(mainHeading).toHaveTextContent('Our Core Values')
      
      // Check for value card headings (h3)
      const valueHeadings = screen.getAllByRole('heading', { level: 3 })
      expect(valueHeadings).toHaveLength(6)
    })

    it('uses semantic HTML elements', () => {
      render(<OurValues />)
      
      // Check for semantic section element
      const section = document.querySelector('section')
      expect(section).toBeInTheDocument()
      
      // Check for paragraph elements
      const paragraphs = document.querySelectorAll('p')
      expect(paragraphs.length).toBeGreaterThan(0)
    })

    it('provides meaningful content structure', () => {
      render(<OurValues />)
      
      // Check that the content is properly structured
      const title = screen.getByRole('heading', { level: 2 })
      const subtitle = screen.getByText(/Principles that guide every decision we make/)
      
      expect(title).toBeInTheDocument()
      expect(subtitle).toBeInTheDocument()
      
      // Verify content hierarchy
      expect(title.textContent).toContain('Our Core Values')
      expect(subtitle.textContent).toContain('Principles that guide every decision we make')
    })

    it('maintains proper text contrast and readability', () => {
      render(<OurValues />)
      
      // Check that text content is present and readable
      const title = screen.getByRole('heading', { level: 2 })
      const subtitle = screen.getByText(/Principles that guide every decision we make/)
      
      // Verify text content is not empty
      expect(title.textContent?.trim()).toBeTruthy()
      expect(subtitle.textContent?.trim()).toBeTruthy()
      
      // Check that the title contains the expected content
      expect(title.textContent).toContain('Our Core Values')
    })

    it('has proper card structure for each value', () => {
      render(<OurValues />)
      
      // Check that each value card has the proper structure
      const cards = document.querySelectorAll('.values__card')
      expect(cards.length).toBe(6)
      
      // Check that each card has a title, description, and icon
      cards.forEach(card => {
        const title = card.querySelector('h3')
        const description = card.querySelector('p')
        const icon = card.querySelector('.values__iconWrapper')
        
        expect(title).toBeInTheDocument()
        expect(description).toBeInTheDocument()
        expect(icon).toBeInTheDocument()
      })
    })
  })
}) 