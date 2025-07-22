import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ServiceCatalog from '@/app/_components/ServiceCatalog/ServiceCatalog'

// Mock Next.js Image component since it's not available in Jest environment
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, width, height, className }: any) => (
    <img 
      src={src} 
      alt={alt} 
      width={width} 
      height={height} 
      className={className}
    />
  ),
}))

describe('ServiceCatalog Component', () => {
  const user = userEvent.setup()

  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks()
  })

  describe('Basic Rendering', () => {
    it('renders the service catalog section correctly', () => {
      render(<ServiceCatalog />)
      
      // Check main section exists by looking for the main heading
      expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument()
    })

    it('displays the main title with correct text', () => {
      render(<ServiceCatalog />)
      
      const title = screen.getByRole('heading', { level: 2 })
      expect(title).toBeInTheDocument()
      expect(title).toHaveTextContent('Our catalog')
    })

    it('displays the subtitle text', () => {
      render(<ServiceCatalog />)
      
      const subtitle = screen.getByText(/Select your need and wait for the magic/)
      expect(subtitle).toBeInTheDocument()
    })

    it('renders the categories sidebar', () => {
      render(<ServiceCatalog />)
      
      // Check sidebar title exists
      expect(screen.getByText('Categories')).toBeInTheDocument()
      
      // Check all category options are present
      expect(screen.getByText('Food')).toBeInTheDocument()
      expect(screen.getByText('Cleaning')).toBeInTheDocument()
      expect(screen.getByText('Pest Control')).toBeInTheDocument()
      expect(screen.getByText('Laundry')).toBeInTheDocument()
    })

    it('displays food category items by default', () => {
      render(<ServiceCatalog />)
      
      // Check default food category title
      expect(screen.getByText('Our Delicacies')).toBeInTheDocument()
      
      // Check some food items are displayed
      expect(screen.getByText("Combo's")).toBeInTheDocument()
      expect(screen.getByText('Platters')).toBeInTheDocument()
      expect(screen.getByText('Proteins')).toBeInTheDocument()
    })
  })

  describe('Core Interactions', () => {
    it('allows switching between categories', async () => {
      render(<ServiceCatalog />)
      
      // Initially should show food category
      expect(screen.getByText('Our Delicacies')).toBeInTheDocument()
      
      // Click on Cleaning category
      const cleaningButton = screen.getByText('Cleaning')
      await user.click(cleaningButton)
      
      // Should now show cleaning services
      expect(screen.getByText('Our Cleaning Services')).toBeInTheDocument()
      expect(screen.getByText('Deep Cleaning')).toBeInTheDocument()
      expect(screen.getByText('Regular Cleaning')).toBeInTheDocument()
    })

    it('updates active category styling when clicked', async () => {
      render(<ServiceCatalog />)
      
      // Initially Food should be active
      const foodButton = screen.getByText('Food')
      const cleaningButton = screen.getByText('Cleaning')
      
      // Click on Cleaning
      await user.click(cleaningButton)
      
      // Food should no longer be active, Cleaning should be active
      expect(cleaningButton).toHaveClass('catalog__sidebarItem--active')
    })

    it('displays correct items for each category', async () => {
      render(<ServiceCatalog />)
      
      // Test Food category (default)
      expect(screen.getByText('Our Delicacies')).toBeInTheDocument()
      expect(screen.getByText('Wraps')).toBeInTheDocument()
      expect(screen.getByText('Soups')).toBeInTheDocument()
      
      // Test Cleaning category
      const cleaningButton = screen.getByText('Cleaning')
      await user.click(cleaningButton)
      expect(screen.getByText('Our Cleaning Services')).toBeInTheDocument()
      expect(screen.getByText('Kitchen Cleaning')).toBeInTheDocument()
      expect(screen.getByText('Bathroom Cleaning')).toBeInTheDocument()
      
      // Test Pest Control category
      const pestControlButton = screen.getByText('Pest Control')
      await user.click(pestControlButton)
      expect(screen.getByText('Our Pest Control Services')).toBeInTheDocument()
      expect(screen.getByText('General Pest Control')).toBeInTheDocument()
      expect(screen.getByText('Cockroach Control')).toBeInTheDocument()
      
      // Test Laundry category
      const laundryButton = screen.getByText('Laundry')
      await user.click(laundryButton)
      expect(screen.getByText('Our Laundry Services')).toBeInTheDocument()
      expect(screen.getByText('Wash & Fold')).toBeInTheDocument()
      expect(screen.getByText('Dry Cleaning')).toBeInTheDocument()
    })
  })

  describe('Key Functionality', () => {
    it('renders all category cards with images', () => {
      render(<ServiceCatalog />)
      
      // Check that images are rendered for food items
      const images = screen.getAllByRole('img')
      expect(images.length).toBeGreaterThan(0)
      
      // Check specific food item images
      const comboImage = screen.getByAltText("Combo's")
      const platterImage = screen.getByAltText('Platters')
      expect(comboImage).toBeInTheDocument()
      expect(platterImage).toBeInTheDocument()
    })

    it('maintains state correctly when switching categories', async () => {
      render(<ServiceCatalog />)
      
      // Start with Food category
      expect(screen.getByText('Our Delicacies')).toBeInTheDocument()
      
      // Switch to Cleaning
      await user.click(screen.getByText('Cleaning'))
      expect(screen.getByText('Our Cleaning Services')).toBeInTheDocument()
      
      // Switch back to Food
      await user.click(screen.getByText('Food'))
      expect(screen.getByText('Our Delicacies')).toBeInTheDocument()
      expect(screen.getByText("Combo's")).toBeInTheDocument()
    })

    it('displays correct number of items for each category', () => {
      render(<ServiceCatalog />)
      
      // Food category should have 6 items
      const foodItems = screen.getAllByText(/Combo's|Platters|Proteins|Wraps|Soups|Drinks/)
      expect(foodItems).toHaveLength(6)
    })
  })

  describe('Accessibility Basics', () => {
    it('has proper heading structure', () => {
      render(<ServiceCatalog />)
      
      // Main heading (h2)
      const mainHeading = screen.getByRole('heading', { level: 2 })
      expect(mainHeading).toBeInTheDocument()
      expect(mainHeading).toHaveTextContent('Our catalog')
      
      // Check that h3 headings exist (there are multiple - sidebar and main content)
      const h3Headings = screen.getAllByRole('heading', { level: 3 })
      expect(h3Headings).toHaveLength(2) // Sidebar title and main content title
      
      // Check sidebar heading specifically
      const sidebarHeading = screen.getByText('Categories')
      expect(sidebarHeading).toBeInTheDocument()
    })

    it('provides proper alt text for images', () => {
      render(<ServiceCatalog />)
      
      // Check that images have meaningful alt text
      const images = screen.getAllByRole('img')
      images.forEach(img => {
        expect(img).toHaveAttribute('alt')
        expect(img.getAttribute('alt')).not.toBe('')
      })
    })

    it('uses semantic HTML elements', () => {
      render(<ServiceCatalog />)
      
      // Check for semantic elements - the component uses ul/li for categories
      expect(screen.getByRole('list')).toBeInTheDocument() // ul element
      expect(screen.getAllByRole('listitem')).toHaveLength(4) // 4 category items
    })

    it('category items are clickable and interactive', async () => {
      render(<ServiceCatalog />)
      
      // Check that category items are present and can be interacted with
      const foodButton = screen.getByText('Food')
      const cleaningButton = screen.getByText('Cleaning')
      
      // Verify they are clickable elements
      expect(foodButton).toBeInTheDocument()
      expect(cleaningButton).toBeInTheDocument()
      
      // Test interaction by clicking cleaning button
      await user.click(cleaningButton)
      expect(screen.getByText('Our Cleaning Services')).toBeInTheDocument()
    })
  })
}) 