import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import MobileAppPromoSection from '@/app/_components/MobileAppPromoSection/MobileAppPromoSection'

describe('MobileAppPromoSection Component', () => {
  const user = userEvent.setup()

  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks()
  })

  describe('Basic Rendering', () => {
    it('renders the mobile app promo section correctly', () => {
      render(<MobileAppPromoSection />)
      
      // Check section exists with proper semantic structure
      const section = document.querySelector('section')
      expect(section).toBeInTheDocument()
    })

    it('displays the main heading with correct text', () => {
      render(<MobileAppPromoSection />)
      
      const heading = screen.getByRole('heading', { level: 2 })
      expect(heading).toBeInTheDocument()
      expect(heading).toHaveTextContent('It gets even better with our mobile App')
    })

    it('displays the description text', () => {
      render(<MobileAppPromoSection />)
      
      const description = screen.getByText(/We're the spark that turns your chaos into calm/)
      expect(description).toBeInTheDocument()
    })

    it('renders the mobile app image', () => {
      render(<MobileAppPromoSection />)
      
      const image = screen.getByAltText('Metromellow mobile app on iPhone')
      expect(image).toBeInTheDocument()
      expect(image).toHaveAttribute('src', '/images/home/iphone.jpeg')
    })
  })

  describe('Core Interactions', () => {
    it('renders download app button', () => {
      render(<MobileAppPromoSection />)
      
      const downloadButton = screen.getByText('Download the app')
      expect(downloadButton).toBeInTheDocument()
      // Button type is not explicitly set, so we just check it exists
      expect(downloadButton).toBeInTheDocument()
    })

    it('renders iOS download button', () => {
      render(<MobileAppPromoSection />)
      
      const iosButton = screen.getByText('IOS DOWNLOAD')
      expect(iosButton).toBeInTheDocument()
      // Button type is not explicitly set, so we just check it exists
      expect(iosButton).toBeInTheDocument()
    })

    it('allows clicking on download app button', async () => {
      render(<MobileAppPromoSection />)
      
      const downloadButton = screen.getByText('Download the app')
      expect(downloadButton).not.toBeDisabled()
      
      // Test button is clickable (no error should occur)
      await user.click(downloadButton)
      expect(downloadButton).toBeInTheDocument()
    })

    it('allows clicking on iOS download button', async () => {
      render(<MobileAppPromoSection />)
      
      const iosButton = screen.getByText('IOS DOWNLOAD')
      expect(iosButton).not.toBeDisabled()
      
      // Test button is clickable (no error should occur)
      await user.click(iosButton)
      expect(iosButton).toBeInTheDocument()
    })
  })

  describe('Key Functionality', () => {
    it('displays both buttons in the buttons container', () => {
      render(<MobileAppPromoSection />)
      
      const downloadButton = screen.getByText('Download the app')
      const iosButton = screen.getByText('IOS DOWNLOAD')
      
      // Both buttons should be present
      expect(downloadButton).toBeInTheDocument()
      expect(iosButton).toBeInTheDocument()
      
      // Check that both buttons exist in the same parent container
      const buttonsContainer = downloadButton.closest('.app-promo__buttons')
      expect(buttonsContainer).toBeInTheDocument()
      expect(buttonsContainer).toContainElement(iosButton)
    })

    it('displays content and image sections', () => {
      render(<MobileAppPromoSection />)
      
      // Content section should contain heading and description
      const heading = screen.getByRole('heading', { level: 2 })
      const description = screen.getByText(/We're the spark that turns your chaos into calm/)
      
      // Image section should contain the phone image
      const image = screen.getByAltText('Metromellow mobile app on iPhone')
      
      expect(heading).toBeInTheDocument()
      expect(description).toBeInTheDocument()
      expect(image).toBeInTheDocument()
    })

    it('renders with proper image dimensions', () => {
      render(<MobileAppPromoSection />)
      
      const image = screen.getByAltText('Metromellow mobile app on iPhone')
      expect(image).toHaveAttribute('width', '350')
      expect(image).toHaveAttribute('height', '700')
    })
  })

  describe('Accessibility Basics', () => {
    it('has proper heading hierarchy', () => {
      render(<MobileAppPromoSection />)
      
      const heading = screen.getByRole('heading', { level: 2 })
      expect(heading).toBeInTheDocument()
    })

    it('has accessible image with alt text', () => {
      render(<MobileAppPromoSection />)
      
      const image = screen.getByAltText('Metromellow mobile app on iPhone')
      expect(image).toBeInTheDocument()
      expect(image).toHaveAttribute('alt', 'Metromellow mobile app on iPhone')
    })

    it('has accessible buttons with proper text content', () => {
      render(<MobileAppPromoSection />)
      
      const downloadButton = screen.getByText('Download the app')
      const iosButton = screen.getByText('IOS DOWNLOAD')
      
      expect(downloadButton).toBeInTheDocument()
      expect(iosButton).toBeInTheDocument()
      
      // Buttons should have meaningful text content
      expect(downloadButton.textContent).toBeTruthy()
      expect(iosButton.textContent).toBeTruthy()
    })

    it('maintains semantic HTML structure', () => {
      render(<MobileAppPromoSection />)
      
      // Check for proper section element
      const section = document.querySelector('section')
      expect(section).toBeInTheDocument()
      
      // Check for proper heading element
      const heading = screen.getByRole('heading', { level: 2 })
      expect(heading).toBeInTheDocument()
      
      // Check for proper image element
      const image = screen.getByAltText('Metromellow mobile app on iPhone')
      expect(image).toBeInTheDocument()
    })
  })
}) 