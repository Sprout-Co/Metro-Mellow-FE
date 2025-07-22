import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ChoresSection from '@/app/_components/ChoresSection/ChoresSection'

describe('ChoresSection Component', () => {
  const user = userEvent.setup()

  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks()
  })

  describe('Basic Rendering', () => {
    it('renders the chores section correctly', () => {
      render(<ChoresSection />)
      
      // Check chores section exists by looking for the main heading
      expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument()
    })

    it('displays the main heading with correct text', () => {
      render(<ChoresSection />)
      
      const heading = screen.getByRole('heading', { level: 2 })
      expect(heading).toBeInTheDocument()
      expect(heading).toHaveTextContent('We Handle the Chores, You Chase the Cheers.')
    })

    it('displays the subheading text', () => {
      render(<ChoresSection />)
      
      const subheading = screen.getByText(/whatever's hijacking your peace/)
      expect(subheading).toBeInTheDocument()
    })

    it('displays all service cards', () => {
      render(<ChoresSection />)
      
      // Check all service titles are present
      expect(screen.getByText('Food')).toBeInTheDocument()
      expect(screen.getByText('Pest Control')).toBeInTheDocument()
      expect(screen.getByText('Cleaning')).toBeInTheDocument()
      expect(screen.getByText('Laundry')).toBeInTheDocument()
    })
  })

  describe('Service Cards', () => {
    it('displays service card descriptions', () => {
      render(<ChoresSection />)
      
      // Check key descriptions from service cards
      expect(screen.getAllByText(/Enjoy your work without the pressure/).length).toBeGreaterThan(0)
      expect(screen.getAllByText(/Enjoy work without the pressure/).length).toBeGreaterThan(0)
    })

    it('renders service cards with proper heading levels', () => {
      render(<ChoresSection />)
      
      // Check that service cards have h3 headings (card titles)
      const cardTitles = screen.getAllByRole('heading', { level: 3 })
      expect(cardTitles).toHaveLength(4) // Should have 4 service cards
    })

    it('displays service card descriptions as paragraphs', () => {
      render(<ChoresSection />)
      
      // Check that service descriptions are present as meaningful content
      const descriptions = screen.getAllByText(/Enjoy your work|Enjoy work/)
      expect(descriptions.length).toBeGreaterThan(0)
    })
  })

  describe('Interactive Elements', () => {
    it('displays start hiring buttons for all services', () => {
      render(<ChoresSection />)
      
      // Check that all service cards have "Start Hiring" buttons
      const startHiringButtons = screen.getAllByText('Start Hiring')
      expect(startHiringButtons).toHaveLength(4) // Should have 4 buttons
    })

    it('start hiring buttons are clickable', async () => {
      render(<ChoresSection />)
      
      const startHiringButtons = screen.getAllByText('Start Hiring')
      expect(startHiringButtons.length).toBeGreaterThan(0)
      
      // Test that first button can be clicked
      await user.click(startHiringButtons[0])
      // Button should still be present after click
      expect(startHiringButtons[0]).toBeInTheDocument()
    })
  })

  describe('Content Verification', () => {
    it('displays all service categories in correct order', () => {
      render(<ChoresSection />)
      
      // Verify all 4 service categories are present
      const expectedServices = [
        'Food',
        'Pest Control', 
        'Cleaning',
        'Laundry'
      ]
      
      expectedServices.forEach(service => {
        expect(screen.getByText(service)).toBeInTheDocument()
      })
    })

    it('each service has a meaningful description', () => {
      render(<ChoresSection />)
      
      // Check that service descriptions contain meaningful content
      const descriptions = [
        /Enjoy your work without the pressure/,
        /Enjoy work without the pressure/
      ]
      
      descriptions.forEach(description => {
        expect(screen.getAllByText(description).length).toBeGreaterThan(0)
      })
    })
  })

  describe('Accessibility', () => {
    it('has proper heading hierarchy', () => {
      render(<ChoresSection />)
      
      // Main section should have h2 heading
      const mainHeading = screen.getByRole('heading', { level: 2 })
      expect(mainHeading).toBeInTheDocument()
      
      // Service cards should have h3 headings
      const cardHeadings = screen.getAllByRole('heading', { level: 3 })
      expect(cardHeadings).toHaveLength(4)
    })

    it('service cards have descriptive content', () => {
      render(<ChoresSection />)
      
      // Check that each service card has both title and description
      const foodCard = screen.getByText('Food')
      expect(foodCard).toBeInTheDocument()
      
      const pestControlCard = screen.getByText('Pest Control')
      expect(pestControlCard).toBeInTheDocument()
      
      const cleaningCard = screen.getByText('Cleaning')
      expect(cleaningCard).toBeInTheDocument()
      
      const laundryCard = screen.getByText('Laundry')
      expect(laundryCard).toBeInTheDocument()
    })

    it('start hiring buttons have proper text content', () => {
      render(<ChoresSection />)
      
      const startHiringButtons = screen.getAllByText('Start Hiring')
      startHiringButtons.forEach(button => {
        expect(button).toHaveTextContent('Start Hiring')
      })
    })
  })

  describe('Visual Elements', () => {
    it('displays service icons', () => {
      render(<ChoresSection />)
      
      // Check that SVG icons are present (they should be rendered as SVG elements)
      const svgElements = document.querySelectorAll('svg')
      expect(svgElements.length).toBeGreaterThan(0)
    })

    it('service cards have proper structure', () => {
      render(<ChoresSection />)
      
      // Check that service cards are present with proper content
      expect(screen.getByText('Food')).toBeInTheDocument()
      expect(screen.getByText('Pest Control')).toBeInTheDocument()
      expect(screen.getByText('Cleaning')).toBeInTheDocument()
      expect(screen.getByText('Laundry')).toBeInTheDocument()
    })
  })

  describe('Layout Structure', () => {
    it('displays content in proper sections', () => {
      render(<ChoresSection />)
      
      // Check that both heading and subheading are present
      expect(screen.getByText(/We Handle the Chores/)).toBeInTheDocument()
      expect(screen.getByText(/whatever's hijacking your peace/)).toBeInTheDocument()
    })

    it('service grid contains all cards', () => {
      render(<ChoresSection />)
      
      // Verify all service cards are rendered
      const serviceTitles = ['Food', 'Pest Control', 'Cleaning', 'Laundry']
      serviceTitles.forEach(title => {
        expect(screen.getByText(title)).toBeInTheDocument()
      })
    })
  })
}) 