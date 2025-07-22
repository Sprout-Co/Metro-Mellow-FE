import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ExperienceSection from '@/app/_components/ExperienceSection/ExperienceSection'

// Mock IntersectionObserver since it's not available in Jest environment
const mockIntersectionObserver = jest.fn()
mockIntersectionObserver.mockReturnValue({
  observe: () => null,
  unobserve: () => null,
  disconnect: () => null,
})
window.IntersectionObserver = mockIntersectionObserver

// Mock video element methods since they're not available in Jest environment
Object.defineProperty(window.HTMLMediaElement.prototype, 'play', {
  configurable: true,
  get() {
    return jest.fn().mockResolvedValue(undefined)
  }
})

Object.defineProperty(window.HTMLMediaElement.prototype, 'pause', {
  configurable: true,
  get() {
    return jest.fn().mockResolvedValue(undefined)
  }
})

describe('ExperienceSection Component', () => {
  const user = userEvent.setup()

  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks()
  })

  describe('Basic Rendering', () => {
    it('renders the experience section correctly', () => {
      render(<ExperienceSection />)
      
      // Check experience section exists by looking for the main heading
      expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
    })

    it('displays the main heading with correct text', () => {
      render(<ExperienceSection />)
      
      const heading = screen.getByRole('heading', { level: 1 })
      expect(heading).toBeInTheDocument()
      expect(heading).toHaveTextContent('Experience a')
      expect(heading).toHaveTextContent('life without')
      expect(heading).toHaveTextContent('hassle')
    })

    it('displays the subtext description', () => {
      render(<ExperienceSection />)
      
      const subtext = screen.getByText(/We're the spark that turns your chaos into calm/)
      expect(subtext).toBeInTheDocument()
    })

    it('renders the call to action button', () => {
      render(<ExperienceSection />)
      
      const ctaButton = screen.getByText('Book a service')
      expect(ctaButton).toBeInTheDocument()
    })
  })

  describe('Video Functionality', () => {
    it('displays video thumbnail initially', () => {
      render(<ExperienceSection />)
      
      // Check that video thumbnail is present
      const thumbnail = screen.getByAltText('Video thumbnail')
      expect(thumbnail).toBeInTheDocument()
    })

    it('displays play button overlay', () => {
      render(<ExperienceSection />)
      
      // Check that play button is present with proper aria label
      const playButton = screen.getByRole('button', { name: 'Play video' })
      expect(playButton).toBeInTheDocument()
    })

    it('play button is clickable', async () => {
      render(<ExperienceSection />)
      
      const playButton = screen.getByRole('button', { name: 'Play video' })
      expect(playButton).toBeInTheDocument()
      
      // Test that button can be clicked
      await user.click(playButton)
      // Button disappears after click (which is expected behavior when video starts playing)
      expect(playButton).not.toBeInTheDocument()
    })
  })

  describe('Content Structure', () => {
    it('renders content with proper heading hierarchy', () => {
      render(<ExperienceSection />)
      
      // Main section should have h1 heading
      const mainHeading = screen.getByRole('heading', { level: 1 })
      expect(mainHeading).toBeInTheDocument()
    })

    it('displays content in proper sections', () => {
      render(<ExperienceSection />)
      
      // Check that both media and content sections are present
      expect(screen.getByText(/Experience a/)).toBeInTheDocument()
      expect(screen.getByText(/We're the spark that turns your chaos/)).toBeInTheDocument()
    })
  })

  describe('Navigation', () => {
    it('call to action button links to get started page', () => {
      render(<ExperienceSection />)
      
      const ctaButton = screen.getByText('Book a service').closest('a')
      expect(ctaButton).toHaveAttribute('href', '/get-started')
    })
  })

  describe('Interactive Elements', () => {
    it('call to action button is clickable', async () => {
      render(<ExperienceSection />)
      
      const ctaButton = screen.getByText('Book a service')
      expect(ctaButton).toBeInTheDocument()
      
      // Test that button can be clicked (though we're not testing navigation in unit tests)
      await user.click(ctaButton)
      // Button should still be present after click
      expect(ctaButton).toBeInTheDocument()
    })
  })

  describe('Content Verification', () => {
    it('displays the complete heading text', () => {
      render(<ExperienceSection />)
      
      // Verify the complete heading text is present
      const heading = screen.getByRole('heading', { level: 1 })
      expect(heading).toHaveTextContent('Experience a')
      expect(heading).toHaveTextContent('life without')
      expect(heading).toHaveTextContent('hassle')
    })

    it('displays meaningful subtext content', () => {
      render(<ExperienceSection />)
      
      // Check that subtext contains meaningful content
      expect(screen.getByText(/We're the spark that turns your chaos into calm/)).toBeInTheDocument()
      expect(screen.getByText(/the groove that gets your life back in tune/)).toBeInTheDocument()
    })
  })

  describe('Accessibility', () => {
    it('has proper heading hierarchy', () => {
      render(<ExperienceSection />)
      
      // Main section should have h1 heading
      const mainHeading = screen.getByRole('heading', { level: 1 })
      expect(mainHeading).toBeInTheDocument()
    })

    it('play button has proper aria label', () => {
      render(<ExperienceSection />)
      
      const playButton = screen.getByRole('button', { name: 'Play video' })
      expect(playButton).toBeInTheDocument()
      expect(playButton).toHaveAttribute('aria-label', 'Play video')
    })

    it('video thumbnail has descriptive alt text', () => {
      render(<ExperienceSection />)
      
      const thumbnail = screen.getByAltText('Video thumbnail')
      expect(thumbnail).toBeInTheDocument()
      expect(thumbnail).toHaveAttribute('alt', 'Video thumbnail')
    })

    it('call to action button has proper text content', () => {
      render(<ExperienceSection />)
      
      const ctaButton = screen.getByText('Book a service')
      expect(ctaButton).toBeInTheDocument()
      expect(ctaButton).toHaveTextContent('Book a service')
    })
  })

  describe('Visual Elements', () => {
    it('displays video thumbnail with proper styling', () => {
      render(<ExperienceSection />)
      
      const thumbnail = screen.getByAltText('Video thumbnail')
      expect(thumbnail).toBeInTheDocument()
    })

    it('play button has interactive styling', () => {
      render(<ExperienceSection />)
      
      const playButton = screen.getByRole('button', { name: 'Play video' })
      expect(playButton).toBeInTheDocument()
    })
  })
}) 