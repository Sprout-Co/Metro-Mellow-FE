import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CTASection from '@/app/_components/CTA/CTA'

describe('CTA Component', () => {
  const user = userEvent.setup()

  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks()
  })

  describe('Basic Rendering', () => {
    it('renders the CTA section correctly', () => {
      render(<CTASection />)
      
      // Check CTA section exists
      expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument()
    })

    it('displays the main title with correct text', () => {
      render(<CTASection />)
      
      const title = screen.getByRole('heading', { level: 2 })
      expect(title).toBeInTheDocument()
      expect(title).toHaveTextContent('Ready to Experience the Metromellow Difference?')
    })

    it('displays the description text', () => {
      render(<CTASection />)
      
      const description = screen.getByText(/Join thousands of satisfied customers/)
      expect(description).toBeInTheDocument()
    })

    it('renders the explore services button', () => {
      render(<CTASection />)
      
      const exploreButton = screen.getByText('Explore Services')
      expect(exploreButton).toBeInTheDocument()
    })

    it('displays all feature items', () => {
      render(<CTASection />)
      
      // Check all feature titles are present
      expect(screen.getByText('Satisfaction Guaranteed')).toBeInTheDocument()
      expect(screen.getByText('Fully Insured')).toBeInTheDocument()
      expect(screen.getByText('Flexible Scheduling')).toBeInTheDocument()
      expect(screen.getByText('Vetted Professionals')).toBeInTheDocument()
    })
  })

  describe('Form Interactions', () => {
    it('displays email input field', () => {
      render(<CTASection />)
      
      const emailInput = screen.getByPlaceholderText('Enter your email')
      expect(emailInput).toBeInTheDocument()
      expect(emailInput).toHaveAttribute('type', 'email')
      expect(emailInput).toHaveAttribute('required')
    })

    it('allows typing in email input', async () => {
      render(<CTASection />)
      
      const emailInput = screen.getByPlaceholderText('Enter your email')
      await user.type(emailInput, 'test@example.com')
      
      expect(emailInput).toHaveValue('test@example.com')
    })

    it('displays submit button', () => {
      render(<CTASection />)
      
      const submitButton = screen.getByText('Request a Quote')
      expect(submitButton).toBeInTheDocument()
      expect(submitButton).toHaveAttribute('type', 'submit')
    })
  })

  describe('Form Submission', () => {
    it('shows success message after form submission', async () => {
      render(<CTASection />)
      
      const emailInput = screen.getByPlaceholderText('Enter your email')
      const submitButton = screen.getByText('Request a Quote')
      
      // Fill and submit form
      await user.type(emailInput, 'test@example.com')
      await user.click(submitButton)
      
      // Check success message appears
      expect(screen.getByText('Thank you! We\'ll be in touch shortly.')).toBeInTheDocument()
    })

    it('hides form after successful submission', async () => {
      render(<CTASection />)
      
      const emailInput = screen.getByPlaceholderText('Enter your email')
      const submitButton = screen.getByText('Request a Quote')
      
      // Fill and submit form
      await user.type(emailInput, 'test@example.com')
      await user.click(submitButton)
      
      // Form should be hidden
      expect(screen.queryByPlaceholderText('Enter your email')).not.toBeInTheDocument()
      expect(screen.queryByText('Request a Quote')).not.toBeInTheDocument()
    })
  })

  describe('Navigation', () => {
    it('explore services button links to services page', () => {
      render(<CTASection />)
      
      const exploreButton = screen.getByText('Explore Services').closest('a')
      expect(exploreButton).toHaveAttribute('href', '/services')
    })
  })

  describe('Accessibility', () => {
    it('has proper form structure', () => {
      render(<CTASection />)
      
      const form = document.querySelector('form')
      expect(form).toBeInTheDocument()
    })

    it('email input has proper attributes', () => {
      render(<CTASection />)
      
      const emailInput = screen.getByPlaceholderText('Enter your email')
      expect(emailInput).toHaveAttribute('type', 'email')
      expect(emailInput).toHaveAttribute('required')
    })

    it('submit button has proper type attribute', () => {
      render(<CTASection />)
      
      const submitButton = screen.getByText('Request a Quote')
      expect(submitButton).toHaveAttribute('type', 'submit')
    })
  })
}) 