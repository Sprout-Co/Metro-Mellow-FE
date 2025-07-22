import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Testimonials from '@/app/_components/Testimonials/Testimonials'

describe('Testimonials Component', () => {
  const user = userEvent.setup()

  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks()
  })

  describe('Basic Rendering', () => {
    it('renders the testimonials section correctly', () => {
      render(<Testimonials />)
      
      // Check testimonials section exists
      expect(screen.getByRole('region')).toBeInTheDocument()
    })

    it('displays the main title with correct text', () => {
      render(<Testimonials />)
      
      const title = screen.getByRole('heading', { level: 2 })
      expect(title).toBeInTheDocument()
      expect(title).toHaveTextContent('What Our Customers Say')
    })

    it('displays the subtitle with correct text', () => {
      render(<Testimonials />)
      
      const subtitle = screen.getByText(/Don't just take our word for it/)
      expect(subtitle).toBeInTheDocument()
    })

    it('renders testimonial indicators', () => {
      render(<Testimonials />)
      
      // Should have 4 indicators (one for each testimonial)
      const indicators = screen.getAllByRole('button', { name: /Go to testimonial/ })
      expect(indicators).toHaveLength(4)
    })

    it('displays the first testimonial by default', () => {
      render(<Testimonials />)
      
      // Check first testimonial content is visible
      expect(screen.getByText(/Metromellow has transformed my weekly cleaning routine/)).toBeInTheDocument()
      expect(screen.getByText('Sarah Johnson')).toBeInTheDocument()
      expect(screen.getByText('New York, NY')).toBeInTheDocument()
      expect(screen.getByText('Home Cleaning')).toBeInTheDocument()
    })
  })

  describe('Interactive Elements', () => {
    it('indicator buttons are clickable and switch testimonials', async () => {
      render(<Testimonials />)
      
      const indicators = screen.getAllByRole('button', { name: /Go to testimonial/ })
      
      // Click on the second indicator
      await user.click(indicators[1])
      
      // The second testimonial should now be visible
      expect(screen.getByText(/I've been using their meal preparation service/)).toBeInTheDocument()
      expect(screen.getByText('Michael Rodriguez')).toBeInTheDocument()
      expect(screen.getByText('Chicago, IL')).toBeInTheDocument()
      expect(screen.getByText('Meal Preparation')).toBeInTheDocument()
    })

    it('displays correct star ratings for testimonials', () => {
      render(<Testimonials />)
      
      // First testimonial has 5 stars
      const stars = screen.getAllByText('★')
      expect(stars.length).toBeGreaterThan(0)
    })
  })

  describe('Auto-rotation Functionality', () => {
    beforeEach(() => {
      jest.useFakeTimers()
    })

    afterEach(() => {
      jest.useRealTimers()
    })

    it('auto-rotates testimonials every 5 seconds', async () => {
      render(<Testimonials />)
      
      // Initially shows first testimonial
      expect(screen.getByText('Sarah Johnson')).toBeInTheDocument()
      
      // Fast forward 5 seconds
      jest.advanceTimersByTime(5000)
      
      await waitFor(() => {
        expect(screen.getByText('Michael Rodriguez')).toBeInTheDocument()
      })
    })

    it('continues auto-rotation through all testimonials', async () => {
      render(<Testimonials />)
      
      // Fast forward through multiple rotations
      jest.advanceTimersByTime(15000) // 3 rotations
      
      await waitFor(() => {
        expect(screen.getByText('David Williams')).toBeInTheDocument()
      })
    })
  })

  describe('Accessibility', () => {
    it('has proper ARIA labels for indicators', () => {
      render(<Testimonials />)
      
      const indicators = screen.getAllByRole('button', { name: /Go to testimonial/ })
      indicators.forEach((indicator, index) => {
        expect(indicator).toHaveAttribute('aria-label', `Go to testimonial ${index + 1}`)
      })
    })

    it('displays customer avatars with proper alt text', () => {
      render(<Testimonials />)
      
      const avatar = screen.getByAltText('Sarah Johnson')
      expect(avatar).toBeInTheDocument()
    })
  })
}) 