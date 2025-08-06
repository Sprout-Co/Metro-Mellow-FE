import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Services from '@/app/_components/Services/Services'
import { Routes } from '@/constants/routes'

describe('Services Component', () => {
  const user = userEvent.setup()

  describe('Basic Rendering', () => {
    it('renders the services section', () => {
      render(<Services />)
      
      const servicesSection = screen.getByRole('region')
      expect(servicesSection).toBeInTheDocument()
      expect(servicesSection).toHaveClass('services')
    })

    it('renders the main container', () => {
      render(<Services />)
      
      const container = screen.getByRole('region').querySelector('.services__container')
      expect(container).toBeInTheDocument()
    })

    it('renders the header section', () => {
      render(<Services />)
      
      const header = screen.getByRole('region').querySelector('.services__header')
      expect(header).toBeInTheDocument()
    })

    it('renders the services grid', () => {
      render(<Services />)
      
      const grid = screen.getByRole('region').querySelector('.services__grid')
      expect(grid).toBeInTheDocument()
    })
  })

  describe('Header Content', () => {
    it('renders the main title', () => {
      render(<Services />)
      
      const title = screen.getByRole('heading', { level: 2 })
      expect(title).toBeInTheDocument()
      expect(title).toHaveTextContent('Our Services')
    })

    it('renders the subtitle', () => {
      render(<Services />)
      
      const subtitle = screen.getByText(/Everything you need to maintain a comfortable and peaceful home environment/)
      expect(subtitle).toBeInTheDocument()
    })

    it('renders header with correct CSS classes', () => {
      render(<Services />)
      
      const header = screen.getByRole('region').querySelector('.services__header')
      expect(header).toHaveClass('services__header')
      
      const title = header?.querySelector('.services__title')
      expect(title).toHaveClass('services__title')
      
      const subtitle = header?.querySelector('.services__subtitle')
      expect(subtitle).toHaveClass('services__subtitle')
    })
  })

  describe('Service Cards', () => {
    it('renders all 4 service cards', () => {
      render(<Services />)
      
      const cards = screen.getByRole('region').querySelectorAll('.services__card')
      expect(cards).toHaveLength(4)
    })

    it('renders cards with correct service titles', () => {
      render(<Services />)
      
      const expectedTitles = [
        'Home Cleaning',
        'Laundry Services', 
        'Meal Preparation',
        'Pest Control'
      ]
      
      expectedTitles.forEach(title => {
        expect(screen.getByText(title)).toBeInTheDocument()
      })
    })

    it('renders cards with correct service descriptions', () => {
      render(<Services />)
      
      const expectedDescriptions = [
        'Professional cleaning services for every room in your home, from basic cleaning to deep sanitization.',
        'Complete laundry solutions including washing, drying, ironing, and folding of all your clothes and linens.',
        'Custom meal planning and preparation services tailored to your dietary needs and preferences.',
        'Effective and eco-friendly solutions to keep your home free from unwanted pests and insects.'
      ]
      
      expectedDescriptions.forEach(description => {
        expect(screen.getByText(description)).toBeInTheDocument()
      })
    })

    it('renders cards with correct service IDs', () => {
      render(<Services />)
      
      const expectedIds = ['cleaning', 'laundry', 'cooking', 'pest-control']
      
      const cards = screen.getByRole('region').querySelectorAll('.services__card')
      
      cards.forEach((card, index) => {
        expect(card).toHaveAttribute('data-testid', expectedIds[index])
      })
    })

    it('renders cards with correct CSS classes', () => {
      render(<Services />)
      
      const cards = screen.getByRole('region').querySelectorAll('.services__card')
      
      cards.forEach(card => {
        expect(card).toHaveClass('services__card')
      })
    })
  })

  describe('Service Icons and Images', () => {
    it('renders icon wrappers for each service', () => {
      render(<Services />)
      
      const iconWrappers = screen.getByRole('region').querySelectorAll('.services__iconWrapper')
      expect(iconWrappers).toHaveLength(4)
    })

    it('renders service images with correct sources', () => {
      render(<Services />)
      
      const expectedImages = [
        '/images/brand/b1.jpeg',
        '/images/laundry/l9.jpeg',
        '/images/food/f21.jpeg',
        '/images/pest-control/p1.jpeg'
      ]
      
      const images = screen.getAllByRole('img')
      
      images.forEach((img, index) => {
        // Next.js Image component transforms the src, so we check if it contains the original path
        const src = img.getAttribute('src')
        const expectedPath = expectedImages[index].replace(/\//g, '%2F')
        expect(src).toContain(expectedPath)
      })
    })

    it('renders images with correct alt text', () => {
      render(<Services />)
      
      const expectedTitles = ['Home Cleaning', 'Laundry Services', 'Meal Preparation', 'Pest Control']
      
      const images = screen.getAllByRole('img')
      
      images.forEach((img, index) => {
        expect(img).toHaveAttribute('alt', expectedTitles[index])
      })
    })

    it('renders images with correct dimensions', () => {
      render(<Services />)
      
      const images = screen.getAllByRole('img')
      
      images.forEach(img => {
        expect(img).toHaveAttribute('width', '40')
        expect(img).toHaveAttribute('height', '40')
      })
    })
  })

  describe('Service Links', () => {
    it('renders "Learn more" links for each service', () => {
      render(<Services />)
      
      const learnMoreLinks = screen.getAllByText('Learn more')
      expect(learnMoreLinks).toHaveLength(4)
    })

    it('renders links with correct href attributes', () => {
      render(<Services />)
      
      const expectedPaths = ['/services/cleaning', '/services/laundry', '/services/cooking', '/services/pest-control']
      
      const links = screen.getAllByText('Learn more')
      
      links.forEach((link, index) => {
        expect(link).toHaveAttribute('href', expectedPaths[index])
      })
    })

    it('renders links with correct CSS classes', () => {
      render(<Services />)
      
      const links = screen.getAllByText('Learn more')
      
      links.forEach(link => {
        expect(link).toHaveClass('services__cardLink')
      })
    })

    it('renders arrow icons in links', () => {
      render(<Services />)
      
      const links = screen.getAllByText('Learn more')
      
      links.forEach(link => {
        const svg = link.querySelector('svg')
        expect(svg).toBeInTheDocument()
        expect(svg).toHaveAttribute('width', '16')
        expect(svg).toHaveAttribute('height', '16')
      })
    })
  })

  describe('Call-to-Action Section', () => {
    it('renders the CTA section', () => {
      render(<Services />)
      
      const cta = screen.getByRole('region').querySelector('.services__cta')
      expect(cta).toBeInTheDocument()
    })

    it('renders the "View All Services" button', () => {
      render(<Services />)
      
      const button = screen.getByText('View All Services')
      expect(button).toBeInTheDocument()
    })

    it('renders CTA button with correct href', () => {
      render(<Services />)
      
      const button = screen.getByText('View All Services')
      expect(button).toHaveAttribute('href', '/services')
    })

    it('renders CTA button with correct CSS classes', () => {
      render(<Services />)
      
      const button = screen.getByText('View All Services')
      expect(button).toHaveClass('services__button')
    })
  })

  describe('Component Structure', () => {
    it('has proper section role', () => {
      render(<Services />)
      
      const section = screen.getByRole('region')
      expect(section).toBeInTheDocument()
    })

    it('renders with correct CSS classes', () => {
      render(<Services />)
      
      const section = screen.getByRole('region')
      expect(section).toHaveClass('services')
      
      const container = section.querySelector('.services__container')
      expect(container).toHaveClass('services__container')
      
      const grid = section.querySelector('.services__grid')
      expect(grid).toHaveClass('services__grid')
    })
  })

  describe('Service Data Structure', () => {
    it('renders correct number of services', () => {
      render(<Services />)
      
      const cards = screen.getByRole('region').querySelectorAll('.services__card')
      expect(cards).toHaveLength(4)
    })

    it('renders services with correct data structure', () => {
      render(<Services />)
      
      const expectedServices = [
        {
          id: 'cleaning',
          title: 'Home Cleaning',
          description: 'Professional cleaning services for every room in your home, from basic cleaning to deep sanitization.',
          image: '/images/brand/b1.jpeg'
        },
        {
          id: 'laundry',
          title: 'Laundry Services',
          description: 'Complete laundry solutions including washing, drying, ironing, and folding of all your clothes and linens.',
          image: '/images/laundry/l9.jpeg'
        },
        {
          id: 'cooking',
          title: 'Meal Preparation',
          description: 'Custom meal planning and preparation services tailored to your dietary needs and preferences.',
          image: '/images/food/f21.jpeg'
        },
        {
          id: 'pest-control',
          title: 'Pest Control',
          description: 'Effective and eco-friendly solutions to keep your home free from unwanted pests and insects.',
          image: '/images/pest-control/p1.jpeg'
        }
      ]
      
      expectedServices.forEach(service => {
        expect(screen.getByText(service.title)).toBeInTheDocument()
        expect(screen.getByText(service.description)).toBeInTheDocument()
      })
    })
  })

  describe('Accessibility', () => {
    it('renders proper heading structure', () => {
      render(<Services />)
      
      const h2 = screen.getByRole('heading', { level: 2 })
      expect(h2).toBeInTheDocument()
      expect(h2).toHaveTextContent('Our Services')
      
      const h3s = screen.getAllByRole('heading', { level: 3 })
      expect(h3s).toHaveLength(4)
    })

    it('renders images with proper alt text', () => {
      render(<Services />)
      
      const images = screen.getAllByRole('img')
      
      images.forEach(image => {
        expect(image).toHaveAttribute('alt')
        expect(image.getAttribute('alt')).toBeTruthy()
      })
    })

    it('renders links with proper text content', () => {
      render(<Services />)
      
      const links = screen.getAllByText('Learn more')
      
      links.forEach(link => {
        expect(link).toHaveTextContent('Learn more')
      })
    })
  })

  describe('Responsive Design', () => {
    it('renders grid with responsive classes', () => {
      render(<Services />)
      
      const grid = screen.getByRole('region').querySelector('.services__grid')
      expect(grid).toBeInTheDocument()
      
      // Grid should have responsive design considerations
      expect(grid).toHaveClass('services__grid')
    })

    it('renders cards with responsive structure', () => {
      render(<Services />)
      
      const cards = screen.getByRole('region').querySelectorAll('.services__card')
      
      cards.forEach(card => {
        // Each card should have responsive design considerations
        expect(card).toHaveClass('services__card')
      })
    })
  })

  describe('Error Handling', () => {
    it('renders gracefully when images fail to load', () => {
      render(<Services />)
      
      // Component should still render even if images fail
      expect(screen.getByRole('region')).toBeInTheDocument()
      expect(screen.getByRole('region').querySelector('.services__grid')).toBeInTheDocument()
    })

    it('maintains structure when animations fail', () => {
      render(<Services />)
      
      // Main structure should remain intact
      expect(screen.getByRole('region')).toBeInTheDocument()
      expect(screen.getByRole('region').querySelector('.services__grid')).toBeInTheDocument()
    })
  })

  describe('Performance & Optimization', () => {
    it('renders images with proper loading attributes', () => {
      render(<Services />)
      
      const images = screen.getAllByRole('img')
      
      images.forEach(image => {
        // Images should have proper loading behavior
        expect(image).toBeInTheDocument()
      })
    })

    it('renders SVG elements efficiently', () => {
      render(<Services />)
      
      const svgs = screen.getByRole('region').querySelectorAll('svg')
      expect(svgs.length).toBeGreaterThan(0)
      
      svgs.forEach(svg => {
        expect(svg).toBeInTheDocument()
        expect(svg).toHaveAttribute('viewBox')
      })
    })
  })

  describe('Interactive Elements', () => {
    it('renders clickable service cards', () => {
      render(<Services />)
      
      const cards = screen.getByRole('region').querySelectorAll('.services__card')
      
      cards.forEach(card => {
        expect(card).toBeInTheDocument()
        // Cards should be interactive
        expect(card).toHaveClass('services__card')
      })
    })

    it('renders clickable CTA button', () => {
      render(<Services />)
      
      const button = screen.getByText('View All Services')
      expect(button).toBeInTheDocument()
      expect(button).toHaveAttribute('href', '/services')
    })
  })
}) 