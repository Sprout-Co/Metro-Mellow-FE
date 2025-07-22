import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TestimonialCarouselSection from '@/app/_components/TestimonialCarouselSection/TestimonialCarouselSection'

describe('TestimonialCarouselSection Component', () => {
  const user = userEvent.setup()

  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks()
  })

  describe('Basic Rendering', () => {
    it('renders the testimonial carousel section correctly', () => {
      render(<TestimonialCarouselSection />)
      
      // Check section exists with proper semantic structure
      const section = document.querySelector('section')
      expect(section).toBeInTheDocument()
    })

    it('displays the main heading with correct text', () => {
      render(<TestimonialCarouselSection />)
      
      const heading = screen.getByRole('heading', { level: 2 })
      expect(heading).toBeInTheDocument()
      expect(heading).toHaveTextContent('Hear the gospel')
      expect(heading).toHaveTextContent('from the crowd')
    })

    it('displays testimonial cards', () => {
      render(<TestimonialCarouselSection />)
      
      // Check that testimonial cards are rendered
      const cards = document.querySelectorAll('.card')
      expect(cards.length).toBeGreaterThan(0)
    })

    it('displays testimonial text content', () => {
      render(<TestimonialCarouselSection />)
      
      // Check for testimonial text content
      expect(screen.getByText(/I really like the system at this management/)).toBeInTheDocument()
      expect(screen.getByText(/The service is fantastic and the support team/)).toBeInTheDocument()
      expect(screen.getByText(/A seamless experience from start to finish/)).toBeInTheDocument()
    })

    it('displays customer names', () => {
      render(<TestimonialCarouselSection />)
      
      // Check for customer names
      expect(screen.getByText('Adebayo Oke')).toBeInTheDocument()
      expect(screen.getByText('Chioma Phillips')).toBeInTheDocument()
      expect(screen.getByText('Kemi Ayobanji')).toBeInTheDocument()
    })
  })

  describe('Core Interactions', () => {
    it('renders navigation buttons', () => {
      render(<TestimonialCarouselSection />)
      
      const prevButton = screen.getByLabelText('Previous testimonials')
      const nextButton = screen.getByLabelText('Next testimonials')
      
      expect(prevButton).toBeInTheDocument()
      expect(nextButton).toBeInTheDocument()
    })

    it('allows clicking on next button', async () => {
      render(<TestimonialCarouselSection />)
      
      const nextButton = screen.getByLabelText('Next testimonials')
      expect(nextButton).not.toBeDisabled()
      
      // Test button is clickable (no error should occur)
      await user.click(nextButton)
      expect(nextButton).toBeInTheDocument()
    })

    it('allows clicking on previous button', async () => {
      render(<TestimonialCarouselSection />)
      
      const prevButton = screen.getByLabelText('Previous testimonials')
      expect(prevButton).not.toBeDisabled()
      
      // Test button is clickable (no error should occur)
      await user.click(prevButton)
      expect(prevButton).toBeInTheDocument()
    })

    it('navigation buttons have proper aria labels', () => {
      render(<TestimonialCarouselSection />)
      
      const prevButton = screen.getByLabelText('Previous testimonials')
      const nextButton = screen.getByLabelText('Next testimonials')
      
      expect(prevButton).toHaveAttribute('aria-label', 'Previous testimonials')
      expect(nextButton).toHaveAttribute('aria-label', 'Next testimonials')
    })
  })

  describe('Key Functionality', () => {
    it('displays multiple testimonial cards in carousel', () => {
      render(<TestimonialCarouselSection />)
      
      // Check that multiple testimonial cards are displayed
      const cards = document.querySelectorAll('.card')
      expect(cards.length).toBeGreaterThanOrEqual(3)
    })

    it('has proper carousel structure', () => {
      render(<TestimonialCarouselSection />)
      
      const carousel = document.querySelector('.carousel')
      const navButtons = document.querySelector('.navButtons')
      
      expect(carousel).toBeInTheDocument()
      expect(navButtons).toBeInTheDocument()
    })

    it('displays quote icons in testimonial cards', () => {
      render(<TestimonialCarouselSection />)
      
      // Check for quote elements
      const quoteElements = document.querySelectorAll('.quote')
      expect(quoteElements.length).toBeGreaterThan(0)
    })

    it('displays user information in testimonial cards', () => {
      render(<TestimonialCarouselSection />)
      
      // Check for user info elements
      const userInfoElements = document.querySelectorAll('.userInfo')
      expect(userInfoElements.length).toBeGreaterThan(0)
    })

    it('has proper container structure', () => {
      render(<TestimonialCarouselSection />)
      
      const container = document.querySelector('.container')
      const heading = screen.getByRole('heading', { level: 2 })
      const carousel = document.querySelector('.carousel')
      const navButtons = document.querySelector('.navButtons')
      
      expect(container).toBeInTheDocument()
      expect(container).toContainElement(heading)
      expect(container).toContainElement(carousel as HTMLElement)
      expect(container).toContainElement(navButtons as HTMLElement)
    })
  })

  describe('Accessibility Basics', () => {
    it('has proper heading hierarchy', () => {
      render(<TestimonialCarouselSection />)
      
      const heading = screen.getByRole('heading', { level: 2 })
      expect(heading).toBeInTheDocument()
    })

    it('has accessible navigation buttons with proper labels', () => {
      render(<TestimonialCarouselSection />)
      
      const prevButton = screen.getByLabelText('Previous testimonials')
      const nextButton = screen.getByLabelText('Next testimonials')
      
      expect(prevButton).toBeInTheDocument()
      expect(nextButton).toBeInTheDocument()
      
      // Buttons should have meaningful aria-labels
      expect(prevButton).toHaveAttribute('aria-label', 'Previous testimonials')
      expect(nextButton).toHaveAttribute('aria-label', 'Next testimonials')
    })

    it('maintains semantic HTML structure', () => {
      render(<TestimonialCarouselSection />)
      
      // Check for proper section element
      const section = document.querySelector('section')
      expect(section).toBeInTheDocument()
      
      // Check for proper heading element
      const heading = screen.getByRole('heading', { level: 2 })
      expect(heading).toBeInTheDocument()
      
      // Check for proper button elements
      const buttons = screen.getAllByRole('button')
      expect(buttons.length).toBeGreaterThan(0)
    })

    it('has accessible testimonial content', () => {
      render(<TestimonialCarouselSection />)
      
      // Check that testimonial text is present and readable
      const testimonialTexts = [
        /I really like the system at this management/,
        /The service is fantastic and the support team/,
        /A seamless experience from start to finish/
      ]
      
      testimonialTexts.forEach(text => {
        expect(screen.getByText(text)).toBeInTheDocument()
      })
    })

    it('provides clear customer attribution', () => {
      render(<TestimonialCarouselSection />)
      
      // Check that customer names are clearly displayed
      const customerNames = ['Adebayo Oke', 'Chioma Phillips', 'Kemi Ayobanji']
      
      customerNames.forEach(name => {
        expect(screen.getByText(name)).toBeInTheDocument()
      })
    })

    it('has proper button roles and functionality', () => {
      render(<TestimonialCarouselSection />)
      
      const buttons = screen.getAllByRole('button')
      
      // Check that all buttons are functional
      buttons.forEach(button => {
        expect(button).not.toBeDisabled()
        expect(button).toBeInTheDocument()
      })
    })
  })
}) 