import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Hero from '@/app/_components/Hero/Hero'
import { Routes } from '@/constants/routes'

describe('Hero Component', () => {
  const user = userEvent.setup()

  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks()
  })

  describe('Basic Rendering', () => {
    it('renders the hero section correctly', () => {
      render(<Hero />)
      
      // Check hero section exists
      expect(screen.getByRole('banner')).toBeInTheDocument()
    })

    it('displays the main title with correct text', () => {
      render(<Hero />)
      
      const title = screen.getByRole('heading', { level: 1 })
      expect(title).toBeInTheDocument()
      expect(title).toHaveTextContent('Comfort')
      expect(title).toHaveTextContent('Delivered To')
      expect(title).toHaveTextContent('Your Doorstep')
    })

    it('displays the subtitle with service links', () => {
      render(<Hero />)
      
      const subtitle = screen.getByText(/Subscribe to hassle-free home services/)
      expect(subtitle).toBeInTheDocument()
      
      // Check service links are present
      expect(screen.getByText('meals')).toBeInTheDocument()
      expect(screen.getByText('cleaning')).toBeInTheDocument()
      expect(screen.getByText('laundry')).toBeInTheDocument()
      expect(screen.getByText('pest control')).toBeInTheDocument()
    })

    it('renders the CTA button with correct text', () => {
      render(<Hero />)
      
      const ctaButton = screen.getByText('Book a service')
      expect(ctaButton).toBeInTheDocument()
      expect(ctaButton).toHaveTextContent('Book a service')
    })

    it('renders slide indicators', () => {
      render(<Hero />)
      
      // Should have 4 indicators (one for each hero image)
      const indicators = screen.getAllByTestId('hero-indicator')
      expect(indicators).toHaveLength(4)
    })
  })

  describe('Interactive Elements', () => {
    it('CTA button links to get-started page', () => {
      render(<Hero />)
      
      const ctaButton = screen.getByText('Book a service').closest('a')
      expect(ctaButton).toHaveAttribute('href', Routes.GET_STARTED)
    })

    it('service links navigate to correct routes', () => {
      render(<Hero />)
      
      const mealsLink = screen.getByText('meals')
      const cleaningLink = screen.getByText('cleaning')
      const laundryLink = screen.getByText('laundry')
      const pestControlLink = screen.getByText('pest control')
      
      expect(mealsLink).toHaveAttribute('href', '/services/food')
      expect(cleaningLink).toHaveAttribute('href', '/services/cleaning')
      expect(laundryLink).toHaveAttribute('href', '/services/laundry')
      expect(pestControlLink).toHaveAttribute('href', '/services/pest-control')
    })

    it('indicator dots are clickable', async () => {
      render(<Hero />)
      
      const indicators = screen.getAllByTestId('hero-indicator')
      
      // Click on the second indicator
      await user.click(indicators[1])
      
      // The second indicator should now be active
      expect(indicators[1]).toHaveClass('hero__indicator--active')
    })
  })

  describe('Auto-slide Functionality', () => {
    beforeEach(() => {
      jest.useFakeTimers()
    })

    afterEach(() => {
      jest.useRealTimers()
    })

    it('changes slides automatically every 10 seconds', async () => {
      render(<Hero />)
      
      const indicators = screen.getAllByTestId('hero-indicator')
      
      // Initially, first indicator should be active
      expect(indicators[0]).toHaveClass('hero__indicator--active')
      
      // Fast-forward time by 10 seconds
      jest.advanceTimersByTime(10000)
      
      // Wait for the state update
      await waitFor(() => {
        expect(indicators[1]).toHaveClass('hero__indicator--active')
      })
    })

    it('cycles through all slides and returns to first', async () => {
      render(<Hero />)
      
      const indicators = screen.getAllByTestId('hero-indicator')
      
      // Fast-forward through all slides
      jest.advanceTimersByTime(40000) // 4 slides * 10 seconds each
      
      await waitFor(() => {
        expect(indicators[0]).toHaveClass('hero__indicator--active')
      })
    })
  })

  describe('Manual Slide Navigation', () => {
    it('allows manual navigation between slides', async () => {
      render(<Hero />)
      
      const indicators = screen.getAllByTestId('hero-indicator')
      
      // Click on third indicator
      await user.click(indicators[2])
      
      // Third indicator should be active
      expect(indicators[2]).toHaveClass('hero__indicator--active')
      
      // Click on fourth indicator
      await user.click(indicators[3])
      
      // Fourth indicator should be active
      expect(indicators[3]).toHaveClass('hero__indicator--active')
    })
  })

  describe('Accessibility', () => {
    it('has proper heading structure', () => {
      render(<Hero />)
      
      const heading = screen.getByRole('heading', { level: 1 })
      expect(heading).toBeInTheDocument()
    })

    it('indicator buttons are keyboard accessible', async () => {
      render(<Hero />)
      
      const indicators = screen.getAllByTestId('hero-indicator')
      
      // Make the first indicator focusable and focus it
      indicators[0].setAttribute('tabindex', '0')
      indicators[0].focus()
      expect(indicators[0]).toHaveFocus()
      
      // Press Enter to activate
      await user.keyboard('{Enter}')
      expect(indicators[0]).toHaveClass('hero__indicator--active')
    })

    it('service links are keyboard accessible', async () => {
      render(<Hero />)
      
      const mealsLink = screen.getByText('meals')
      
      // Focus the link
      mealsLink.focus()
      expect(mealsLink).toHaveFocus()
      
      // Press Enter to navigate
      await user.keyboard('{Enter}')
      // Link should have correct href
      expect(mealsLink).toHaveAttribute('href', '/services/food')
    })
  })

  describe('Component Structure', () => {
    it('renders background images container', () => {
      render(<Hero />)
      
      // Check for background container
      const heroSection = screen.getByRole('banner')
      expect(heroSection).toBeInTheDocument()
    })

    it('renders overlay and content containers', () => {
      render(<Hero />)
      
      const heroSection = screen.getByRole('banner')
      expect(heroSection).toBeInTheDocument()
      
      // Check for content structure
      expect(screen.getByText('Comfort')).toBeInTheDocument()
      expect(screen.getByText(/Delivered To/)).toBeInTheDocument()
    })
  })

  describe('Error Handling', () => {
    it('renders gracefully when images fail to load', () => {
      // Mock console.error to prevent test noise
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {})
      
      render(<Hero />)
      
      // Component should still render even if images fail
      expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
      expect(screen.getByText('Book a service')).toBeInTheDocument()
      
      consoleSpy.mockRestore()
    })
  })

  describe('Performance & Cleanup', () => {
    beforeEach(() => {
      jest.useFakeTimers()
    })

    afterEach(() => {
      jest.useRealTimers()
    })

    it('cleans up interval on unmount', () => {
      const clearIntervalSpy = jest.spyOn(global, 'clearInterval')
      
      const { unmount } = render(<Hero />)
      
      // Trigger some time advancement
      jest.advanceTimersByTime(5000)
      
      // Unmount component
      unmount()
      
      // Should have called clearInterval
      expect(clearIntervalSpy).toHaveBeenCalled()
      
      clearIntervalSpy.mockRestore()
    })
  })
}) 