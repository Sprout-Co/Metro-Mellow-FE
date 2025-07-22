import { render, screen } from '@testing-library/react'
import OurStory from '@/app/(routes)/(site)/about/_components/OurStory/OurStory'

// Mock Next.js Image component since it's not available in Jest environment
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, width, height, className }: any) => (
    <img 
      src={src} 
      alt={alt} 
      width={width} 
      height={height} 
      className={className}
    />
  ),
}))

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

describe('OurStory Component', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks()
  })

  describe('Basic Rendering', () => {
    it('renders the our story section correctly', () => {
      render(<OurStory />)
      
      // Check main section exists by looking for the main heading
      expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument()
    })

    it('displays the main title with correct text', () => {
      render(<OurStory />)
      
      const title = screen.getByRole('heading', { level: 2 })
      expect(title).toBeInTheDocument()
      expect(title).toHaveTextContent('Our Story')
    })

    it('renders the story section with proper structure', () => {
      render(<OurStory />)
      
      // Check that the section element exists
      const section = document.querySelector('section')
      expect(section).toBeInTheDocument()
      expect(section).toHaveClass('story')
    })

    it('displays the main story image', () => {
      render(<OurStory />)
      
      // Check that the main image is rendered
      const mainImage = screen.getByAltText('Metromellow founders')
      expect(mainImage).toBeInTheDocument()
      expect(mainImage).toHaveAttribute('src', '/images/our-story.webp')
    })

    it('displays the signature image', () => {
      render(<OurStory />)
      
      // Check that the signature image is rendered
      const signatureImage = screen.getByAltText("Founders' signature")
      expect(signatureImage).toBeInTheDocument()
      expect(signatureImage).toHaveAttribute('src', '/images/signature.webp')
    })
  })

  describe('Core Interactions', () => {
    it('renders with animation properties', () => {
      render(<OurStory />)
      
      // Check that the content divs have animation-related props
      const imageDiv = document.querySelector('.story__image')
      const contentDiv = document.querySelector('.story__content')
      
      expect(imageDiv).toBeInTheDocument()
      expect(contentDiv).toBeInTheDocument()
    })

    it('maintains proper layout structure', () => {
      render(<OurStory />)
      
      // Check for container and grid elements
      const container = document.querySelector('.story__container')
      const grid = document.querySelector('.story__grid')
      
      expect(container).toBeInTheDocument()
      expect(grid).toBeInTheDocument()
    })

    it('displays image accent element', () => {
      render(<OurStory />)
      
      // Check for the image accent element
      const imageAccent = document.querySelector('.story__imageAccent')
      expect(imageAccent).toBeInTheDocument()
    })
  })

  describe('Key Functionality', () => {
    it('displays complete story content', () => {
      render(<OurStory />)
      
      // Check all essential story content is present
      expect(screen.getByText('Our Story')).toBeInTheDocument()
      expect(screen.getByText(/Metromellow began in 2018/)).toBeInTheDocument()
      expect(screen.getByText(/Sarah Chen and Marcus Thompson/)).toBeInTheDocument()
      expect(screen.getByText(/Sarah Chen & Marcus Thompson, Founders/)).toBeInTheDocument()
    })

    it('renders with proper CSS classes', () => {
      render(<OurStory />)
      
      // Check that all main CSS classes are applied
      const section = document.querySelector('.story')
      const container = document.querySelector('.story__container')
      const grid = document.querySelector('.story__grid')
      const image = document.querySelector('.story__image')
      const content = document.querySelector('.story__content')
      const title = document.querySelector('.story__title')
      
      expect(section).toBeInTheDocument()
      expect(container).toBeInTheDocument()
      expect(grid).toBeInTheDocument()
      expect(image).toBeInTheDocument()
      expect(content).toBeInTheDocument()
      expect(title).toBeInTheDocument()
    })

    it('displays company founding information', () => {
      render(<OurStory />)
      
      // Check that founding year and founders are mentioned
      expect(screen.getByText(/2018/)).toBeInTheDocument()
      expect(screen.getByText(/Sarah Chen and Marcus Thompson/)).toBeInTheDocument()
    })

    it('displays company mission and values', () => {
      render(<OurStory />)
      
      // Check that mission and values content is present
      expect(screen.getByText(/maintaining a comfortable home shouldn't be stressful/)).toBeInTheDocument()
      expect(screen.getByText(/high-quality, reliable home services/)).toBeInTheDocument()
      expect(screen.getByText(/exceptional service, reliable staff/)).toBeInTheDocument()
    })

    it('displays founders signature section', () => {
      render(<OurStory />)
      
      // Check that the signature section is present
      const signatureSection = document.querySelector('.story__signature')
      expect(signatureSection).toBeInTheDocument()
      
      // Check founders text
      expect(screen.getByText('Sarah Chen & Marcus Thompson, Founders')).toBeInTheDocument()
    })
  })

  describe('Accessibility Basics', () => {
    it('has proper heading structure', () => {
      render(<OurStory />)
      
      // Check for main heading (h2)
      const mainHeading = screen.getByRole('heading', { level: 2 })
      expect(mainHeading).toBeInTheDocument()
      expect(mainHeading).toHaveTextContent('Our Story')
    })

    it('provides proper alt text for images', () => {
      render(<OurStory />)
      
      // Check that images have meaningful alt text
      const mainImage = screen.getByAltText('Metromellow founders')
      const signatureImage = screen.getByAltText("Founders' signature")
      
      expect(mainImage).toBeInTheDocument()
      expect(signatureImage).toBeInTheDocument()
    })

    it('uses semantic HTML elements', () => {
      render(<OurStory />)
      
      // Check for semantic section element
      const section = document.querySelector('section')
      expect(section).toBeInTheDocument()
      
      // Check for paragraph elements in story content
      const paragraphs = document.querySelectorAll('.story__paragraph')
      expect(paragraphs.length).toBeGreaterThan(0)
      
      paragraphs.forEach(paragraph => {
        expect(paragraph.tagName).toBe('P')
      })
    })

    it('provides meaningful content structure', () => {
      render(<OurStory />)
      
      // Check that the content is properly structured
      const title = screen.getByRole('heading', { level: 2 })
      const paragraphs = document.querySelectorAll('.story__paragraph')
      const founders = screen.getByText('Sarah Chen & Marcus Thompson, Founders')
      
      expect(title).toBeInTheDocument()
      expect(paragraphs.length).toBeGreaterThan(0)
      expect(founders).toBeInTheDocument()
      
      // Verify content hierarchy
      expect(title.textContent).toContain('Our Story')
      expect(founders.textContent).toContain('Sarah Chen & Marcus Thompson, Founders')
    })

    it('displays divider element for visual separation', () => {
      render(<OurStory />)
      
      // Check that the divider element exists
      const divider = document.querySelector('.story__divider')
      expect(divider).toBeInTheDocument()
    })
  })
}) 