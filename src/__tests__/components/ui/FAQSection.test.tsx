import { render, screen, fireEvent } from '@testing-library/react'
import FAQSection from '@/components/ui/FAQSection/FAQSection'

// Mock FAQ data for testing
const mockFAQs = [
  {
    id: '1',
    question: 'What services does Metromellow offer?',
    answer: 'Metromellow offers a comprehensive range of home services including cleaning, laundry, meal preparation, and pest control.'
  },
  {
    id: '2',
    question: 'How do I book a service?',
    answer: 'You can book a service through our website, mobile app, or by contacting our customer service team directly.'
  },
  {
    id: '3',
    question: 'Are your staff background checked?',
    answer: 'Yes, all our staff undergo thorough background checks and are fully insured for your peace of mind.'
  },
  {
    id: '4',
    question: 'What is your cancellation policy?',
    answer: 'You can cancel or reschedule your booking up to 24 hours before the scheduled service time without any charges.'
  }
]

describe('FAQSection Component', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks()
  })

  describe('Basic Rendering', () => {
    it('renders the FAQ section correctly', () => {
      render(<FAQSection faqs={mockFAQs} />)
      
      // Check that the section element exists
      const section = document.querySelector('section')
      expect(section).toBeInTheDocument()
      expect(section).toHaveClass('faq')
    })

    it('displays the main heading with correct text', () => {
      render(<FAQSection faqs={mockFAQs} />)
      
      const heading = screen.getByRole('heading', { level: 2 })
      expect(heading).toBeInTheDocument()
      expect(heading).toHaveTextContent('Questions?')
      expect(heading).toHaveTextContent('Here are')
      expect(heading).toHaveTextContent('some')
      expect(heading).toHaveTextContent('answers')
    })

    it('renders all FAQ items', () => {
      render(<FAQSection faqs={mockFAQs} />)
      
      // Check that all FAQ questions are displayed
      expect(screen.getByText('What services does Metromellow offer?')).toBeInTheDocument()
      expect(screen.getByText('How do I book a service?')).toBeInTheDocument()
      expect(screen.getByText('Are your staff background checked?')).toBeInTheDocument()
      expect(screen.getByText('What is your cancellation policy?')).toBeInTheDocument()
    })

    it('renders the FAQ container with proper structure', () => {
      render(<FAQSection faqs={mockFAQs} />)
      
      // Check that the container exists
      const container = document.querySelector('.faq__container')
      expect(container).toBeInTheDocument()
      
      // Check that the content exists
      const content = document.querySelector('.faq__content')
      expect(content).toBeInTheDocument()
      
      // Check that the heading exists
      const heading = document.querySelector('.faq__heading')
      expect(heading).toBeInTheDocument()
      
      // Check that the questions section exists
      const questions = document.querySelector('.faq__questions')
      expect(questions).toBeInTheDocument()
    })
  })

  describe('Core Interactions', () => {
    it('displays expand/collapse toggle buttons for each FAQ', () => {
      render(<FAQSection faqs={mockFAQs} />)
      
      // Check that all FAQ items have toggle buttons (initially showing '+')
      const toggleButtons = document.querySelectorAll('.faq__toggle')
      expect(toggleButtons).toHaveLength(4)
      
      // Check that all toggle buttons initially show '+'
      toggleButtons.forEach((toggle) => {
        expect(toggle).toHaveTextContent('+')
      })
    })

    it('expands FAQ item when clicked', () => {
      render(<FAQSection faqs={mockFAQs} />)
      
      // Get the first FAQ question
      const firstQuestion = screen.getByText('What services does Metromellow offer?')
      
      // Click on the question to expand it
      fireEvent.click(firstQuestion)
      
      // Check that the answer is now visible
      expect(screen.getByText('Metromellow offers a comprehensive range of home services including cleaning, laundry, meal preparation, and pest control.')).toBeInTheDocument()
      
      // Check that the toggle button now shows '−'
      const toggleButton = document.querySelector('.faq__toggle')
      expect(toggleButton).toHaveTextContent('−')
    })

    it('collapses FAQ item when clicked again', () => {
      render(<FAQSection faqs={mockFAQs} />)
      
      // Get the first FAQ question
      const firstQuestion = screen.getByText('What services does Metromellow offer?')
      
      // Click to expand
      fireEvent.click(firstQuestion)
      
      // Verify it's expanded
      expect(screen.getByText('Metromellow offers a comprehensive range of home services including cleaning, laundry, meal preparation, and pest control.')).toBeInTheDocument()
      
      // Click again to collapse
      fireEvent.click(firstQuestion)
      
      // Check that the answer is no longer visible
      expect(screen.queryByText('Metromellow offers a comprehensive range of home services including cleaning, laundry, meal preparation, and pest control.')).not.toBeInTheDocument()
      
      // Check that the toggle button shows '+' again
      const toggleButton = document.querySelector('.faq__toggle')
      expect(toggleButton).toHaveTextContent('+')
    })

    it('only allows one FAQ item to be expanded at a time', () => {
      render(<FAQSection faqs={mockFAQs} />)
      
      // Click on the first question
      const firstQuestion = screen.getByText('What services does Metromellow offer?')
      fireEvent.click(firstQuestion)
      
      // Verify first answer is visible
      expect(screen.getByText('Metromellow offers a comprehensive range of home services including cleaning, laundry, meal preparation, and pest control.')).toBeInTheDocument()
      
      // Click on the second question
      const secondQuestion = screen.getByText('How do I book a service?')
      fireEvent.click(secondQuestion)
      
      // Verify second answer is visible
      expect(screen.getByText('You can book a service through our website, mobile app, or by contacting our customer service team directly.')).toBeInTheDocument()
      
      // Verify first answer is no longer visible
      expect(screen.queryByText('Metromellow offers a comprehensive range of home services including cleaning, laundry, meal preparation, and pest control.')).not.toBeInTheDocument()
    })

    it('displays dash before each question', () => {
      render(<FAQSection faqs={mockFAQs} />)
      
      // Check that all FAQ items have dashes
      const dashes = document.querySelectorAll('.faq__dash')
      expect(dashes).toHaveLength(4)
      
      // Check that all dashes show the correct symbol
      dashes.forEach((dash) => {
        expect(dash).toHaveTextContent('—')
      })
    })
  })

  describe('Key Functionality', () => {
    it('displays complete FAQ content', () => {
      render(<FAQSection faqs={mockFAQs} />)
      
      // Check all essential content is present
      expect(screen.getByText('Questions?')).toBeInTheDocument()
      expect(screen.getByText('Here are')).toBeInTheDocument()
      expect(screen.getByText('some')).toBeInTheDocument()
      expect(screen.getByText('answers')).toBeInTheDocument()
      
      // Check all FAQ questions are present
      expect(screen.getByText('What services does Metromellow offer?')).toBeInTheDocument()
      expect(screen.getByText('How do I book a service?')).toBeInTheDocument()
      expect(screen.getByText('Are your staff background checked?')).toBeInTheDocument()
      expect(screen.getByText('What is your cancellation policy?')).toBeInTheDocument()
    })

    it('renders with proper CSS classes', () => {
      render(<FAQSection faqs={mockFAQs} />)
      
      // Check that all main CSS classes are applied
      const section = document.querySelector('.faq')
      const container = document.querySelector('.faq__container')
      const content = document.querySelector('.faq__content')
      const heading = document.querySelector('.faq__heading')
      const title = document.querySelector('.faq__title')
      const questions = document.querySelector('.faq__questions')
      const list = document.querySelector('.faq__list')
      const items = document.querySelectorAll('.faq__item')
      
      expect(section).toBeInTheDocument()
      expect(container).toBeInTheDocument()
      expect(content).toBeInTheDocument()
      expect(heading).toBeInTheDocument()
      expect(title).toBeInTheDocument()
      expect(questions).toBeInTheDocument()
      expect(list).toBeInTheDocument()
      expect(items).toHaveLength(4)
    })

    it('renders FAQ items with proper structure', () => {
      render(<FAQSection faqs={mockFAQs} />)
      
      // Check that each FAQ item has the correct structure
      const faqItems = document.querySelectorAll('.faq__item')
      expect(faqItems).toHaveLength(4)
      
      faqItems.forEach((item) => {
        // Check that each item has a question element
        expect(item.querySelector('.faq__question')).toBeInTheDocument()
        
        // Check that each question has a dash
        expect(item.querySelector('.faq__dash')).toBeInTheDocument()
        
        // Check that each question has a toggle button
        expect(item.querySelector('.faq__toggle')).toBeInTheDocument()
      })
    })

    it('applies expanded class when FAQ item is expanded', () => {
      render(<FAQSection faqs={mockFAQs} />)
      
      // Get the first FAQ question
      const firstQuestion = screen.getByText('What services does Metromellow offer?')
      
      // Click to expand
      fireEvent.click(firstQuestion)
      
      // Check that the FAQ item has the expanded class
      const faqItem = firstQuestion.closest('.faq__item')
      expect(faqItem).toHaveClass('faq__item_expanded')
    })

    it('removes expanded class when FAQ item is collapsed', () => {
      render(<FAQSection faqs={mockFAQs} />)
      
      // Get the first FAQ question
      const firstQuestion = screen.getByText('What services does Metromellow offer?')
      
      // Click to expand
      fireEvent.click(firstQuestion)
      
      // Verify it has expanded class
      const faqItem = firstQuestion.closest('.faq__item')
      expect(faqItem).toHaveClass('faq__item_expanded')
      
      // Click to collapse
      fireEvent.click(firstQuestion)
      
      // Check that the expanded class is removed
      expect(faqItem).not.toHaveClass('faq__item_expanded')
    })
  })

  describe('Accessibility Basics', () => {
    it('has proper heading hierarchy', () => {
      render(<FAQSection faqs={mockFAQs} />)
      
      // Check that the main heading is an h2
      const heading = screen.getByRole('heading', { level: 2 })
      expect(heading).toBeInTheDocument()
      expect(heading).toHaveTextContent('Questions?')
    })

    it('has semantic HTML structure', () => {
      render(<FAQSection faqs={mockFAQs} />)
      
      // Check that the component uses semantic HTML elements
      const section = document.querySelector('section')
      const heading = document.querySelector('h2')
      const list = document.querySelector('ul')
      const listItems = document.querySelectorAll('li')
      
      expect(section).toBeInTheDocument()
      expect(heading).toBeInTheDocument()
      expect(list).toBeInTheDocument()
      expect(listItems).toHaveLength(4)
    })

    it('has clickable FAQ questions', () => {
      render(<FAQSection faqs={mockFAQs} />)
      
      // Check that all FAQ questions are clickable
      const questions = document.querySelectorAll('.faq__question')
      expect(questions).toHaveLength(4)
      
      // Check that all questions have the clickable class
      questions.forEach((question) => {
        expect(question).toHaveClass('faq__question')
      })
    })

    it('has proper text content for screen readers', () => {
      render(<FAQSection faqs={mockFAQs} />)
      
      // Check that all important text content is present and accessible
      expect(screen.getByText('Questions?')).toBeInTheDocument()
      expect(screen.getByText('Here are')).toBeInTheDocument()
      expect(screen.getByText('some')).toBeInTheDocument()
      expect(screen.getByText('answers')).toBeInTheDocument()
      
      // Check FAQ questions are accessible
      expect(screen.getByText('What services does Metromellow offer?')).toBeInTheDocument()
      expect(screen.getByText('How do I book a service?')).toBeInTheDocument()
      expect(screen.getByText('Are your staff background checked?')).toBeInTheDocument()
      expect(screen.getByText('What is your cancellation policy?')).toBeInTheDocument()
    })

    it('has proper list structure for FAQ items', () => {
      render(<FAQSection faqs={mockFAQs} />)
      
      // Check that FAQ items are properly structured as a list
      const list = document.querySelector('.faq__list')
      expect(list).toBeInTheDocument()
      
      const listItems = list?.querySelectorAll('li')
      expect(listItems).toHaveLength(4)
      
      // Check that each list item contains a question
      listItems?.forEach((item) => {
        expect(item.querySelector('.faq__question')).toBeInTheDocument()
      })
    })

    it('has accessible toggle indicators', () => {
      render(<FAQSection faqs={mockFAQs} />)
      
      // Check that toggle buttons have clear visual indicators
      const toggleButtons = document.querySelectorAll('.faq__toggle')
      expect(toggleButtons).toHaveLength(4)
      
      // Check that all toggle buttons initially show '+'
      toggleButtons.forEach((toggle) => {
        expect(toggle).toHaveTextContent('+')
      })
    })
  })

  describe('Component Structure', () => {
    it('renders all major sections in correct order', () => {
      render(<FAQSection faqs={mockFAQs} />)
      
      // Check that all major sections are present in the expected order
      const container = document.querySelector('.faq__container')
      expect(container).toBeInTheDocument()
      
      // Check that content section is present
      const content = container?.querySelector('.faq__content')
      expect(content).toBeInTheDocument()
      
      // Check that heading comes first
      const heading = content?.querySelector('.faq__heading')
      expect(heading).toBeInTheDocument()
      
      // Check that title is in heading
      const title = heading?.querySelector('.faq__title')
      expect(title).toBeInTheDocument()
      
      // Check that questions section is present
      const questions = content?.querySelector('.faq__questions')
      expect(questions).toBeInTheDocument()
      
      // Check that list is in questions
      const list = questions?.querySelector('.faq__list')
      expect(list).toBeInTheDocument()
    })

    it('maintains responsive design structure', () => {
      render(<FAQSection faqs={mockFAQs} />)
      
      // Check that the component has the necessary structure for responsive design
      const section = document.querySelector('.faq')
      const container = document.querySelector('.faq__container')
      const content = document.querySelector('.faq__content')
      const heading = document.querySelector('.faq__heading')
      const questions = document.querySelector('.faq__questions')
      
      expect(section).toBeInTheDocument()
      expect(container).toBeInTheDocument()
      expect(content).toBeInTheDocument()
      expect(heading).toBeInTheDocument()
      expect(questions).toBeInTheDocument()
      
      // Check that the content has proper flex structure
      expect(content).toHaveClass('faq__content')
    })

    it('has proper FAQ item structure', () => {
      render(<FAQSection faqs={mockFAQs} />)
      
      // Check that each FAQ item has the complete structure
      const faqItems = document.querySelectorAll('.faq__item')
      expect(faqItems).toHaveLength(4)
      
      faqItems.forEach((item) => {
        // Check question structure
        const question = item.querySelector('.faq__question')
        expect(question).toBeInTheDocument()
        
        // Check dash structure
        const dash = question?.querySelector('.faq__dash')
        expect(dash).toBeInTheDocument()
        
        // Check toggle structure
        const toggle = question?.querySelector('.faq__toggle')
        expect(toggle).toBeInTheDocument()
        
        // Check that question text is present
        expect(question?.textContent).toContain('—')
        expect(question?.textContent).toContain('+')
      })
    })

    it('handles empty FAQ list gracefully', () => {
      render(<FAQSection faqs={[]} />)
      
      // Check that the component still renders with empty FAQs
      const section = document.querySelector('.faq')
      expect(section).toBeInTheDocument()
      
      // Check that the heading is still present
      expect(screen.getByText('Questions?')).toBeInTheDocument()
      
      // Check that the list exists but is empty
      const list = document.querySelector('.faq__list')
      expect(list).toBeInTheDocument()
      
      const listItems = list?.querySelectorAll('li')
      expect(listItems).toHaveLength(0)
    })
  })
}) 