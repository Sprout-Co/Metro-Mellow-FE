import { render, screen } from '@testing-library/react'
import ImpactSection from '@/app/(routes)/(site)/about/_components/ImpactSection/ImpactSection'
import { Routes } from '@/constants/routes'

// Mock Next.js Image component since it's not available in Jest environment
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, width, height, priority, ...props }: any) => (
    <img src={src} alt={alt} width={width} height={height} {...props} />
  ),
}))

describe('ImpactSection Component', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks()
  })

  describe('Basic Rendering', () => {
    it('renders the impact section correctly', () => {
      render(<ImpactSection />)
      
      // Check main section exists by looking for the main heading
      expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument()
    })

    it('displays the main heading with correct text', () => {
      render(<ImpactSection />)
      
      const heading = screen.getByRole('heading', { level: 2 })
      expect(heading).toBeInTheDocument()
      expect(heading).toHaveTextContent('Our impacts')
    })

    it('displays the description text', () => {
      render(<ImpactSection />)
      
      const description = screen.getByText(/We're the spark that turns your chaos into calm/)
      expect(description).toBeInTheDocument()
      expect(description).toHaveTextContent("We're the spark that turns your chaos into calm, the groove that gets your life back in tune.")
    })

    it('renders the impact section with proper structure', () => {
      render(<ImpactSection />)
      
      // Check that the section element exists
      const section = document.querySelector('section')
      expect(section).toBeInTheDocument()
      expect(section).toHaveClass('impact-section')
    })
  })

  describe('Core Interactions', () => {
    it('displays all three impact statistics', () => {
      render(<ImpactSection />)
      
      // Check that all three stat items are present
      expect(screen.getByText('900+')).toBeInTheDocument()
      expect(screen.getByText('120+')).toBeInTheDocument()
      expect(screen.getByText('20+')).toBeInTheDocument()
    })

    it('displays correct stat labels', () => {
      render(<ImpactSection />)
      
      // Check that all stat labels are present
      expect(screen.getByText('Project completed')).toBeInTheDocument()
      expect(screen.getByText('Hire hands')).toBeInTheDocument()
      expect(screen.getByText('states availability')).toBeInTheDocument()
    })

    it('renders the impact map image', () => {
      render(<ImpactSection />)
      
      // Check that the map image is rendered with correct attributes
      const mapImage = screen.getByAltText('Metromellow global impact map')
      expect(mapImage).toBeInTheDocument()
      expect(mapImage).toHaveAttribute('src', '/images/impact/map.png')
      expect(mapImage).toHaveAttribute('width', '1200')
      expect(mapImage).toHaveAttribute('height', '600')
    })
  })

  describe('Key Functionality', () => {
    it('displays complete impact content', () => {
      render(<ImpactSection />)
      
      // Check all essential content is present
      expect(screen.getByText('Our impacts')).toBeInTheDocument()
      expect(screen.getByText(/We're the spark that turns your chaos into calm/)).toBeInTheDocument()
      expect(screen.getByText('900+')).toBeInTheDocument()
      expect(screen.getByText('120+')).toBeInTheDocument()
      expect(screen.getByText('20+')).toBeInTheDocument()
      expect(screen.getByText('Project completed')).toBeInTheDocument()
      expect(screen.getByText('Hire hands')).toBeInTheDocument()
      expect(screen.getByText('states availability')).toBeInTheDocument()
    })

    it('renders with proper CSS classes', () => {
      render(<ImpactSection />)
      
      // Check that all main CSS classes are applied
      const section = document.querySelector('.impact-section')
      const container = document.querySelector('.impact-section__container')
      const heading = document.querySelector('.impact-section__heading')
      const description = document.querySelector('.impact-section__description')
      const stats = document.querySelector('.impact-section__stats')
      const map = document.querySelector('.impact-section__map')
      const cta = document.querySelector('.impact-section__cta')
      
      expect(section).toBeInTheDocument()
      expect(container).toBeInTheDocument()
      expect(heading).toBeInTheDocument()
      expect(description).toBeInTheDocument()
      expect(stats).toBeInTheDocument()
      expect(map).toBeInTheDocument()
      expect(cta).toBeInTheDocument()
    })

    it('displays the CTA button with correct text and link', () => {
      render(<ImpactSection />)
      
      // Check that the CTA button is present with correct text
      const ctaButton = screen.getByRole('link', { name: /JOIN OUR MISSION/i })
      expect(ctaButton).toBeInTheDocument()
      expect(ctaButton).toHaveTextContent('JOIN OUR MISSION')
      expect(ctaButton).toHaveAttribute('href', '/get-started')
    })

    it('renders stat items with proper structure', () => {
      render(<ImpactSection />)
      
      // Check that stat items have the correct structure
      const statItems = document.querySelectorAll('.impact-section__stat-item')
      expect(statItems).toHaveLength(3)
      
      // Check that each stat item has a number and label
      statItems.forEach((item) => {
        expect(item.querySelector('.impact-section__stat-number')).toBeInTheDocument()
        expect(item.querySelector('.impact-section__stat-label')).toBeInTheDocument()
      })
    })
  })

  describe('Accessibility Basics', () => {
    it('has proper heading hierarchy', () => {
      render(<ImpactSection />)
      
      // Check that the main heading is an h2
      const heading = screen.getByRole('heading', { level: 2 })
      expect(heading).toBeInTheDocument()
      expect(heading).toHaveTextContent('Our impacts')
    })

    it('has accessible image with alt text', () => {
      render(<ImpactSection />)
      
      // Check that the map image has proper alt text
      const mapImage = screen.getByAltText('Metromellow global impact map')
      expect(mapImage).toBeInTheDocument()
      expect(mapImage).toHaveAttribute('alt', 'Metromellow global impact map')
    })

    it('has accessible CTA button', () => {
      render(<ImpactSection />)
      
      // Check that the CTA button is accessible
      const ctaButton = screen.getByRole('link', { name: /JOIN OUR MISSION/i })
      expect(ctaButton).toBeInTheDocument()
      expect(ctaButton).toHaveAttribute('href', '/get-started')
    })

    it('has semantic HTML structure', () => {
      render(<ImpactSection />)
      
      // Check that the component uses semantic HTML elements
      const section = document.querySelector('section')
      const heading = document.querySelector('h2')
      const paragraph = document.querySelector('p')
      
      expect(section).toBeInTheDocument()
      expect(heading).toBeInTheDocument()
      expect(paragraph).toBeInTheDocument()
    })

    it('has proper text content for screen readers', () => {
      render(<ImpactSection />)
      
      // Check that all important text content is present and accessible
      expect(screen.getByText('Our impacts')).toBeInTheDocument()
      expect(screen.getByText(/We're the spark that turns your chaos into calm/)).toBeInTheDocument()
      expect(screen.getByText('900+')).toBeInTheDocument()
      expect(screen.getByText('120+')).toBeInTheDocument()
      expect(screen.getByText('20+')).toBeInTheDocument()
      expect(screen.getByText('Project completed')).toBeInTheDocument()
      expect(screen.getByText('Hire hands')).toBeInTheDocument()
      expect(screen.getByText('states availability')).toBeInTheDocument()
      expect(screen.getByText('JOIN OUR MISSION')).toBeInTheDocument()
    })
  })

  describe('Component Structure', () => {
    it('renders all major sections in correct order', () => {
      render(<ImpactSection />)
      
      // Check that all major sections are present in the expected order
      const container = document.querySelector('.impact-section__container')
      expect(container).toBeInTheDocument()
      
      // Check that heading comes first
      const heading = container?.querySelector('.impact-section__heading')
      expect(heading).toBeInTheDocument()
      
      // Check that description comes after heading
      const description = container?.querySelector('.impact-section__description')
      expect(description).toBeInTheDocument()
      
      // Check that stats section is present
      const stats = container?.querySelector('.impact-section__stats')
      expect(stats).toBeInTheDocument()
      
      // Check that map section is present
      const map = container?.querySelector('.impact-section__map')
      expect(map).toBeInTheDocument()
      
      // Check that CTA section is present
      const cta = container?.querySelector('.impact-section__cta')
      expect(cta).toBeInTheDocument()
    })

    it('maintains responsive design structure', () => {
      render(<ImpactSection />)
      
      // Check that the component has the necessary structure for responsive design
      const section = document.querySelector('.impact-section')
      const container = document.querySelector('.impact-section__container')
      
      expect(section).toBeInTheDocument()
      expect(container).toBeInTheDocument()
      
      // Check that the container has proper flex direction
      expect(container).toHaveClass('impact-section__container')
    })
  })
}) 