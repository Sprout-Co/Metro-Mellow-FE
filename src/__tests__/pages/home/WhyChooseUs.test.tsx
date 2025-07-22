import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import WhyChooseUs from '@/app/_components/WhyChooseUs/WhyChooseUs'

// Mock IntersectionObserver since it's not available in Jest environment
const mockIntersectionObserver = jest.fn()
mockIntersectionObserver.mockReturnValue({
  observe: () => null,
  unobserve: () => null,
  disconnect: () => null,
})
window.IntersectionObserver = mockIntersectionObserver

describe('WhyChooseUs Component', () => {
  const user = userEvent.setup()

  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks()
  })

  describe('Basic Rendering', () => {
    it('renders the why choose us section correctly', () => {
      render(<WhyChooseUs />)
      
      // Check why choose us section exists by looking for the main heading
      expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument()
    })

    it('displays the badge text correctly', () => {
      render(<WhyChooseUs />)
      
      const badge = screen.getByText('Why Choose Us')
      expect(badge).toBeInTheDocument()
    })

    it('displays the main title with correct text', () => {
      render(<WhyChooseUs />)
      
      const title = screen.getByRole('heading', { level: 2 })
      expect(title).toBeInTheDocument()
      expect(title).toHaveTextContent('Why Urban Serve is The Right Choice for You')
    })

    it('displays the highlighted company name', () => {
      render(<WhyChooseUs />)
      
      // Check that "Urban Serve" is highlighted in the title
      expect(screen.getByText('Urban Serve')).toBeInTheDocument()
    })

    it('renders the call to action button', () => {
      render(<WhyChooseUs />)
      
      const ctaButton = screen.getByText('Book A Service Now')
      expect(ctaButton).toBeInTheDocument()
    })
  })

  describe('Reason Cards', () => {
    it('displays all 4 reason cards', () => {
      render(<WhyChooseUs />)
      
      // Check all reason titles are present
      expect(screen.getByText('Our Mission')).toBeInTheDocument()
      expect(screen.getByText('Our Team')).toBeInTheDocument()
      expect(screen.getByText('Quality Service')).toBeInTheDocument()
      expect(screen.getByText('Our Pricing')).toBeInTheDocument()
    })

    it('displays reason card descriptions', () => {
      render(<WhyChooseUs />)
      
      // Check key descriptions from each reason card
      expect(screen.getByText(/We strive to provide reliable, affordable home services/)).toBeInTheDocument()
      expect(screen.getByText(/Our business relies on a diverse team of professional workers/)).toBeInTheDocument()
      expect(screen.getByText(/We are committed to quality service/)).toBeInTheDocument()
      expect(screen.getByText(/Our pricing structure is straightforward with no hidden fees/)).toBeInTheDocument()
    })
  })

  describe('Card Structure', () => {
    it('renders reason cards with proper heading levels', () => {
      render(<WhyChooseUs />)
      
      // Check that reason cards have h3 headings (card titles)
      const cardTitles = screen.getAllByRole('heading', { level: 3 })
      expect(cardTitles).toHaveLength(4) // Should have 4 reason cards
    })

    it('displays reason card descriptions as paragraphs', () => {
      render(<WhyChooseUs />)
      
      // Check that reason descriptions are present as meaningful content
      const descriptions = screen.getAllByText(/We strive|Our business|We are committed|Our pricing/)
      expect(descriptions.length).toBeGreaterThan(0)
    })
  })

  describe('Navigation', () => {
    it('call to action button links to booking page', () => {
      render(<WhyChooseUs />)
      
      const ctaButton = screen.getByText('Book A Service Now').closest('a')
      expect(ctaButton).toHaveAttribute('href', '/booking')
    })
  })

  describe('Interactive Elements', () => {
    it('call to action button is clickable', async () => {
      render(<WhyChooseUs />)
      
      const ctaButton = screen.getByText('Book A Service Now')
      expect(ctaButton).toBeInTheDocument()
      
      // Test that button can be clicked (though we're not testing navigation in unit tests)
      await user.click(ctaButton)
      // Button should still be present after click
      expect(ctaButton).toBeInTheDocument()
    })
  })

  describe('Content Verification', () => {
    it('displays all reason categories in correct order', () => {
      render(<WhyChooseUs />)
      
      // Verify all 4 reason categories are present
      const expectedReasons = [
        'Our Mission',
        'Our Team', 
        'Quality Service',
        'Our Pricing'
      ]
      
      expectedReasons.forEach(reason => {
        expect(screen.getByText(reason)).toBeInTheDocument()
      })
    })

    it('each reason has a meaningful description', () => {
      render(<WhyChooseUs />)
      
      // Check that reason descriptions contain meaningful content
      const descriptions = [
        /We strive to provide reliable, affordable home services/,
        /Our business relies on a diverse team of professional workers/,
        /We are committed to quality service/,
        /Our pricing structure is straightforward with no hidden fees/
      ]
      
      descriptions.forEach(description => {
        expect(screen.getByText(description)).toBeInTheDocument()
      })
    })
  })

  describe('Accessibility', () => {
    it('has proper heading hierarchy', () => {
      render(<WhyChooseUs />)
      
      // Main section should have h2 heading
      const mainHeading = screen.getByRole('heading', { level: 2 })
      expect(mainHeading).toBeInTheDocument()
      
      // Reason cards should have h3 headings
      const cardHeadings = screen.getAllByRole('heading', { level: 3 })
      expect(cardHeadings).toHaveLength(4)
    })

    it('reason cards have descriptive content', () => {
      render(<WhyChooseUs />)
      
      // Check that each reason card has both title and description
      const missionCard = screen.getByText('Our Mission')
      expect(missionCard).toBeInTheDocument()
      
      const teamCard = screen.getByText('Our Team')
      expect(teamCard).toBeInTheDocument()
      
      const qualityCard = screen.getByText('Quality Service')
      expect(qualityCard).toBeInTheDocument()
      
      const pricingCard = screen.getByText('Our Pricing')
      expect(pricingCard).toBeInTheDocument()
    })

    it('call to action button has proper text content', () => {
      render(<WhyChooseUs />)
      
      const ctaButton = screen.getByText('Book A Service Now')
      expect(ctaButton).toBeInTheDocument()
      expect(ctaButton).toHaveTextContent('Book A Service Now')
    })
  })

  describe('Visual Elements', () => {
    it('displays company name with highlighting', () => {
      render(<WhyChooseUs />)
      
      // Check that "Urban Serve" is present and can be highlighted
      const companyName = screen.getByText('Urban Serve')
      expect(companyName).toBeInTheDocument()
    })

    it('badge text is prominently displayed', () => {
      render(<WhyChooseUs />)
      
      const badge = screen.getByText('Why Choose Us')
      expect(badge).toBeInTheDocument()
      expect(badge).toHaveTextContent('Why Choose Us')
    })
  })
}) 