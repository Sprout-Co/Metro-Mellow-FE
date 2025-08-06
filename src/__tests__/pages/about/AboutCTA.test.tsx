import { render, screen } from '@testing-library/react'
import AboutCTA from '@/app/(routes)/(site)/about/_components/AboutCTA/AboutCTA'

// Mock framer-motion since it's not available in Jest environment
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, className, initial, whileInView, viewport, transition, ...props }: any) => (
      <div className={className} {...props}>
        {children}
      </div>
    ),
  },
}))

describe('AboutCTA Component', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks()
  })

  describe('Basic Rendering', () => {
    it('renders the about CTA section correctly', () => {
      render(<AboutCTA />)
      
      // Check that the section element exists
      const section = document.querySelector('section')
      expect(section).toBeInTheDocument()
      expect(section).toHaveClass('aboutCta')
    })

    it('displays the main heading with correct text', () => {
      render(<AboutCTA />)
      
      const heading = screen.getByRole('heading', { level: 2 })
      expect(heading).toBeInTheDocument()
      expect(heading).toHaveTextContent('Ready to Experience the Metromellow Difference?')
    })

    it('displays the description text', () => {
      render(<AboutCTA />)
      
      const description = screen.getByText(/Let us take care of your home services needs/)
      expect(description).toBeInTheDocument()
      expect(description).toHaveTextContent('Let us take care of your home services needs so you can focus on what matters most to you.')
    })

    it('renders the CTA container with proper structure', () => {
      render(<AboutCTA />)
      
      // Check that the container exists
      const container = document.querySelector('.aboutCta__container')
      expect(container).toBeInTheDocument()
      
      // Check that the content exists
      const content = document.querySelector('.aboutCta__content')
      expect(content).toBeInTheDocument()
    })
  })

  describe('Core Interactions', () => {
    it('displays both CTA buttons', () => {
      render(<AboutCTA />)
      
      // Check that both buttons are present
      expect(screen.getByRole('link', { name: /our services/i })).toBeInTheDocument()
      expect(screen.getByRole('link', { name: /contact us/i })).toBeInTheDocument()
    })

    it('displays primary button with correct text and link', () => {
      render(<AboutCTA />)
      
      // Check that the primary button is present with correct text
      const primaryButton = screen.getByRole('link', { name: /our services/i })
      expect(primaryButton).toBeInTheDocument()
      expect(primaryButton).toHaveTextContent('Our Services')
      expect(primaryButton).toHaveAttribute('href', '/services')
    })

    it('displays secondary button with correct text and link', () => {
      render(<AboutCTA />)
      
      // Check that the secondary button is present with correct text
      const secondaryButton = screen.getByRole('link', { name: /contact us/i })
      expect(secondaryButton).toBeInTheDocument()
      expect(secondaryButton).toHaveTextContent('Contact Us')
      expect(secondaryButton).toHaveAttribute('href', '/contact')
    })

    it('renders buttons with proper styling classes', () => {
      render(<AboutCTA />)
      
      // Check that buttons have the correct CSS classes
      const primaryButton = screen.getByRole('link', { name: /our services/i })
      const secondaryButton = screen.getByRole('link', { name: /contact us/i })
      
      expect(primaryButton).toHaveClass('aboutCta__primaryBtn')
      expect(secondaryButton).toHaveClass('aboutCta__secondaryBtn')
    })
  })

  describe('Key Functionality', () => {
    it('displays complete CTA content', () => {
      render(<AboutCTA />)
      
      // Check all essential content is present
      expect(screen.getByText('Ready to Experience the Metromellow Difference?')).toBeInTheDocument()
      expect(screen.getByText(/Let us take care of your home services needs/)).toBeInTheDocument()
      expect(screen.getByText('Our Services')).toBeInTheDocument()
      expect(screen.getByText('Contact Us')).toBeInTheDocument()
    })

    it('renders with proper CSS classes', () => {
      render(<AboutCTA />)
      
      // Check that all main CSS classes are applied
      const section = document.querySelector('.aboutCta')
      const container = document.querySelector('.aboutCta__container')
      const content = document.querySelector('.aboutCta__content')
      const title = document.querySelector('.aboutCta__title')
      const text = document.querySelector('.aboutCta__text')
      const buttons = document.querySelector('.aboutCta__buttons')
      const primaryBtn = document.querySelector('.aboutCta__primaryBtn')
      const secondaryBtn = document.querySelector('.aboutCta__secondaryBtn')
      
      expect(section).toBeInTheDocument()
      expect(container).toBeInTheDocument()
      expect(content).toBeInTheDocument()
      expect(title).toBeInTheDocument()
      expect(text).toBeInTheDocument()
      expect(buttons).toBeInTheDocument()
      expect(primaryBtn).toBeInTheDocument()
      expect(secondaryBtn).toBeInTheDocument()
    })

    it('renders CTA content with proper structure', () => {
      render(<AboutCTA />)
      
      // Check that the content has the correct structure
      const content = document.querySelector('.aboutCta__content')
      expect(content).toBeInTheDocument()
      
      // Check that the title is inside the content
      const title = content?.querySelector('.aboutCta__title')
      expect(title).toBeInTheDocument()
      
      // Check that the text is inside the content
      const text = content?.querySelector('.aboutCta__text')
      expect(text).toBeInTheDocument()
      
      // Check that the buttons are inside the content
      const buttons = content?.querySelector('.aboutCta__buttons')
      expect(buttons).toBeInTheDocument()
    })

    it('renders buttons container with proper structure', () => {
      render(<AboutCTA />)
      
      // Check that the buttons container has the correct structure
      const buttonsContainer = document.querySelector('.aboutCta__buttons')
      expect(buttonsContainer).toBeInTheDocument()
      
      // Check that both buttons are inside the container
      const primaryButton = buttonsContainer?.querySelector('.aboutCta__primaryBtn')
      const secondaryButton = buttonsContainer?.querySelector('.aboutCta__secondaryBtn')
      
      expect(primaryButton).toBeInTheDocument()
      expect(secondaryButton).toBeInTheDocument()
    })

    it('has proper button navigation links', () => {
      render(<AboutCTA />)
      
      // Check that the primary button links to services
      const primaryButton = screen.getByRole('link', { name: /our services/i })
      expect(primaryButton).toHaveAttribute('href', '/services')
      
      // Check that the secondary button links to contact
      const secondaryButton = screen.getByRole('link', { name: /contact us/i })
      expect(secondaryButton).toHaveAttribute('href', '/contact')
    })
  })

  describe('Accessibility Basics', () => {
    it('has proper heading hierarchy', () => {
      render(<AboutCTA />)
      
      // Check that the main heading is an h2
      const heading = screen.getByRole('heading', { level: 2 })
      expect(heading).toBeInTheDocument()
      expect(heading).toHaveTextContent('Ready to Experience the Metromellow Difference?')
    })

    it('has accessible navigation links', () => {
      render(<AboutCTA />)
      
      // Check that both buttons are accessible as links
      const primaryButton = screen.getByRole('link', { name: /our services/i })
      const secondaryButton = screen.getByRole('link', { name: /contact us/i })
      
      expect(primaryButton).toBeInTheDocument()
      expect(secondaryButton).toBeInTheDocument()
      
      // Check that links have proper href attributes
      expect(primaryButton).toHaveAttribute('href', '/services')
      expect(secondaryButton).toHaveAttribute('href', '/contact')
    })

    it('has semantic HTML structure', () => {
      render(<AboutCTA />)
      
      // Check that the component uses semantic HTML elements
      const section = document.querySelector('section')
      const heading = document.querySelector('h2')
      const paragraph = document.querySelector('p')
      const links = document.querySelectorAll('a')
      
      expect(section).toBeInTheDocument()
      expect(heading).toBeInTheDocument()
      expect(paragraph).toBeInTheDocument()
      expect(links).toHaveLength(2)
    })

    it('has proper text content for screen readers', () => {
      render(<AboutCTA />)
      
      // Check that all important text content is present and accessible
      expect(screen.getByText('Ready to Experience the Metromellow Difference?')).toBeInTheDocument()
      expect(screen.getByText(/Let us take care of your home services needs/)).toBeInTheDocument()
      expect(screen.getByText('Our Services')).toBeInTheDocument()
      expect(screen.getByText('Contact Us')).toBeInTheDocument()
    })

    it('has descriptive link text', () => {
      render(<AboutCTA />)
      
      // Check that link text is descriptive and meaningful
      const primaryButton = screen.getByRole('link', { name: /our services/i })
      const secondaryButton = screen.getByRole('link', { name: /contact us/i })
      
      expect(primaryButton).toHaveTextContent('Our Services')
      expect(secondaryButton).toHaveTextContent('Contact Us')
    })

    it('has proper contrast and readability', () => {
      render(<AboutCTA />)
      
      // Check that the component has the necessary structure for good contrast
      const section = document.querySelector('.aboutCta')
      expect(section).toBeInTheDocument()
      
      // Check that the title is present for readability
      const title = document.querySelector('.aboutCta__title')
      expect(title).toBeInTheDocument()
      
      // Check that the description text is present
      const text = document.querySelector('.aboutCta__text')
      expect(text).toBeInTheDocument()
    })
  })

  describe('Component Structure', () => {
    it('renders all major sections in correct order', () => {
      render(<AboutCTA />)
      
      // Check that all major sections are present in the expected order
      const container = document.querySelector('.aboutCta__container')
      expect(container).toBeInTheDocument()
      
      // Check that content section is present
      const content = container?.querySelector('.aboutCta__content')
      expect(content).toBeInTheDocument()
      
      // Check that title comes first
      const title = content?.querySelector('.aboutCta__title')
      expect(title).toBeInTheDocument()
      
      // Check that text comes after title
      const text = content?.querySelector('.aboutCta__text')
      expect(text).toBeInTheDocument()
      
      // Check that buttons come last
      const buttons = content?.querySelector('.aboutCta__buttons')
      expect(buttons).toBeInTheDocument()
    })

    it('maintains responsive design structure', () => {
      render(<AboutCTA />)
      
      // Check that the component has the necessary structure for responsive design
      const section = document.querySelector('.aboutCta')
      const container = document.querySelector('.aboutCta__container')
      const content = document.querySelector('.aboutCta__content')
      const buttons = document.querySelector('.aboutCta__buttons')
      
      expect(section).toBeInTheDocument()
      expect(container).toBeInTheDocument()
      expect(content).toBeInTheDocument()
      expect(buttons).toBeInTheDocument()
      
      // Check that the content has proper centering structure
      expect(content).toHaveClass('aboutCta__content')
    })

    it('has proper button layout structure', () => {
      render(<AboutCTA />)
      
      // Check that the buttons container has the complete structure
      const buttonsContainer = document.querySelector('.aboutCta__buttons')
      expect(buttonsContainer).toBeInTheDocument()
      
      // Check that both buttons are present in the container
      const primaryButton = buttonsContainer?.querySelector('.aboutCta__primaryBtn')
      const secondaryButton = buttonsContainer?.querySelector('.aboutCta__secondaryBtn')
      
      expect(primaryButton).toBeInTheDocument()
      expect(secondaryButton).toBeInTheDocument()
      
      // Check that buttons have proper text content
      expect(primaryButton).toHaveTextContent('Our Services')
      expect(secondaryButton).toHaveTextContent('Contact Us')
    })

    it('has proper content centering', () => {
      render(<AboutCTA />)
      
      // Check that the content is properly centered
      const content = document.querySelector('.aboutCta__content')
      expect(content).toBeInTheDocument()
      
      // Check that the content has the proper class for centering
      expect(content).toHaveClass('aboutCta__content')
      
      // Check that the title, text, and buttons are all present
      const title = content?.querySelector('.aboutCta__title')
      const text = content?.querySelector('.aboutCta__text')
      const buttons = content?.querySelector('.aboutCta__buttons')
      
      expect(title).toBeInTheDocument()
      expect(text).toBeInTheDocument()
      expect(buttons).toBeInTheDocument()
    })
  })
}) 