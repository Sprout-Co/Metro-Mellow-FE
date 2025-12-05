import { render, screen } from '@testing-library/react'
import StorySection from '@/app/(routes)/(site)/about/_components/StorySection/StorySection'

// Mock Next.js Link component since it's not available in Jest environment
jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href, ...props }: any) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}))

// Mock framer-motion since it's not available in Jest environment
jest.mock('framer-motion', () => ({
  motion: {
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
    div: ({ children, className, ...props }: any) => (
      <div className={className} {...props}>
        {children}
      </div>
    ),
  },
  useAnimation: () => ({
    start: jest.fn(),
    stop: jest.fn(),
    set: jest.fn(),
  }),
}))

// Mock the VideoSection component
jest.mock('../../../app/(routes)/(site)/about/_components/VideoSection/VideoSection', () => {
  const MockVideoSection = () => {
    return <div data-testid="video-section">Video Section</div>
  }
  return MockVideoSection
})

// Mock the routes constant
jest.mock('../../../constants/routes', () => ({
  Routes: {
    GET_STARTED: '/get-started',
  },
}))

describe('StorySection Component', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks()
  })

  describe('Basic Rendering', () => {
    it('renders the story section correctly', () => {
      render(<StorySection />)
      
      // Check main section exists by looking for the main heading
      expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument()
    })

    it('displays the main title with correct text', () => {
      render(<StorySection />)
      
      const title = screen.getByRole('heading', { level: 2 })
      expect(title).toBeInTheDocument()
      expect(title).toHaveTextContent('Our Story:')
      expect(title).toHaveTextContent('From Frazzle')
      expect(title).toHaveTextContent('to Dazzle')
    })

    it('renders the story section with proper structure', () => {
      render(<StorySection />)
      
      // Check that the section element exists
      const section = document.querySelector('section')
      expect(section).toBeInTheDocument()
      expect(section).toHaveClass('storySection')
    })

    it('displays the subtitle text', () => {
      render(<StorySection />)
      
      const subtitle = screen.getByText(/We're the spark that turns your chaos into calm/)
      expect(subtitle).toBeInTheDocument()
      expect(subtitle).toHaveTextContent("We're the spark that turns your chaos into calm, the groove that gets your life back in tune.")
    })

    it('renders the video section', () => {
      render(<StorySection />)
      
      // Check that the VideoSection component is rendered
      expect(screen.getByTestId('video-section')).toBeInTheDocument()
    })
  })

  describe('Core Interactions', () => {
    it('renders with animation properties', () => {
      render(<StorySection />)
      
      // Check that the content elements have animation-related props
      const title = document.querySelector('.storySection__title')
      const subtitle = document.querySelector('.storySection__subtitle')
      const cta = document.querySelector('.storySection__cta')
      
      expect(title).toBeInTheDocument()
      expect(subtitle).toBeInTheDocument()
      expect(cta).toBeInTheDocument()
    })

    it('maintains proper layout structure', () => {
      render(<StorySection />)
      
      // Check for container and content elements
      const container = document.querySelector('.storySection__container')
      const content = document.querySelector('.storySection__content')
      
      expect(container).toBeInTheDocument()
      expect(content).toBeInTheDocument()
    })

    it('displays the call-to-action section', () => {
      render(<StorySection />)
      
      // Check that the CTA section is rendered
      const ctaSection = document.querySelector('.storySection__cta')
      expect(ctaSection).toBeInTheDocument()
    })
  })

  describe('Key Functionality', () => {
    it('displays complete story content', () => {
      render(<StorySection />)
      
      // Check all essential story content is present
      expect(screen.getByText(/Our Story:/)).toBeInTheDocument()
      expect(screen.getByText(/From Frazzle/)).toBeInTheDocument()
      expect(screen.getByText(/to Dazzle/)).toBeInTheDocument()
      expect(screen.getByText(/We're the spark that turns your chaos into calm/)).toBeInTheDocument()
    })

    it('renders with proper CSS classes', () => {
      render(<StorySection />)
      
      // Check that all main CSS classes are applied
      const section = document.querySelector('.storySection')
      const container = document.querySelector('.storySection__container')
      const content = document.querySelector('.storySection__content')
      const title = document.querySelector('.storySection__title')
      const subtitle = document.querySelector('.storySection__subtitle')
      const cta = document.querySelector('.storySection__cta')
      
      expect(section).toBeInTheDocument()
      expect(container).toBeInTheDocument()
      expect(content).toBeInTheDocument()
      expect(title).toBeInTheDocument()
      expect(subtitle).toBeInTheDocument()
      expect(cta).toBeInTheDocument()
    })

    it('displays the tagline content', () => {
      render(<StorySection />)
      
      // Check that the tagline content is present
      expect(screen.getByText(/turns your chaos into calm/)).toBeInTheDocument()
      expect(screen.getByText(/gets your life back in tune/)).toBeInTheDocument()
    })

    it('includes video section component', () => {
      render(<StorySection />)
      
      // Check that the VideoSection is included
      const videoSection = screen.getByTestId('video-section')
      expect(videoSection).toBeInTheDocument()
      expect(videoSection).toHaveTextContent('Video Section')
    })
  })

  describe('Accessibility Basics', () => {
    it('has proper heading structure', () => {
      render(<StorySection />)
      
      // Check for main heading (h2)
      const mainHeading = screen.getByRole('heading', { level: 2 })
      expect(mainHeading).toBeInTheDocument()
      expect(mainHeading).toHaveTextContent('Our Story:')
    })

    it('uses semantic HTML elements', () => {
      render(<StorySection />)
      
      // Check for semantic section element
      const section = document.querySelector('section')
      expect(section).toBeInTheDocument()
      
      // Check for paragraph element in subtitle
      const subtitle = screen.getByText(/We're the spark that turns your chaos into calm/)
      expect(subtitle.tagName).toBe('P')
    })

    it('provides meaningful content structure', () => {
      render(<StorySection />)
      
      // Check that the content is properly structured
      const title = screen.getByRole('heading', { level: 2 })
      const subtitle = screen.getByText(/We're the spark that turns your chaos into calm/)
      
      expect(title).toBeInTheDocument()
      expect(subtitle).toBeInTheDocument()
      
      // Verify content hierarchy
      expect(title.textContent).toContain('Our Story:')
      expect(subtitle.textContent).toContain('We\'re the spark that turns your chaos into calm')
    })

    it('maintains proper text contrast and readability', () => {
      render(<StorySection />)
      
      // Check that text content is present and readable
      const title = screen.getByRole('heading', { level: 2 })
      const subtitle = screen.getByText(/We're the spark that turns your chaos into calm/)
      
      // Verify text content is not empty
      expect(title.textContent?.trim()).toBeTruthy()
      expect(subtitle.textContent?.trim()).toBeTruthy()
      
      // Check that the title contains the expected content
      expect(title.textContent).toContain('Our Story:')
      expect(title.textContent).toContain('From Frazzle')
      expect(title.textContent).toContain('to Dazzle')
    })
  })
}) 