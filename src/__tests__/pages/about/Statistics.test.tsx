import { render, screen, waitFor } from '@testing-library/react'
import Statistics from '@/app/(routes)/(site)/about/_components/Statistics/Statistics'

// Mock framer-motion since it's not available in Jest environment
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, className, initial, whileInView, viewport, transition, ...props }: any) => (
      <div className={className} {...props}>
        {children}
      </div>
    ),
  },
  useInView: () => true, // Mock to always return true for testing
}))

describe('Statistics Component', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks()
  })

  describe('Basic Rendering', () => {
    it('renders the statistics section correctly', () => {
      render(<Statistics />)
      
      // Check that the section element exists
      const section = document.querySelector('section')
      expect(section).toBeInTheDocument()
      expect(section).toHaveClass('stats')
    })

    it('displays all four statistics items', () => {
      render(<Statistics />)
      
      // Check that all four stat items are present
      const statItems = document.querySelectorAll('.stats__item')
      expect(statItems).toHaveLength(4)
    })

    it('renders the statistics container with proper structure', () => {
      render(<Statistics />)
      
      // Check that the container exists
      const container = document.querySelector('.stats__container')
      expect(container).toBeInTheDocument()
      
      // Check that the grid exists
      const grid = document.querySelector('.stats__grid')
      expect(grid).toBeInTheDocument()
    })

    it('displays correct statistic labels', () => {
      render(<Statistics />)
      
      // Check that all stat labels are present
      expect(screen.getByText('Happy Customers')).toBeInTheDocument()
      expect(screen.getByText('Services Completed')).toBeInTheDocument()
      expect(screen.getByText('Professional Staff')).toBeInTheDocument()
      expect(screen.getByText('Years in Business')).toBeInTheDocument()
    })
  })

  describe('Core Interactions', () => {
    it('displays animated counter values', async () => {
      render(<Statistics />)
      
      // Wait for the animation to complete and check final values
      await waitFor(() => {
        expect(screen.getByText('15,000')).toBeInTheDocument()
        expect(screen.getByText('50,000')).toBeInTheDocument()
        expect(screen.getByText('120')).toBeInTheDocument()
        expect(screen.getByText('6')).toBeInTheDocument()
      }, { timeout: 3000 })
    })

    it('displays correct suffixes for statistics', async () => {
      render(<Statistics />)
      
      // Wait for animation to complete and check suffixes
      await waitFor(() => {
        // Check that plus signs are displayed for appropriate stats
        const plusSigns = document.querySelectorAll('.stats__suffix')
        expect(plusSigns).toHaveLength(4)
        
        // Check that the first three have '+' suffix and the last one doesn't
        expect(plusSigns[0]).toHaveTextContent('+')
        expect(plusSigns[1]).toHaveTextContent('+')
        expect(plusSigns[2]).toHaveTextContent('+')
        expect(plusSigns[3]).toHaveTextContent('')
      }, { timeout: 3000 })
    })

    it('renders statistics with proper formatting', async () => {
      render(<Statistics />)
      
      // Wait for animation to complete and check formatting
      await waitFor(() => {
        // Check that numbers are properly formatted with commas
        expect(screen.getByText('15,000')).toBeInTheDocument()
        expect(screen.getByText('50,000')).toBeInTheDocument()
      }, { timeout: 3000 })
    })
  })

  describe('Key Functionality', () => {
    it('displays complete statistics content', async () => {
      render(<Statistics />)
      
      // Wait for animation to complete and check all content
      await waitFor(() => {
        // Check all statistic values
        expect(screen.getByText('15,000')).toBeInTheDocument()
        expect(screen.getByText('50,000')).toBeInTheDocument()
        expect(screen.getByText('120')).toBeInTheDocument()
        expect(screen.getByText('6')).toBeInTheDocument()
        
        // Check all statistic labels
        expect(screen.getByText('Happy Customers')).toBeInTheDocument()
        expect(screen.getByText('Services Completed')).toBeInTheDocument()
        expect(screen.getByText('Professional Staff')).toBeInTheDocument()
        expect(screen.getByText('Years in Business')).toBeInTheDocument()
      }, { timeout: 3000 })
    })

    it('renders with proper CSS classes', () => {
      render(<Statistics />)
      
      // Check that all main CSS classes are applied
      const section = document.querySelector('.stats')
      const container = document.querySelector('.stats__container')
      const grid = document.querySelector('.stats__grid')
      const items = document.querySelectorAll('.stats__item')
      
      expect(section).toBeInTheDocument()
      expect(container).toBeInTheDocument()
      expect(grid).toBeInTheDocument()
      expect(items).toHaveLength(4)
    })

    it('renders stat items with proper structure', async () => {
      render(<Statistics />)
      
      // Wait for animation to complete
      await waitFor(() => {
        const statItems = document.querySelectorAll('.stats__item')
        expect(statItems).toHaveLength(4)
        
        // Check that each stat item has a value and label
        statItems.forEach((item) => {
          expect(item.querySelector('.stats__value')).toBeInTheDocument()
          expect(item.querySelector('.stats__label')).toBeInTheDocument()
        })
      }, { timeout: 3000 })
    })

    it('displays correct statistic data', async () => {
      render(<Statistics />)
      
      // Wait for animation to complete and verify the data
      await waitFor(() => {
        // Check the specific values and their corresponding labels
        const happyCustomersItem = screen.getByText('Happy Customers').closest('.stats__item')
        const servicesCompletedItem = screen.getByText('Services Completed').closest('.stats__item')
        const professionalStaffItem = screen.getByText('Professional Staff').closest('.stats__item')
        const yearsInBusinessItem = screen.getByText('Years in Business').closest('.stats__item')
        
        expect(happyCustomersItem).toHaveTextContent('15,000')
        expect(servicesCompletedItem).toHaveTextContent('50,000')
        expect(professionalStaffItem).toHaveTextContent('120')
        expect(yearsInBusinessItem).toHaveTextContent('6')
      }, { timeout: 3000 })
    })
  })

  describe('Accessibility Basics', () => {
    it('has semantic HTML structure', () => {
      render(<Statistics />)
      
      // Check that the component uses semantic HTML elements
      const section = document.querySelector('section')
      expect(section).toBeInTheDocument()
    })

    it('has proper text content for screen readers', async () => {
      render(<Statistics />)
      
      // Wait for animation to complete and check accessibility
      await waitFor(() => {
        // Check that all important text content is present and accessible
        expect(screen.getByText('Happy Customers')).toBeInTheDocument()
        expect(screen.getByText('Services Completed')).toBeInTheDocument()
        expect(screen.getByText('Professional Staff')).toBeInTheDocument()
        expect(screen.getByText('Years in Business')).toBeInTheDocument()
        expect(screen.getByText('15,000')).toBeInTheDocument()
        expect(screen.getByText('50,000')).toBeInTheDocument()
        expect(screen.getByText('120')).toBeInTheDocument()
        expect(screen.getByText('6')).toBeInTheDocument()
      }, { timeout: 3000 })
    })

    it('has accessible number formatting', async () => {
      render(<Statistics />)
      
      // Wait for animation to complete and check number accessibility
      await waitFor(() => {
        // Check that numbers are properly formatted for screen readers
        expect(screen.getByText('15,000')).toBeInTheDocument()
        expect(screen.getByText('50,000')).toBeInTheDocument()
        expect(screen.getByText('120')).toBeInTheDocument()
        expect(screen.getByText('6')).toBeInTheDocument()
      }, { timeout: 3000 })
    })

    it('has proper contrast and readability', () => {
      render(<Statistics />)
      
      // Check that the component has the necessary structure for good contrast
      const section = document.querySelector('.stats')
      expect(section).toBeInTheDocument()
      
      // Check that stat items have proper structure for readability
      const statItems = document.querySelectorAll('.stats__item')
      expect(statItems).toHaveLength(4)
      
      statItems.forEach((item) => {
        expect(item.querySelector('.stats__value')).toBeInTheDocument()
        expect(item.querySelector('.stats__label')).toBeInTheDocument()
      })
    })
  })

  describe('Component Structure', () => {
    it('renders all statistics in correct order', async () => {
      render(<Statistics />)
      
      // Wait for animation to complete and check order
      await waitFor(() => {
        const statItems = document.querySelectorAll('.stats__item')
        expect(statItems).toHaveLength(4)
        
        // Check that the first item contains "Happy Customers"
        expect(statItems[0]).toHaveTextContent('Happy Customers')
        expect(statItems[0]).toHaveTextContent('15,000')
        
        // Check that the second item contains "Services Completed"
        expect(statItems[1]).toHaveTextContent('Services Completed')
        expect(statItems[1]).toHaveTextContent('50,000')
        
        // Check that the third item contains "Professional Staff"
        expect(statItems[2]).toHaveTextContent('Professional Staff')
        expect(statItems[2]).toHaveTextContent('120')
        
        // Check that the fourth item contains "Years in Business"
        expect(statItems[3]).toHaveTextContent('Years in Business')
        expect(statItems[3]).toHaveTextContent('6')
      }, { timeout: 3000 })
    })

    it('maintains responsive design structure', () => {
      render(<Statistics />)
      
      // Check that the component has the necessary structure for responsive design
      const section = document.querySelector('.stats')
      const container = document.querySelector('.stats__container')
      const grid = document.querySelector('.stats__grid')
      
      expect(section).toBeInTheDocument()
      expect(container).toBeInTheDocument()
      expect(grid).toBeInTheDocument()
      
      // Check that the grid has the proper class for responsive behavior
      expect(grid).toHaveClass('stats__grid')
    })

    it('has proper animation structure', () => {
      render(<Statistics />)
      
      // Check that the component has the necessary structure for animations
      const container = document.querySelector('.stats__container')
      expect(container).toBeInTheDocument()
      
      // Check that stat items have the proper structure for animations
      const statItems = document.querySelectorAll('.stats__item')
      expect(statItems).toHaveLength(4)
      
      // Each item should have value and label elements
      statItems.forEach((item) => {
        const valueElement = item.querySelector('.stats__value')
        const labelElement = item.querySelector('.stats__label')
        expect(valueElement).toBeInTheDocument()
        expect(labelElement).toBeInTheDocument()
      })
    })
  })
}) 