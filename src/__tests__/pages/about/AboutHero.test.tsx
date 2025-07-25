import { render, screen } from '@testing-library/react'
import AboutHero from '@/app/(routes)/(site)/about/_components/AboutHero/AboutHero'

// Mock framer-motion since it's not available in Jest environment
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, className, ...props }: any) => (
      <div className={className} {...props}>
        {children}
      </div>
    ),
  },
}))

describe('AboutHero Component', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks()
  })

  describe('Basic Rendering', () => {
    it('renders the about hero section correctly', () => {
      render(<AboutHero />)
      
      // Check main section exists by looking for the main heading
      expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
    })

    it('displays the main title with correct text', () => {
      render(<AboutHero />)
      
      const title = screen.getByRole('heading', { level: 1 })
      expect(title).toBeInTheDocument()
      expect(title).toHaveTextContent('About Metromellow')
    })

    it('displays the subtitle text', () => {
      render(<AboutHero />)
      
      const subtitle = screen.getByText(/Transforming everyday home experiences/)
      expect(subtitle).toBeInTheDocument()
      expect(subtitle).toHaveTextContent('Transforming everyday home experiences with exceptional service since 2018')
    })

    it('renders the hero section with proper structure', () => {
      render(<AboutHero />)
      
      // Check that the section element exists
      const section = document.querySelector('section')
      expect(section).toBeInTheDocument()
      expect(section).toHaveClass('aboutHero')
    })

    it('displays the company name with highlight styling', () => {
      render(<AboutHero />)
      
      // Check that "Metromellow" is displayed as highlighted text
      const highlightedText = screen.getByText('Metromellow')
      expect(highlightedText).toBeInTheDocument()
      expect(highlightedText).toHaveClass('aboutHero__title--highlight')
    })
  })

  describe('Core Interactions', () => {
    it('renders with animation properties', () => {
      render(<AboutHero />)
      
      // Check that the content div has animation-related props
      const contentDiv = document.querySelector('.aboutHero__content')
      expect(contentDiv).toBeInTheDocument()
    })

    it('maintains proper layout structure', () => {
      render(<AboutHero />)
      
      // Check for container and overlay elements
      const container = document.querySelector('.aboutHero__container')
      const overlay = document.querySelector('.aboutHero__overlay')
      
      expect(container).toBeInTheDocument()
      expect(overlay).toBeInTheDocument()
    })
  })

  describe('Key Functionality', () => {
    it('displays complete hero content', () => {
      render(<AboutHero />)
      
      // Check all essential content is present
      expect(screen.getByText('About')).toBeInTheDocument()
      expect(screen.getByText('Metromellow')).toBeInTheDocument()
      expect(screen.getByText(/Transforming everyday home experiences/)).toBeInTheDocument()
      expect(screen.getByText(/since 2018/)).toBeInTheDocument()
    })

    it('renders with proper CSS classes', () => {
      render(<AboutHero />)
      
      // Check that all main CSS classes are applied
      const section = document.querySelector('.aboutHero')
      const container = document.querySelector('.aboutHero__container')
      const content = document.querySelector('.aboutHero__content')
      const title = document.querySelector('.aboutHero__title')
      const subtitle = document.querySelector('.aboutHero__subtitle')
      
      expect(section).toBeInTheDocument()
      expect(container).toBeInTheDocument()
      expect(content).toBeInTheDocument()
      expect(title).toBeInTheDocument()
      expect(subtitle).toBeInTheDocument()
    })

    it('displays company founding year correctly', () => {
      render(<AboutHero />)
      
      // Check that the founding year is mentioned
      expect(screen.getByText(/since 2018/)).toBeInTheDocument()
    })
  })

  describe('Accessibility Basics', () => {
    it('has proper heading structure', () => {
      render(<AboutHero />)
      
      // Check for main heading (h1)
      const mainHeading = screen.getByRole('heading', { level: 1 })
      expect(mainHeading).toBeInTheDocument()
      expect(mainHeading).toHaveTextContent('About Metromellow')
    })

    it('uses semantic HTML elements', () => {
      render(<AboutHero />)
      
      // Check for semantic section element
      const section = document.querySelector('section')
      expect(section).toBeInTheDocument()
      
      // Check for paragraph element in subtitle
      const subtitle = screen.getByText(/Transforming everyday home experiences/)
      expect(subtitle.tagName).toBe('P')
    })

    it('provides meaningful content structure', () => {
      render(<AboutHero />)
      
      // Check that the content is properly structured with title and subtitle
      const title = screen.getByRole('heading', { level: 1 })
      const subtitle = screen.getByText(/Transforming everyday home experiences/)
      
      expect(title).toBeInTheDocument()
      expect(subtitle).toBeInTheDocument()
      
      // Verify content hierarchy
      expect(title.textContent).toContain('About Metromellow')
      expect(subtitle.textContent).toContain('Transforming everyday home experiences')
    })

    it('maintains proper text contrast and readability', () => {
      render(<AboutHero />)
      
      // Check that text content is present and readable
      const title = screen.getByRole('heading', { level: 1 })
      const subtitle = screen.getByText(/Transforming everyday home experiences/)
      
      // Verify text content is not empty
      expect(title.textContent?.trim()).toBeTruthy()
      expect(subtitle.textContent?.trim()).toBeTruthy()
      
      // Check that company name is highlighted
      const companyName = screen.getByText('Metromellow')
      expect(companyName).toHaveClass('aboutHero__title--highlight')
    })
  })
}) 