import { render, screen } from '@testing-library/react'
import TeamSection from '@/app/(routes)/(site)/about/_components/TeamSection/TeamSection'

// Mock Next.js Image component since it's not available in Jest environment
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, width, height, className, ...props }: any) => (
    <img src={src} alt={alt} width={width} height={height} className={className} {...props} />
  ),
}))

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

describe('TeamSection Component', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks()
  })

  describe('Basic Rendering', () => {
    it('renders the team section correctly', () => {
      render(<TeamSection />)
      
      // Check that the section element exists
      const section = document.querySelector('section')
      expect(section).toBeInTheDocument()
      expect(section).toHaveClass('team')
    })

    it('displays the main heading with correct text', () => {
      render(<TeamSection />)
      
      const heading = screen.getByRole('heading', { level: 2 })
      expect(heading).toBeInTheDocument()
      expect(heading).toHaveTextContent('Meet Our Leadership Team')
    })

    it('displays the subtitle text', () => {
      render(<TeamSection />)
      
      const subtitle = screen.getByText(/The dedicated individuals who guide our vision/)
      expect(subtitle).toBeInTheDocument()
      expect(subtitle).toHaveTextContent('The dedicated individuals who guide our vision and ensure excellence in everything we do')
    })

    it('renders all four team members', () => {
      render(<TeamSection />)
      
      // Check that all four team member cards are present
      const teamMembers = document.querySelectorAll('.team__member')
      expect(teamMembers).toHaveLength(4)
    })
  })

  describe('Core Interactions', () => {
    it('displays all team member names', () => {
      render(<TeamSection />)
      
      // Check that all team member names are present
      expect(screen.getByText('Sarah Chen')).toBeInTheDocument()
      expect(screen.getByText('Marcus Thompson')).toBeInTheDocument()
      expect(screen.getByText('Elena Rodriguez')).toBeInTheDocument()
      expect(screen.getByText('David Kim')).toBeInTheDocument()
    })

    it('displays all team member positions', () => {
      render(<TeamSection />)
      
      // Check that all team member positions are present
      expect(screen.getByText('Co-Founder & CEO')).toBeInTheDocument()
      expect(screen.getByText('Co-Founder & COO')).toBeInTheDocument()
      expect(screen.getByText('Customer Experience Director')).toBeInTheDocument()
      expect(screen.getByText('Head of Professional Services')).toBeInTheDocument()
    })

    it('displays all team member bios', () => {
      render(<TeamSection />)
      
      // Check that all team member bios are present
      expect(screen.getByText(/Sarah has over 15 years of experience/)).toBeInTheDocument()
      expect(screen.getByText(/Marcus brings operational expertise/)).toBeInTheDocument()
      expect(screen.getByText(/Elena ensures that every client interaction/)).toBeInTheDocument()
      expect(screen.getByText(/David leads our team of service professionals/)).toBeInTheDocument()
    })

    it('renders team member images with correct attributes', () => {
      render(<TeamSection />)
      
      // Check that all team member images are rendered with correct attributes
      const images = screen.getAllByRole('img')
      expect(images).toHaveLength(4)
      
      // Check specific image attributes for each team member
      const sarahImage = screen.getByAltText('Sarah Chen')
      const marcusImage = screen.getByAltText('Marcus Thompson')
      const elenaImage = screen.getByAltText('Elena Rodriguez')
      const davidImage = screen.getByAltText('David Kim')
      
      expect(sarahImage).toHaveAttribute('src', '/images/team/sarah.webp')
      expect(marcusImage).toHaveAttribute('src', '/images/team/marcus.webp')
      expect(elenaImage).toHaveAttribute('src', '/images/team/elena.webp')
      expect(davidImage).toHaveAttribute('src', '/images/team/david.webp')
    })
  })

  describe('Key Functionality', () => {
    it('displays complete team content', () => {
      render(<TeamSection />)
      
      // Check all essential content is present
      expect(screen.getByText('Meet Our Leadership Team')).toBeInTheDocument()
      expect(screen.getByText(/The dedicated individuals who guide our vision/)).toBeInTheDocument()
      
      // Check all team members and their details
      expect(screen.getByText('Sarah Chen')).toBeInTheDocument()
      expect(screen.getByText('Co-Founder & CEO')).toBeInTheDocument()
      expect(screen.getByText(/Sarah has over 15 years of experience/)).toBeInTheDocument()
      
      expect(screen.getByText('Marcus Thompson')).toBeInTheDocument()
      expect(screen.getByText('Co-Founder & COO')).toBeInTheDocument()
      expect(screen.getByText(/Marcus brings operational expertise/)).toBeInTheDocument()
      
      expect(screen.getByText('Elena Rodriguez')).toBeInTheDocument()
      expect(screen.getByText('Customer Experience Director')).toBeInTheDocument()
      expect(screen.getByText(/Elena ensures that every client interaction/)).toBeInTheDocument()
      
      expect(screen.getByText('David Kim')).toBeInTheDocument()
      expect(screen.getByText('Head of Professional Services')).toBeInTheDocument()
      expect(screen.getByText(/David leads our team of service professionals/)).toBeInTheDocument()
    })

    it('renders with proper CSS classes', () => {
      render(<TeamSection />)
      
      // Check that all main CSS classes are applied
      const section = document.querySelector('.team')
      const container = document.querySelector('.team__container')
      const header = document.querySelector('.team__header')
      const title = document.querySelector('.team__title')
      const subtitle = document.querySelector('.team__subtitle')
      const grid = document.querySelector('.team__grid')
      const members = document.querySelectorAll('.team__member')
      
      expect(section).toBeInTheDocument()
      expect(container).toBeInTheDocument()
      expect(header).toBeInTheDocument()
      expect(title).toBeInTheDocument()
      expect(subtitle).toBeInTheDocument()
      expect(grid).toBeInTheDocument()
      expect(members).toHaveLength(4)
    })

    it('renders team member cards with proper structure', () => {
      render(<TeamSection />)
      
      // Check that each team member card has the correct structure
      const teamMembers = document.querySelectorAll('.team__member')
      expect(teamMembers).toHaveLength(4)
      
      teamMembers.forEach((member) => {
        // Check for image wrapper
        expect(member.querySelector('.team__imageWrapper')).toBeInTheDocument()
        
        // Check for image
        expect(member.querySelector('.team__image')).toBeInTheDocument()
        
        // Check for overlay with social links
        expect(member.querySelector('.team__overlay')).toBeInTheDocument()
        expect(member.querySelector('.team__social')).toBeInTheDocument()
        
        // Check for info section
        expect(member.querySelector('.team__info')).toBeInTheDocument()
        expect(member.querySelector('.team__name')).toBeInTheDocument()
        expect(member.querySelector('.team__position')).toBeInTheDocument()
        expect(member.querySelector('.team__bio')).toBeInTheDocument()
      })
    })

    it('displays social media links for each team member', () => {
      render(<TeamSection />)
      
      // Check that social links are present for each team member
      const socialLinks = document.querySelectorAll('.team__socialLink')
      expect(socialLinks).toHaveLength(8) // 4 members × 2 social links each
      
      // Check that LinkedIn and Twitter links are present
      const linkedinLinks = document.querySelectorAll('a[aria-label="LinkedIn"]')
      const twitterLinks = document.querySelectorAll('a[aria-label="Twitter"]')
      
      expect(linkedinLinks).toHaveLength(4)
      expect(twitterLinks).toHaveLength(4)
    })
  })

  describe('Accessibility Basics', () => {
    it('has proper heading hierarchy', () => {
      render(<TeamSection />)
      
      // Check that the main heading is an h2
      const heading = screen.getByRole('heading', { level: 2 })
      expect(heading).toBeInTheDocument()
      expect(heading).toHaveTextContent('Meet Our Leadership Team')
      
      // Check that team member names are h3 headings
      const memberNames = screen.getAllByRole('heading', { level: 3 })
      expect(memberNames).toHaveLength(4)
    })

    it('has accessible images with alt text', () => {
      render(<TeamSection />)
      
      // Check that all team member images have proper alt text
      const images = screen.getAllByRole('img')
      expect(images).toHaveLength(4)
      
      expect(screen.getByAltText('Sarah Chen')).toBeInTheDocument()
      expect(screen.getByAltText('Marcus Thompson')).toBeInTheDocument()
      expect(screen.getByAltText('Elena Rodriguez')).toBeInTheDocument()
      expect(screen.getByAltText('David Kim')).toBeInTheDocument()
    })

    it('has accessible social media links', () => {
      render(<TeamSection />)
      
      // Check that social links have proper aria-labels
      const linkedinLinks = screen.getAllByLabelText('LinkedIn')
      const twitterLinks = screen.getAllByLabelText('Twitter')
      
      expect(linkedinLinks).toHaveLength(4)
      expect(twitterLinks).toHaveLength(4)
      
      // Check that all social links are accessible
      linkedinLinks.forEach((link) => {
        expect(link).toHaveAttribute('aria-label', 'LinkedIn')
      })
      
      twitterLinks.forEach((link) => {
        expect(link).toHaveAttribute('aria-label', 'Twitter')
      })
    })

    it('has semantic HTML structure', () => {
      render(<TeamSection />)
      
      // Check that the component uses semantic HTML elements
      const section = document.querySelector('section')
      const headings = document.querySelectorAll('h2, h3')
      const paragraphs = document.querySelectorAll('p')
      
      expect(section).toBeInTheDocument()
      expect(headings.length).toBeGreaterThan(0)
      expect(paragraphs.length).toBeGreaterThan(0)
    })

    it('has proper text content for screen readers', () => {
      render(<TeamSection />)
      
      // Check that all important text content is present and accessible
      expect(screen.getByText('Meet Our Leadership Team')).toBeInTheDocument()
      expect(screen.getByText(/The dedicated individuals who guide our vision/)).toBeInTheDocument()
      
      // Check team member information
      expect(screen.getByText('Sarah Chen')).toBeInTheDocument()
      expect(screen.getByText('Co-Founder & CEO')).toBeInTheDocument()
      expect(screen.getByText(/Sarah has over 15 years of experience/)).toBeInTheDocument()
      
      expect(screen.getByText('Marcus Thompson')).toBeInTheDocument()
      expect(screen.getByText('Co-Founder & COO')).toBeInTheDocument()
      expect(screen.getByText(/Marcus brings operational expertise/)).toBeInTheDocument()
      
      expect(screen.getByText('Elena Rodriguez')).toBeInTheDocument()
      expect(screen.getByText('Customer Experience Director')).toBeInTheDocument()
      expect(screen.getByText(/Elena ensures that every client interaction/)).toBeInTheDocument()
      
      expect(screen.getByText('David Kim')).toBeInTheDocument()
      expect(screen.getByText('Head of Professional Services')).toBeInTheDocument()
      expect(screen.getByText(/David leads our team of service professionals/)).toBeInTheDocument()
    })
  })

  describe('Component Structure', () => {
    it('renders all major sections in correct order', () => {
      render(<TeamSection />)
      
      // Check that all major sections are present in the expected order
      const container = document.querySelector('.team__container')
      expect(container).toBeInTheDocument()
      
      // Check that header comes first
      const header = container?.querySelector('.team__header')
      expect(header).toBeInTheDocument()
      
      // Check that title comes first in header
      const title = header?.querySelector('.team__title')
      expect(title).toBeInTheDocument()
      
      // Check that subtitle comes after title
      const subtitle = header?.querySelector('.team__subtitle')
      expect(subtitle).toBeInTheDocument()
      
      // Check that grid section is present
      const grid = container?.querySelector('.team__grid')
      expect(grid).toBeInTheDocument()
      
      // Check that team members are in the grid
      const members = grid?.querySelectorAll('.team__member')
      expect(members).toHaveLength(4)
    })

    it('maintains responsive design structure', () => {
      render(<TeamSection />)
      
      // Check that the component has the necessary structure for responsive design
      const section = document.querySelector('.team')
      const container = document.querySelector('.team__container')
      const grid = document.querySelector('.team__grid')
      
      expect(section).toBeInTheDocument()
      expect(container).toBeInTheDocument()
      expect(grid).toBeInTheDocument()
      
      // Check that the grid has the proper class for responsive behavior
      expect(grid).toHaveClass('team__grid')
    })

    it('has proper team member card structure', () => {
      render(<TeamSection />)
      
      // Check that each team member card has the complete structure
      const teamMembers = document.querySelectorAll('.team__member')
      expect(teamMembers).toHaveLength(4)
      
      teamMembers.forEach((member) => {
        // Check image wrapper structure
        const imageWrapper = member.querySelector('.team__imageWrapper')
        expect(imageWrapper).toBeInTheDocument()
        
        // Check image structure
        const image = imageWrapper?.querySelector('.team__image')
        expect(image).toBeInTheDocument()
        
        // Check overlay structure
        const overlay = imageWrapper?.querySelector('.team__overlay')
        expect(overlay).toBeInTheDocument()
        
        // Check social links structure
        const social = overlay?.querySelector('.team__social')
        expect(social).toBeInTheDocument()
        
        // Check info structure
        const info = member.querySelector('.team__info')
        expect(info).toBeInTheDocument()
        
        // Check name, position, and bio structure
        expect(info?.querySelector('.team__name')).toBeInTheDocument()
        expect(info?.querySelector('.team__position')).toBeInTheDocument()
        expect(info?.querySelector('.team__bio')).toBeInTheDocument()
      })
    })
  })
}) 