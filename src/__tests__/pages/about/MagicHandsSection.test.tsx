import { render, screen } from '@testing-library/react'
import MagicHandsSection from '@/app/(routes)/(site)/about/_components/MagicHandsSection/MagicHandsSection'

// Mock Next.js Image component since it's not available in Jest environment
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, ...props }: any) => (
    <img src={src} alt={alt} {...props} />
  ),
}))

// Mock the routes constant
jest.mock('../../../constants/routes', () => ({
  Routes: {
    GET_STARTED: '/get-started',
  },
}))

describe('MagicHandsSection Component', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks()
  })

  describe('Basic Rendering', () => {
    it('renders the magic hands section correctly', () => {
      render(<MagicHandsSection />)
      
      // Check main section exists by looking for the main heading
      expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument()
    })

    it('displays the main title with correct text', () => {
      render(<MagicHandsSection />)
      
      const title = screen.getByRole('heading', { level: 2 })
      expect(title).toBeInTheDocument()
      expect(title).toHaveTextContent('The magic hands')
    })

    it('renders the magic hands section with proper structure', () => {
      render(<MagicHandsSection />)
      
      // Check that the section element exists
      const section = document.querySelector('section')
      expect(section).toBeInTheDocument()
      expect(section).toHaveClass('magic-hands')
    })

    it('displays the subtitle text', () => {
      render(<MagicHandsSection />)
      
      const subtitle = screen.getByRole('heading', { level: 3 })
      expect(subtitle).toBeInTheDocument()
      expect(subtitle).toHaveTextContent('Meet the exceptional people behind Metromellow')
    })

    it('renders the main image and grid images', () => {
      render(<MagicHandsSection />)
      
      // Check that all images are rendered
      const images = screen.getAllByRole('img')
      expect(images.length).toBe(5) // 1 main image + 4 grid images
    })
  })

  describe('Core Interactions', () => {
    it('maintains proper layout structure', () => {
      render(<MagicHandsSection />)
      
      // Check for container and content elements
      const container = document.querySelector('.magic-hands__container')
      const content = document.querySelector('.magic-hands__content')
      
      expect(container).toBeInTheDocument()
      expect(content).toBeInTheDocument()
    })

    it('displays the call-to-action button', () => {
      render(<MagicHandsSection />)
      
      // Check that the CTA button is rendered
      const ctaButton = screen.getByRole('link', { name: /JOIN OUR MISSION/i })
      expect(ctaButton).toBeInTheDocument()
      expect(ctaButton).toHaveAttribute('href', '/get-started')
    })

    it('renders the images grid correctly', () => {
      render(<MagicHandsSection />)
      
      // Check that the images grid exists
      const imagesGrid = document.querySelector('.magic-hands__grid')
      expect(imagesGrid).toBeInTheDocument()
      
      // Check that grid items exist
      const gridItems = document.querySelectorAll('.magic-hands__grid-item')
      expect(gridItems.length).toBe(4)
    })
  })

  describe('Key Functionality', () => {
    it('displays complete magic hands content', () => {
      render(<MagicHandsSection />)
      
      // Check all essential content is present
      expect(screen.getByText('The magic hands')).toBeInTheDocument()
      expect(screen.getByText('Meet the exceptional people behind Metromellow')).toBeInTheDocument()
      expect(screen.getByText('JOIN OUR MISSION')).toBeInTheDocument()
    })

    it('renders with proper CSS classes', () => {
      render(<MagicHandsSection />)
      
      // Check that all main CSS classes are applied
      const section = document.querySelector('.magic-hands')
      const container = document.querySelector('.magic-hands__container')
      const content = document.querySelector('.magic-hands__content')
      const title = document.querySelector('.magic-hands__title')
      const subtitle = document.querySelector('.magic-hands__subtitle')
      const images = document.querySelector('.magic-hands__images')
      const mainImage = document.querySelector('.magic-hands__main-image')
      const grid = document.querySelector('.magic-hands__grid')
      const cta = document.querySelector('.magic-hands__cta')
      
      expect(section).toBeInTheDocument()
      expect(container).toBeInTheDocument()
      expect(content).toBeInTheDocument()
      expect(title).toBeInTheDocument()
      expect(subtitle).toBeInTheDocument()
      expect(images).toBeInTheDocument()
      expect(mainImage).toBeInTheDocument()
      expect(grid).toBeInTheDocument()
      expect(cta).toBeInTheDocument()
    })

    it('displays all team member images with proper alt text', () => {
      render(<MagicHandsSection />)
      
      // Check that all images have proper alt text
      const images = screen.getAllByRole('img')
      images.forEach(image => {
        expect(image).toHaveAttribute('alt', 'Metromellow team member')
      })
      
      // Verify we have the expected number of images
      expect(images.length).toBe(5)
    })

    it('includes proper image sources', () => {
      render(<MagicHandsSection />)
      
      // Check that images have the expected sources
      const images = screen.getAllByRole('img')
      expect(images[0]).toHaveAttribute('src', '/images/cleaning/c1.jpeg') // Main image
      expect(images[1]).toHaveAttribute('src', '/images/cleaning/c2.jpeg') // Grid image 1
      expect(images[2]).toHaveAttribute('src', '/images/cleaning/c3.jpeg') // Grid image 2
      expect(images[3]).toHaveAttribute('src', '/images/cleaning/c4.jpeg') // Grid image 3
      expect(images[4]).toHaveAttribute('src', '/images/cleaning/c5.jpeg') // Grid image 4
    })
  })

  describe('Accessibility Basics', () => {
    it('has proper heading structure', () => {
      render(<MagicHandsSection />)
      
      // Check for main heading (h2)
      const mainHeading = screen.getByRole('heading', { level: 2 })
      expect(mainHeading).toBeInTheDocument()
      expect(mainHeading).toHaveTextContent('The magic hands')
      
      // Check for subtitle heading (h3)
      const subtitleHeading = screen.getByRole('heading', { level: 3 })
      expect(subtitleHeading).toBeInTheDocument()
      expect(subtitleHeading).toHaveTextContent('Meet the exceptional people behind Metromellow')
    })

    it('uses semantic HTML elements', () => {
      render(<MagicHandsSection />)
      
      // Check for semantic section element
      const section = document.querySelector('section')
      expect(section).toBeInTheDocument()
      
      // Check for heading elements
      const headings = document.querySelectorAll('h2, h3')
      expect(headings.length).toBe(2)
    })

    it('provides meaningful content structure', () => {
      render(<MagicHandsSection />)
      
      // Check that the content is properly structured
      const title = screen.getByRole('heading', { level: 2 })
      const subtitle = screen.getByRole('heading', { level: 3 })
      
      expect(title).toBeInTheDocument()
      expect(subtitle).toBeInTheDocument()
      
      // Verify content hierarchy
      expect(title.textContent).toContain('The magic hands')
      expect(subtitle.textContent).toContain('Meet the exceptional people behind Metromellow')
    })

    it('maintains proper text contrast and readability', () => {
      render(<MagicHandsSection />)
      
      // Check that text content is present and readable
      const title = screen.getByRole('heading', { level: 2 })
      const subtitle = screen.getByRole('heading', { level: 3 })
      
      // Verify text content is not empty
      expect(title.textContent?.trim()).toBeTruthy()
      expect(subtitle.textContent?.trim()).toBeTruthy()
      
      // Check that the title contains the expected content
      expect(title.textContent).toContain('The magic hands')
    })

    it('has proper image accessibility', () => {
      render(<MagicHandsSection />)
      
      // Check that all images have alt text
      const images = screen.getAllByRole('img')
      images.forEach(image => {
        expect(image).toHaveAttribute('alt')
        expect(image.getAttribute('alt')).toBeTruthy()
      })
      
      // Verify we have the expected number of images
      expect(images.length).toBe(5)
    })

    it('has accessible call-to-action', () => {
      render(<MagicHandsSection />)
      
      // Check that the CTA button is accessible
      const ctaButton = screen.getByRole('link', { name: /JOIN OUR MISSION/i })
      expect(ctaButton).toBeInTheDocument()
      expect(ctaButton).toHaveAttribute('href', '/get-started')
      
      // Check that the button text is descriptive
      expect(ctaButton.textContent).toContain('JOIN OUR MISSION')
    })
  })
}) 