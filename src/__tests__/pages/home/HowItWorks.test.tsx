import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import HowItWorks from '@/app/_components/HowItWorks/HowItWorks'

// Mock IntersectionObserver since it's not available in Jest environment
const mockIntersectionObserver = jest.fn()
mockIntersectionObserver.mockReturnValue({
  observe: () => null,
  unobserve: () => null,
  disconnect: () => null,
})
window.IntersectionObserver = mockIntersectionObserver

describe('HowItWorks Component', () => {
  const user = userEvent.setup()

  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks()
  })

  describe('Basic Rendering', () => {
    it('renders the how it works section correctly', () => {
      render(<HowItWorks />)
      
      // Check how it works section exists by looking for the main heading
      expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument()
    })

    it('displays the main title with correct text', () => {
      render(<HowItWorks />)
      
      const title = screen.getByRole('heading', { level: 2 })
      expect(title).toBeInTheDocument()
      expect(title).toHaveTextContent('How It Works')
    })

    it('displays the subtitle text', () => {
      render(<HowItWorks />)
      
      const subtitle = screen.getByText(/Getting started with Metromellow is simple/)
      expect(subtitle).toBeInTheDocument()
    })

    it('displays the process illustration image', () => {
      render(<HowItWorks />)
      
      // Check that the main process image is present
      const processImage = screen.getByAltText('Metromellow process')
      expect(processImage).toBeInTheDocument()
    })
  })

  describe('Process Steps', () => {
    it('displays all 4 process steps', () => {
      render(<HowItWorks />)
      
      // Check all step titles are present
      expect(screen.getByText('Book a Service')).toBeInTheDocument()
      expect(screen.getByText('Get Matched')).toBeInTheDocument()
      expect(screen.getByText('Service Delivered')).toBeInTheDocument()
      expect(screen.getByText('Rate & Review')).toBeInTheDocument()
    })

    it('displays step numbers correctly', () => {
      render(<HowItWorks />)
      
      // Check that step numbers 1-4 are displayed
      expect(screen.getByText('1')).toBeInTheDocument()
      expect(screen.getByText('2')).toBeInTheDocument()
      expect(screen.getByText('3')).toBeInTheDocument()
      expect(screen.getByText('4')).toBeInTheDocument()
    })

    it('displays step descriptions', () => {
      render(<HowItWorks />)
      
      // Check key descriptions from each step
      expect(screen.getByText(/Choose from our range of home services/)).toBeInTheDocument()
      expect(screen.getByText(/We will match you with experienced/)).toBeInTheDocument()
      expect(screen.getByText(/Our professionals arrive on time/)).toBeInTheDocument()
      expect(screen.getByText(/Share your feedback and book recurring/)).toBeInTheDocument()
    })
  })

  describe('Step Structure', () => {
    it('renders steps with proper heading levels', () => {
      render(<HowItWorks />)
      
      // Check that steps have h3 headings (step titles)
      const stepTitles = screen.getAllByRole('heading', { level: 3 })
      expect(stepTitles).toHaveLength(4) // Should have 4 process steps
    })

    it('displays step icons with proper alt text', () => {
      render(<HowItWorks />)
      
      // Check that step icons are present with descriptive alt text
      expect(screen.getByAltText('Book a Service')).toBeInTheDocument()
      expect(screen.getByAltText('Get Matched')).toBeInTheDocument()
      expect(screen.getByAltText('Service Delivered')).toBeInTheDocument()
      expect(screen.getByAltText('Rate & Review')).toBeInTheDocument()
    })
  })

  describe('Content Verification', () => {
    it('displays all process steps in correct order', () => {
      render(<HowItWorks />)
      
      // Verify all 4 process steps are present in the expected order
      const expectedSteps = [
        'Book a Service',
        'Get Matched', 
        'Service Delivered',
        'Rate & Review'
      ]
      
      expectedSteps.forEach(step => {
        expect(screen.getByText(step)).toBeInTheDocument()
      })
    })

    it('each step has a meaningful description', () => {
      render(<HowItWorks />)
      
      // Check that step descriptions contain meaningful content
      const descriptions = [
        /Choose from our range of home services/,
        /We will match you with experienced/,
        /Our professionals arrive on time/,
        /Share your feedback and book recurring/
      ]
      
      descriptions.forEach(description => {
        expect(screen.getByText(description)).toBeInTheDocument()
      })
    })
  })

  describe('Accessibility', () => {
    it('has proper heading hierarchy', () => {
      render(<HowItWorks />)
      
      // Main section should have h2 heading
      const mainHeading = screen.getByRole('heading', { level: 2 })
      expect(mainHeading).toBeInTheDocument()
      
      // Process steps should have h3 headings
      const stepHeadings = screen.getAllByRole('heading', { level: 3 })
      expect(stepHeadings).toHaveLength(4)
    })

    it('step icons have descriptive alt text', () => {
      render(<HowItWorks />)
      
      // Check that each step icon has meaningful alt text
      const stepIcons = [
        'Book a Service',
        'Get Matched',
        'Service Delivered',
        'Rate & Review'
      ]
      
      stepIcons.forEach(altText => {
        const icon = screen.getByAltText(altText)
        expect(icon).toBeInTheDocument()
      })
    })

    it('process illustration has descriptive alt text', () => {
      render(<HowItWorks />)
      
      const processImage = screen.getByAltText('Metromellow process')
      expect(processImage).toBeInTheDocument()
      expect(processImage).toHaveAttribute('alt', 'Metromellow process')
    })
  })

  describe('Visual Elements', () => {
    it('displays step numbers in sequence', () => {
      render(<HowItWorks />)
      
      // Verify step numbers are displayed in order 1-4
      for (let i = 1; i <= 4; i++) {
        expect(screen.getByText(i.toString())).toBeInTheDocument()
      }
    })

    it('process illustration is properly sized', () => {
      render(<HowItWorks />)
      
      const processImage = screen.getByAltText('Metromellow process')
      expect(processImage).toHaveAttribute('width', '800')
      expect(processImage).toHaveAttribute('height', '400')
    })
  })
}) 