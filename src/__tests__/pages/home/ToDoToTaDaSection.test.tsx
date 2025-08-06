import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ToDoToTaDaSection from '@/app/_components/ToDoToTaDaSection/ToDoToTaDaSection'

describe('ToDoToTaDaSection Component', () => {
  const user = userEvent.setup()

  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks()
  })

  describe('Basic Rendering', () => {
    it('renders the ToDoToTaDa section correctly', () => {
      render(<ToDoToTaDaSection />)
      
      // Check section exists with proper semantic structure
      const section = document.querySelector('section')
      expect(section).toBeInTheDocument()
    })

    it('displays the main heading with correct text', () => {
      render(<ToDoToTaDaSection />)
      
      const heading = screen.getByRole('heading', { level: 1 })
      expect(heading).toBeInTheDocument()
      expect(heading).toHaveTextContent('From To-Do')
      expect(heading).toHaveTextContent('to Ta-Da!')
    })

    it('displays the "To-Do" text with bold styling', () => {
      render(<ToDoToTaDaSection />)
      
      const todoText = screen.getByText('To-Do')
      expect(todoText).toBeInTheDocument()
      expect(todoText.closest('span')).toHaveClass('bold')
    })

    it('displays the "Ta-Da!" text with special styling', () => {
      render(<ToDoToTaDaSection />)
      
      const taDaText = screen.getByText('Ta-Da!')
      expect(taDaText).toBeInTheDocument()
      expect(taDaText.closest('span')).toHaveClass('taDa')
    })
  })

  describe('Core Interactions', () => {
    it('renders the book service button', () => {
      render(<ToDoToTaDaSection />)
      
      const bookButton = screen.getByText('Book a service')
      expect(bookButton).toBeInTheDocument()
      expect(bookButton).toBeInTheDocument()
    })

    it('allows clicking on the book service button', async () => {
      render(<ToDoToTaDaSection />)
      
      const bookButton = screen.getByText('Book a service')
      expect(bookButton).not.toBeDisabled()
      
      // Test button is clickable (no error should occur)
      await user.click(bookButton)
      expect(bookButton).toBeInTheDocument()
    })
  })

  describe('Key Functionality', () => {
    it('displays all three steps in the ordered list', () => {
      render(<ToDoToTaDaSection />)
      
      // Check all three steps are present
      expect(screen.getByText('Click what\'s stressing you out')).toBeInTheDocument()
      expect(screen.getByText('Choose your rescue time')).toBeInTheDocument()
      expect(screen.getByText('Boom. It\'s done. You\'re the hero.')).toBeInTheDocument()
    })

    it('renders steps as an ordered list', () => {
      render(<ToDoToTaDaSection />)
      
      const stepsList = document.querySelector('ol')
      expect(stepsList).toBeInTheDocument()
      expect(stepsList).toHaveClass('steps')
    })

    it('displays content in a centered wrapper', () => {
      render(<ToDoToTaDaSection />)
      
      const contentWrapper = document.querySelector('.contentWrapper')
      expect(contentWrapper).toBeInTheDocument()
      
      // Check that the heading and button are within the wrapper
      const heading = screen.getByRole('heading', { level: 1 })
      const bookButton = screen.getByText('Book a service')
      
      expect(contentWrapper).toContainElement(heading)
      expect(contentWrapper).toContainElement(bookButton)
    })

    it('has proper section structure with heading, steps, and button', () => {
      render(<ToDoToTaDaSection />)
      
      const section = document.querySelector('section')
      const heading = screen.getByRole('heading', { level: 1 })
      const stepsList = document.querySelector('ol')
      const bookButton = screen.getByText('Book a service')
      
      expect(section).toBeInTheDocument()
      expect(heading).toBeInTheDocument()
      expect(stepsList).toBeInTheDocument()
      expect(bookButton).toBeInTheDocument()
    })
  })

  describe('Accessibility Basics', () => {
    it('has proper heading hierarchy', () => {
      render(<ToDoToTaDaSection />)
      
      const heading = screen.getByRole('heading', { level: 1 })
      expect(heading).toBeInTheDocument()
    })

    it('has accessible button with proper text content', () => {
      render(<ToDoToTaDaSection />)
      
      const bookButton = screen.getByText('Book a service')
      expect(bookButton).toBeInTheDocument()
      
      // Button should have meaningful text content
      expect(bookButton.textContent).toBeTruthy()
    })

    it('maintains semantic HTML structure', () => {
      render(<ToDoToTaDaSection />)
      
      // Check for proper section element
      const section = document.querySelector('section')
      expect(section).toBeInTheDocument()
      
      // Check for proper heading element
      const heading = screen.getByRole('heading', { level: 1 })
      expect(heading).toBeInTheDocument()
      
      // Check for proper ordered list element
      const stepsList = document.querySelector('ol')
      expect(stepsList).toBeInTheDocument()
    })

    it('has accessible list structure with proper list items', () => {
      render(<ToDoToTaDaSection />)
      
      const stepsList = document.querySelector('ol')
      const listItems = stepsList?.querySelectorAll('li')
      
      expect(stepsList).toBeInTheDocument()
      expect(listItems).toHaveLength(3)
      
      // Check each list item has text content
      listItems?.forEach(item => {
        expect(item.textContent).toBeTruthy()
      })
    })

    it('provides clear step-by-step instructions', () => {
      render(<ToDoToTaDaSection />)
      
      // Check that all steps provide clear, actionable instructions
      const step1 = screen.getByText('Click what\'s stressing you out')
      const step2 = screen.getByText('Choose your rescue time')
      const step3 = screen.getByText('Boom. It\'s done. You\'re the hero.')
      
      expect(step1).toBeInTheDocument()
      expect(step2).toBeInTheDocument()
      expect(step3).toBeInTheDocument()
      
      // Verify steps are in the correct order
      const stepsList = document.querySelector('ol')
      const listItems = stepsList?.querySelectorAll('li')
      
      expect(listItems?.[0]).toContainElement(step1)
      expect(listItems?.[1]).toContainElement(step2)
      expect(listItems?.[2]).toContainElement(step3)
    })
  })
}) 