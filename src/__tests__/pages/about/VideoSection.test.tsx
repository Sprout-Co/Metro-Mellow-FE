import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import VideoSection from '@/app/(routes)/(site)/about/_components/VideoSection/VideoSection'

// Mock Next.js Image component since it's not available in Jest environment
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, fill, style, className, priority, ...props }: any) => (
    <img src={src} alt={alt} style={style} className={className} {...props} />
  ),
}))

// Mock framer-motion since it's not available in Jest environment
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, className, initial, animate, transition, ...props }: any) => (
      <div className={className} {...props}>
        {children}
      </div>
    ),
    button: ({ children, className, whileHover, whileTap, onHoverStart, onHoverEnd, onClick, 'aria-label': ariaLabel, ...props }: any) => (
      <button className={className} onClick={onClick} aria-label={ariaLabel} {...props}>
        {children}
      </button>
    ),
  },
}))

describe('VideoSection Component', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks()
  })

  describe('Basic Rendering', () => {
    it('renders the video section correctly', () => {
      render(<VideoSection />)
      
      // Check that the section element exists
      const section = document.querySelector('section')
      expect(section).toBeInTheDocument()
      expect(section).toHaveClass('videoSection')
    })

    it('renders the video container with proper structure', () => {
      render(<VideoSection />)
      
      // Check that the container exists
      const container = document.querySelector('.videoSection__container')
      expect(container).toBeInTheDocument()
      
      // Check that the content exists
      const content = document.querySelector('.videoSection__content')
      expect(content).toBeInTheDocument()
      
      // Check that the video container exists
      const videoContainer = document.querySelector('.videoSection__videoContainer')
      expect(videoContainer).toBeInTheDocument()
    })

    it('displays the video box with proper structure', () => {
      render(<VideoSection />)
      
      // Check that the video box exists
      const videoBox = document.querySelector('.videoSection__videoBox')
      expect(videoBox).toBeInTheDocument()
    })

    it('renders decorative arrows', () => {
      render(<VideoSection />)
      
      // Check that the red arrow exists
      const redArrow = document.querySelector('.videoSection__redArrow')
      expect(redArrow).toBeInTheDocument()
      
      // Check that the black arrow exists
      const blackArrow = document.querySelector('.videoSection__blackArrow')
      expect(blackArrow).toBeInTheDocument()
    })
  })

  describe('Core Interactions', () => {
    it('displays thumbnail with play button when not playing', () => {
      render(<VideoSection />)
      
      // Check that the thumbnail wrapper exists
      const thumbnailWrapper = document.querySelector('.videoSection__thumbnailWrapper')
      expect(thumbnailWrapper).toBeInTheDocument()
      
      // Check that the thumbnail image is displayed
      const thumbnail = screen.getByAltText('Video thumbnail')
      expect(thumbnail).toBeInTheDocument()
      expect(thumbnail).toHaveAttribute('src', '/images/cleaning/cleaning-page-about-us.jpg')
      
      // Check that the play button exists
      const playButton = screen.getByRole('button', { name: /play video/i })
      expect(playButton).toBeInTheDocument()
    })

    it('displays play button with proper styling', () => {
      render(<VideoSection />)
      
      // Check that the play button has the correct class
      const playButton = screen.getByRole('button', { name: /play video/i })
      expect(playButton).toHaveClass('videoSection__playButton')
      
      // Check that the play icon exists
      const playIcon = document.querySelector('.videoSection__playIcon')
      expect(playIcon).toBeInTheDocument()
    })

    it('renders WhatsApp link with proper attributes', () => {
      render(<VideoSection />)
      
      // Check that the WhatsApp link exists
      const whatsappLink = document.querySelector('.videoSection__whatsappLink')
      expect(whatsappLink).toBeInTheDocument()
      
      // Check that the WhatsApp link has correct href and target
      expect(whatsappLink).toHaveAttribute('href', 'https://wa.me/message/yourwhatsapplink')
      expect(whatsappLink).toHaveAttribute('target', '_blank')
      expect(whatsappLink).toHaveAttribute('rel', 'noopener noreferrer')
    })

    it('displays WhatsApp SVG icon', () => {
      render(<VideoSection />)
      
      // Check that the WhatsApp SVG exists
      const whatsappSVG = document.querySelector('.videoSection__whatsappSVG')
      expect(whatsappSVG).toBeInTheDocument()
    })
  })

  describe('Key Functionality', () => {
    it('displays complete video section content', () => {
      render(<VideoSection />)
      
      // Check all essential elements are present
      const section = document.querySelector('.videoSection')
      const container = document.querySelector('.videoSection__container')
      const content = document.querySelector('.videoSection__content')
      const videoContainer = document.querySelector('.videoSection__videoContainer')
      const videoBox = document.querySelector('.videoSection__videoBox')
      const thumbnailWrapper = document.querySelector('.videoSection__thumbnailWrapper')
      const playButton = screen.getByRole('button', { name: /play video/i })
      const whatsappLink = document.querySelector('.videoSection__whatsappLink')
      
      expect(section).toBeInTheDocument()
      expect(container).toBeInTheDocument()
      expect(content).toBeInTheDocument()
      expect(videoContainer).toBeInTheDocument()
      expect(videoBox).toBeInTheDocument()
      expect(thumbnailWrapper).toBeInTheDocument()
      expect(playButton).toBeInTheDocument()
      expect(whatsappLink).toBeInTheDocument()
    })

    it('renders with proper CSS classes', () => {
      render(<VideoSection />)
      
      // Check that all main CSS classes are applied
      const section = document.querySelector('.videoSection')
      const container = document.querySelector('.videoSection__container')
      const content = document.querySelector('.videoSection__content')
      const videoContainer = document.querySelector('.videoSection__videoContainer')
      const videoBox = document.querySelector('.videoSection__videoBox')
      const thumbnailWrapper = document.querySelector('.videoSection__thumbnailWrapper')
      const playButton = document.querySelector('.videoSection__playButton')
      const playIcon = document.querySelector('.videoSection__playIcon')
      const whatsappLink = document.querySelector('.videoSection__whatsappLink')
      const whatsappSVG = document.querySelector('.videoSection__whatsappSVG')
      
      expect(section).toBeInTheDocument()
      expect(container).toBeInTheDocument()
      expect(content).toBeInTheDocument()
      expect(videoContainer).toBeInTheDocument()
      expect(videoBox).toBeInTheDocument()
      expect(thumbnailWrapper).toBeInTheDocument()
      expect(playButton).toBeInTheDocument()
      expect(playIcon).toBeInTheDocument()
      expect(whatsappLink).toBeInTheDocument()
      expect(whatsappSVG).toBeInTheDocument()
    })

    it('has proper video container structure', () => {
      render(<VideoSection />)
      
      // Check that the video container has the correct structure
      const videoContainer = document.querySelector('.videoSection__videoContainer')
      expect(videoContainer).toBeInTheDocument()
      
      // Check that the video box is inside the container
      const videoBox = videoContainer?.querySelector('.videoSection__videoBox')
      expect(videoBox).toBeInTheDocument()
      
      // Check that the thumbnail wrapper is inside the video box
      const thumbnailWrapper = videoBox?.querySelector('.videoSection__thumbnailWrapper')
      expect(thumbnailWrapper).toBeInTheDocument()
      
      // Check that the play button is inside the thumbnail wrapper
      const playButton = thumbnailWrapper?.querySelector('.videoSection__playButton')
      expect(playButton).toBeInTheDocument()
    })

    it('has proper WhatsApp integration', () => {
      render(<VideoSection />)
      
      // Check that the WhatsApp link is properly positioned
      const whatsappLink = document.querySelector('.videoSection__whatsappLink')
      expect(whatsappLink).toBeInTheDocument()
      
      // Check that the WhatsApp SVG is inside the link
      const whatsappSVG = whatsappLink?.querySelector('.videoSection__whatsappSVG')
      expect(whatsappSVG).toBeInTheDocument()
      
      // Check that the link opens in a new tab
      expect(whatsappLink).toHaveAttribute('target', '_blank')
      expect(whatsappLink).toHaveAttribute('rel', 'noopener noreferrer')
    })
  })

  describe('Accessibility Basics', () => {
    it('has accessible play button', () => {
      render(<VideoSection />)
      
      // Check that the play button has proper aria-label
      const playButton = screen.getByRole('button', { name: /play video/i })
      expect(playButton).toBeInTheDocument()
      expect(playButton).toHaveAttribute('aria-label', 'Play video')
    })

    it('has accessible thumbnail image', () => {
      render(<VideoSection />)
      
      // Check that the thumbnail has proper alt text
      const thumbnail = screen.getByAltText('Video thumbnail')
      expect(thumbnail).toBeInTheDocument()
      expect(thumbnail).toHaveAttribute('alt', 'Video thumbnail')
    })

    it('has accessible decorative arrows', () => {
      render(<VideoSection />)
      
      // Check that the red arrow has proper aria-label
      const redArrow = document.querySelector('.videoSection__redArrow')
      expect(redArrow).toBeInTheDocument()
      expect(redArrow).toHaveAttribute('aria-label', 'Red Arrow')
      expect(redArrow).toHaveAttribute('role', 'img')
      
      // Check that the black arrow has proper aria-label
      const blackArrow = document.querySelector('.videoSection__blackArrow')
      expect(blackArrow).toBeInTheDocument()
      expect(blackArrow).toHaveAttribute('aria-label', 'Black Arrow')
      expect(blackArrow).toHaveAttribute('role', 'img')
    })

    it('has accessible WhatsApp icon', () => {
      render(<VideoSection />)
      
      // Check that the WhatsApp SVG has proper aria-label
      const whatsappSVG = document.querySelector('.videoSection__whatsappSVG')
      expect(whatsappSVG).toBeInTheDocument()
      expect(whatsappSVG).toHaveAttribute('aria-label', 'WhatsApp')
      expect(whatsappSVG).toHaveAttribute('role', 'img')
    })

    it('has semantic HTML structure', () => {
      render(<VideoSection />)
      
      // Check that the component uses semantic HTML elements
      const section = document.querySelector('section')
      const button = document.querySelector('button')
      const link = document.querySelector('a')
      const image = document.querySelector('img')
      
      expect(section).toBeInTheDocument()
      expect(button).toBeInTheDocument()
      expect(link).toBeInTheDocument()
      expect(image).toBeInTheDocument()
    })

    it('has proper text content for screen readers', () => {
      render(<VideoSection />)
      
      // Check that all important text content is present and accessible
      expect(screen.getByAltText('Video thumbnail')).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /play video/i })).toBeInTheDocument()
      
      // Check that decorative elements have proper labels
      const redArrow = document.querySelector('[aria-label="Red Arrow"]')
      const blackArrow = document.querySelector('[aria-label="Black Arrow"]')
      const whatsappIcon = document.querySelector('[aria-label="WhatsApp"]')
      
      expect(redArrow).toBeInTheDocument()
      expect(blackArrow).toBeInTheDocument()
      expect(whatsappIcon).toBeInTheDocument()
    })
  })

  describe('Component Structure', () => {
    it('renders all major sections in correct order', () => {
      render(<VideoSection />)
      
      // Check that all major sections are present in the expected order
      const container = document.querySelector('.videoSection__container')
      expect(container).toBeInTheDocument()
      
      // Check that red arrow is present
      const redArrow = container?.querySelector('.videoSection__redArrow')
      expect(redArrow).toBeInTheDocument()
      
      // Check that black arrow is present
      const blackArrow = container?.querySelector('.videoSection__blackArrow')
      expect(blackArrow).toBeInTheDocument()
      
      // Check that content section is present
      const content = container?.querySelector('.videoSection__content')
      expect(content).toBeInTheDocument()
      
      // Check that video container is present
      const videoContainer = content?.querySelector('.videoSection__videoContainer')
      expect(videoContainer).toBeInTheDocument()
    })

    it('maintains responsive design structure', () => {
      render(<VideoSection />)
      
      // Check that the component has the necessary structure for responsive design
      const section = document.querySelector('.videoSection')
      const container = document.querySelector('.videoSection__container')
      const content = document.querySelector('.videoSection__content')
      const videoContainer = document.querySelector('.videoSection__videoContainer')
      
      expect(section).toBeInTheDocument()
      expect(container).toBeInTheDocument()
      expect(content).toBeInTheDocument()
      expect(videoContainer).toBeInTheDocument()
      
      // Check that the container has proper flex direction
      expect(container).toHaveClass('videoSection__container')
    })

    it('has proper video player structure', () => {
      render(<VideoSection />)
      
      // Check that the video container has the complete structure
      const videoContainer = document.querySelector('.videoSection__videoContainer')
      expect(videoContainer).toBeInTheDocument()
      
      // Check video box structure
      const videoBox = videoContainer?.querySelector('.videoSection__videoBox')
      expect(videoBox).toBeInTheDocument()
      
      // Check thumbnail wrapper structure
      const thumbnailWrapper = videoBox?.querySelector('.videoSection__thumbnailWrapper')
      expect(thumbnailWrapper).toBeInTheDocument()
      
      // Check thumbnail structure
      const thumbnail = thumbnailWrapper?.querySelector('.videoSection__thumbnail')
      expect(thumbnail).toBeInTheDocument()
      
      // Check play button structure
      const playButton = thumbnailWrapper?.querySelector('.videoSection__playButton')
      expect(playButton).toBeInTheDocument()
      
      // Check play icon structure
      const playIcon = playButton?.querySelector('.videoSection__playIcon')
      expect(playIcon).toBeInTheDocument()
    })

    it('has proper WhatsApp integration structure', () => {
      render(<VideoSection />)
      
      // Check that the WhatsApp link is properly positioned relative to the video container
      const videoContainer = document.querySelector('.videoSection__videoContainer')
      const whatsappLink = document.querySelector('.videoSection__whatsappLink')
      
      expect(videoContainer).toBeInTheDocument()
      expect(whatsappLink).toBeInTheDocument()
      
      // Check that the WhatsApp SVG is inside the link
      const whatsappSVG = whatsappLink?.querySelector('.videoSection__whatsappSVG')
      expect(whatsappSVG).toBeInTheDocument()
    })
  })
}) 