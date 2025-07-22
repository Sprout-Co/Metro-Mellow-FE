import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ServiceCards from '@/app/_components/Services/ServiceCards'

// Mock IntersectionObserver since it's not available in Jest environment
const mockIntersectionObserver = jest.fn()
mockIntersectionObserver.mockReturnValue({
  observe: () => null,
  unobserve: () => null,
  disconnect: () => null,
})
window.IntersectionObserver = mockIntersectionObserver

describe('ServiceCards Component', () => {
  const user = userEvent.setup()

  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks()
  })

  describe('Basic Rendering', () => {
    it('renders the service cards section correctly', () => {
      render(<ServiceCards />)
      
      // Check service cards section exists by looking for the main heading
      expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument()
    })

    it('displays the main title with correct text', () => {
      render(<ServiceCards />)
      
      const title = screen.getByRole('heading', { level: 2 })
      expect(title).toBeInTheDocument()
      expect(title).toHaveTextContent('What we do?')
    })

    it('displays the subtitle text', () => {
      render(<ServiceCards />)
      
      const subtitle = screen.getByText(/Guaranteed & Exceptional Home Care/)
      expect(subtitle).toBeInTheDocument()
    })

    it('displays the description text', () => {
      render(<ServiceCards />)
      
      const description = screen.getByText(/From cleaning and laundry to cooking/)
      expect(description).toBeInTheDocument()
    })

    it('renders the get started button', () => {
      render(<ServiceCards />)
      
      const getStartedButton = screen.getByText('Get Started')
      expect(getStartedButton).toBeInTheDocument()
    })

    it('displays all service cards', () => {
      render(<ServiceCards />)
      
      // Check all service titles are present
      expect(screen.getByText('Home Cleaning & Sanitizing')).toBeInTheDocument()
      expect(screen.getByText('Laundry')).toBeInTheDocument()
      expect(screen.getByText('Cooking')).toBeInTheDocument()
      expect(screen.getByText('Pest Control')).toBeInTheDocument()
      expect(screen.getByText('Car Washing & Detailing')).toBeInTheDocument()
    })

    it('displays service descriptions', () => {
      render(<ServiceCards />)
      
      // Check a few key service descriptions
      expect(screen.getByText(/We provide cleaning, organizing/)).toBeInTheDocument()
      expect(screen.getByText(/We handle washing, ironing/)).toBeInTheDocument()
      expect(screen.getByText(/Enjoy healthy, homemade meals/)).toBeInTheDocument()
    })
  })

  describe('Service Card Structure', () => {
    it('renders service cards with proper heading levels', () => {
      render(<ServiceCards />)
      
      // Check that service cards have h3 headings (card titles)
      const cardTitles = screen.getAllByRole('heading', { level: 3 })
      expect(cardTitles).toHaveLength(5) // Should have 5 service cards
    })

    it('displays service card descriptions', () => {
      render(<ServiceCards />)
      
      // Check that service descriptions are present as paragraphs
      const descriptions = screen.getAllByText(/We provide|We handle|Enjoy healthy|Effective and eco-friendly|Keep your vehicle/)
      expect(descriptions.length).toBeGreaterThan(0)
    })
  })

  describe('Navigation', () => {
    it('get started button links to services page', () => {
      render(<ServiceCards />)
      
      const getStartedButton = screen.getByText('Get Started').closest('a')
      expect(getStartedButton).toHaveAttribute('href', '/services')
    })
  })

  describe('Interactive Elements', () => {
    it('get started button is clickable', async () => {
      render(<ServiceCards />)
      
      const getStartedButton = screen.getByText('Get Started')
      expect(getStartedButton).toBeInTheDocument()
      
      // Test that button can be clicked (though we're not testing navigation in unit tests)
      await user.click(getStartedButton)
      // Button should still be present after click
      expect(getStartedButton).toBeInTheDocument()
    })
  })

  describe('Accessibility', () => {
    it('has proper heading hierarchy', () => {
      render(<ServiceCards />)
      
      // Main section should have h2 heading
      const mainHeading = screen.getByRole('heading', { level: 2 })
      expect(mainHeading).toBeInTheDocument()
      
      // Service cards should have h3 headings
      const cardHeadings = screen.getAllByRole('heading', { level: 3 })
      expect(cardHeadings.length).toBeGreaterThan(0)
    })

    it('service cards have descriptive content', () => {
      render(<ServiceCards />)
      
      // Check that each service card has both title and description
      const cleaningCard = screen.getByText('Home Cleaning & Sanitizing')
      expect(cleaningCard).toBeInTheDocument()
      
      const laundryCard = screen.getByText('Laundry')
      expect(laundryCard).toBeInTheDocument()
      
      const cookingCard = screen.getByText('Cooking')
      expect(cookingCard).toBeInTheDocument()
    })

    it('get started button has proper text content', () => {
      render(<ServiceCards />)
      
      const getStartedButton = screen.getByText('Get Started')
      expect(getStartedButton).toBeInTheDocument()
      expect(getStartedButton).toHaveTextContent('Get Started')
    })
  })

  describe('Content Verification', () => {
    it('displays all 5 service categories', () => {
      render(<ServiceCards />)
      
      // Verify all 5 service categories are present
      const expectedServices = [
        'Home Cleaning & Sanitizing',
        'Laundry', 
        'Cooking',
        'Pest Control',
        'Car Washing & Detailing'
      ]
      
      expectedServices.forEach(service => {
        expect(screen.getByText(service)).toBeInTheDocument()
      })
    })

    it('each service has a description', () => {
      render(<ServiceCards />)
      
      // Check that service descriptions contain meaningful content
      const descriptions = [
        /We provide cleaning, organizing/,
        /We handle washing, ironing/,
        /Enjoy healthy, homemade meals/,
        /Effective and eco-friendly/,
        /Keep your vehicle pristine/
      ]
      
      descriptions.forEach(description => {
        expect(screen.getByText(description)).toBeInTheDocument()
      })
    })
  })
}) 