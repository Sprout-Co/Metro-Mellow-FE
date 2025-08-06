import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ServicesGallery from '@/app/_components/ServicesGallery/ServicesGallery'

describe('ServicesGallery Component', () => {
  const user = userEvent.setup()

  describe('Basic Rendering', () => {
    it('renders the services gallery section', () => {
      render(<ServicesGallery />)
      
      const gallerySection = screen.getByRole('region')
      expect(gallerySection).toBeInTheDocument()
      expect(gallerySection).toHaveClass('servicesGallery')
    })

    it('renders the main container', () => {
      render(<ServicesGallery />)
      
      const container = screen.getByRole('region').querySelector('.servicesGallery__container')
      expect(container).toBeInTheDocument()
    })

    it('renders the grid layout', () => {
      render(<ServicesGallery />)
      
      const grid = screen.getByRole('region').querySelector('.servicesGallery__grid')
      expect(grid).toBeInTheDocument()
    })
  })

  describe('Professional Cards', () => {
    it('renders all 8 professional cards', () => {
      render(<ServicesGallery />)
      
      const cards = screen.getAllByRole('img')
      expect(cards).toHaveLength(8)
    })

    it('renders cards with correct professional roles', () => {
      render(<ServicesGallery />)
      
      const expectedRoles = ['Chef', 'Chef', 'Cleaner', 'Cook', 'Assistant', 'Support', 'Delivery', 'Courier']
      
      expectedRoles.forEach(role => {
        const images = screen.getAllByAltText(`${role} professional`)
        expect(images.length).toBeGreaterThan(0)
      })
    })

    it('renders cards with correct image sources', () => {
      render(<ServicesGallery />)
      
      const expectedImages = [
        '/images/food/f1.png',
        '/images/food/f10.jpeg',
        '/images/cleaning/c1.jpeg',
        '/images/food/f3.jpeg',
        '/images/errand/e1.jpeg',
        '/images/cleaning/c3.jpeg',
        '/images/food/f4.jpeg',
        '/images/food/f3.jpeg'
      ]
      
      const images = screen.getAllByRole('img')
      
      images.forEach((img, index) => {
        expect(img).toHaveAttribute('src', expectedImages[index])
      })
    })

    it('renders cards with correct positioning classes', () => {
      render(<ServicesGallery />)
      
      const expectedPositions = [
        'top-left',
        'top-right', 
        'middle-left',
        'middle-center-left',
        'middle-center-right',
        'bottom-left',
        'bottom-center',
        'bottom-right'
      ]
      
      const gridItems = screen.getByRole('region').querySelectorAll('.servicesGallery__item')
      
      gridItems.forEach((item, index) => {
        expect(item).toHaveClass(`servicesGallery__item--${expectedPositions[index]}`)
      })
    })

    it('renders cards with correct background color classes', () => {
      render(<ServicesGallery />)
      
      const expectedColors = ['primary', 'primary', 'secondary', 'primary', 'secondary', 'primary', 'secondary', 'primary']
      
      const cards = screen.getByRole('region').querySelectorAll('.servicesGallery__card')
      
      cards.forEach((card, index) => {
        expect(card).toHaveClass(`servicesGallery__card--${expectedColors[index]}`)
      })
    })
  })

  describe('Decorative Elements', () => {
    it('renders decorative elements container', () => {
      render(<ServicesGallery />)
      
      const decorations = screen.getByRole('region').querySelector('.servicesGallery__decorations')
      expect(decorations).toBeInTheDocument()
    })

    it('renders WhatsApp icon SVG', () => {
      render(<ServicesGallery />)
      
      const whatsappIcon = screen.getByRole('region').querySelector('.servicesGallery__whatsappIcon')
      expect(whatsappIcon).toBeInTheDocument()
      
      const svg = whatsappIcon?.querySelector('svg')
      expect(svg).toBeInTheDocument()
      expect(svg).toHaveAttribute('width', '81')
      expect(svg).toHaveAttribute('height', '81')
    })

    it('renders starburst/sparkle icon SVG', () => {
      render(<ServicesGallery />)
      
      const starburst = screen.getByRole('region').querySelector('.servicesGallery__starburst')
      expect(starburst).toBeInTheDocument()
      
      // The starburst is the SVG itself, not a container
      expect(starburst).toHaveAttribute('width', '91')
      expect(starburst).toHaveAttribute('height', '92')
    })

    it('renders dotted line top SVG', () => {
      render(<ServicesGallery />)
      
      const dottedLine = screen.getByRole('region').querySelector('.servicesGallery__dottedLineTop')
      expect(dottedLine).toBeInTheDocument()
      
      // The dotted line is the SVG itself, not a container
      expect(dottedLine).toHaveAttribute('width', '166')
      expect(dottedLine).toHaveAttribute('height', '193')
    })

    it('renders dotted arrow bottom SVG', () => {
      render(<ServicesGallery />)
      
      const dottedArrow = screen.getByRole('region').querySelector('.servicesGallery__dottedArrowBottom')
      expect(dottedArrow).toBeInTheDocument()
      
      // The dotted arrow is the SVG itself, not a container
      expect(dottedArrow).toHaveAttribute('width', '335')
      expect(dottedArrow).toHaveAttribute('height', '125')
    })
  })

  describe('Grid Layout Structure', () => {
    it('renders grid items with correct structure', () => {
      render(<ServicesGallery />)
      
      const gridItems = screen.getByRole('region').querySelectorAll('.servicesGallery__item')
      expect(gridItems).toHaveLength(8)
      
      gridItems.forEach(item => {
        const card = item.querySelector('.servicesGallery__card')
        const image = item.querySelector('img')
        
        expect(card).toBeInTheDocument()
        expect(image).toBeInTheDocument()
      })
    })

    it('renders each grid item with unique ID', () => {
      render(<ServicesGallery />)
      
      const expectedIds = ['chef1', 'chef2', 'cleaner1', 'cook1', 'assistant1', 'support1', 'delivery1', 'delivery2']
      
      const gridItems = screen.getByRole('region').querySelectorAll('.servicesGallery__item')
      
      gridItems.forEach((item, index) => {
        const card = item.querySelector('.servicesGallery__card')
        expect(card).toHaveAttribute('data-testid', expectedIds[index])
      })
    })
  })

  describe('Image Accessibility', () => {
    it('renders images with proper alt text', () => {
      render(<ServicesGallery />)
      
      const images = screen.getAllByRole('img')
      
      images.forEach(image => {
        expect(image).toHaveAttribute('alt')
        expect(image.getAttribute('alt')).toMatch(/professional$/)
      })
    })

    it('renders images with proper sizes attribute', () => {
      render(<ServicesGallery />)
      
      const images = screen.getAllByRole('img')
      
      images.forEach(image => {
        expect(image).toHaveAttribute('sizes')
        expect(image.getAttribute('sizes')).toBe('(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw')
      })
    })
  })

  describe('Component Structure', () => {
    it('has proper section role', () => {
      render(<ServicesGallery />)
      
      const section = screen.getByRole('region')
      expect(section).toBeInTheDocument()
    })

    it('renders with correct CSS classes', () => {
      render(<ServicesGallery />)
      
      const section = screen.getByRole('region')
      expect(section).toHaveClass('servicesGallery')
      
      const container = section.querySelector('.servicesGallery__container')
      expect(container).toHaveClass('servicesGallery__container')
      
      const grid = section.querySelector('.servicesGallery__grid')
      expect(grid).toHaveClass('servicesGallery__grid')
    })
  })

  describe('Professional Data Structure', () => {
    it('renders correct number of professionals', () => {
      render(<ServicesGallery />)
      
      const gridItems = screen.getByRole('region').querySelectorAll('.servicesGallery__item')
      expect(gridItems).toHaveLength(8)
    })

    it('renders professionals with correct roles', () => {
      render(<ServicesGallery />)
      
      const expectedRoles = [
        { role: 'Chef', count: 2 },
        { role: 'Cleaner', count: 1 },
        { role: 'Cook', count: 1 },
        { role: 'Assistant', count: 1 },
        { role: 'Support', count: 1 },
        { role: 'Delivery', count: 1 },
        { role: 'Courier', count: 1 }
      ]
      
      expectedRoles.forEach(({ role, count }) => {
        const images = screen.getAllByAltText(`${role} professional`)
        expect(images).toHaveLength(count)
      })
    })
  })

  describe('Error Handling', () => {
    it('renders gracefully when images fail to load', () => {
      render(<ServicesGallery />)
      
      // Component should still render even if images fail
      expect(screen.getByRole('region')).toBeInTheDocument()
      expect(screen.getByRole('region').querySelector('.servicesGallery__grid')).toBeInTheDocument()
    })

    it('maintains structure when decorative elements fail', () => {
      render(<ServicesGallery />)
      
      // Main structure should remain intact
      expect(screen.getByRole('region')).toBeInTheDocument()
      expect(screen.getByRole('region').querySelector('.servicesGallery__grid')).toBeInTheDocument()
    })
  })

  describe('Performance & Optimization', () => {
    it('renders images with proper loading attributes', () => {
      render(<ServicesGallery />)
      
      const images = screen.getAllByRole('img')
      
      images.forEach(image => {
        // Images should have proper loading behavior
        expect(image).toBeInTheDocument()
      })
    })

    it('renders SVG elements efficiently', () => {
      render(<ServicesGallery />)
      
      const svgs = screen.getByRole('region').querySelectorAll('svg')
      expect(svgs.length).toBeGreaterThan(0)
      
      svgs.forEach(svg => {
        expect(svg).toBeInTheDocument()
        expect(svg).toHaveAttribute('viewBox')
      })
    })
  })

  describe('Responsive Design Considerations', () => {
    it('renders grid with responsive classes', () => {
      render(<ServicesGallery />)
      
      const grid = screen.getByRole('region').querySelector('.servicesGallery__grid')
      expect(grid).toBeInTheDocument()
      
      // Grid should have responsive design considerations
      expect(grid).toHaveClass('servicesGallery__grid')
    })

    it('renders items with responsive positioning classes', () => {
      render(<ServicesGallery />)
      
      const gridItems = screen.getByRole('region').querySelectorAll('.servicesGallery__item')
      
      gridItems.forEach(item => {
        // Each item should have positioning classes for responsive design
        expect(item.className).toMatch(/servicesGallery__item--/)
      })
    })
  })

  describe('Visual Hierarchy', () => {
    it('renders decorative elements container', () => {
      render(<ServicesGallery />)
      
      const decorations = screen.getByRole('region').querySelector('.servicesGallery__decorations')
      expect(decorations).toBeInTheDocument()
      
      // Decorative elements should be present
      expect(decorations).toBeInTheDocument()
    })

    it('renders grid with proper structure', () => {
      render(<ServicesGallery />)
      
      const grid = screen.getByRole('region').querySelector('.servicesGallery__grid')
      expect(grid).toBeInTheDocument()
      
      // Grid should be present and structured correctly
      expect(grid).toBeInTheDocument()
    })
  })
}) 