import { render, screen, fireEvent } from '@testing-library/react'
import AdminDashboardLayout from '../AdminDashboardLayout'

// Mock the child components
jest.mock('../SideBar/SideBar', () => {
  return function MockSidebar({ collapsed }: { collapsed: boolean }) {
    return <div data-testid="sidebar" data-collapsed={collapsed}>Sidebar</div>
  }
})

jest.mock('../TopNavigation/TopNavigation', () => {
  return function MockTopNavigation({ toggleSidebar }: { toggleSidebar: () => void }) {
    return (
      <div data-testid="top-navigation">
        <button onClick={toggleSidebar} data-testid="toggle-sidebar">
          Toggle
        </button>
      </div>
    )
  }
})

describe('AdminDashboardLayout', () => {
  const defaultProps = {
    title: 'Test Dashboard',
    children: <div data-testid="dashboard-content">Dashboard Content</div>,
  }

  it('renders the layout with title and children', () => {
    render(<AdminDashboardLayout {...defaultProps} />)
    
    expect(screen.getByText('Test Dashboard')).toBeInTheDocument()
    expect(screen.getByTestId('dashboard-content')).toBeInTheDocument()
    expect(screen.getByTestId('sidebar')).toBeInTheDocument()
    expect(screen.getByTestId('top-navigation')).toBeInTheDocument()
  })

  it('renders breadcrumbs when provided', () => {
    const breadcrumbs = [
      { label: 'Home', path: '/admin' },
      { label: 'Dashboard', path: '/admin/dashboard' },
    ]

    render(<AdminDashboardLayout {...defaultProps} breadcrumbs={breadcrumbs} />)
    
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Dashboard')).toBeInTheDocument()
    expect(screen.getByText('>')).toBeInTheDocument()
  })

  it('does not render breadcrumbs when not provided', () => {
    render(<AdminDashboardLayout {...defaultProps} />)
    
    expect(screen.queryByText('Home')).not.toBeInTheDocument()
    expect(screen.queryByText('>')).not.toBeInTheDocument()
  })

  it('toggles sidebar collapse state', () => {
    render(<AdminDashboardLayout {...defaultProps} />)
    
    const sidebar = screen.getByTestId('sidebar')
    const toggleButton = screen.getByTestId('toggle-sidebar')
    
    // Initially not collapsed
    expect(sidebar).toHaveAttribute('data-collapsed', 'false')
    
    // Toggle to collapsed
    fireEvent.click(toggleButton)
    expect(sidebar).toHaveAttribute('data-collapsed', 'true')
    
    // Toggle back to expanded
    fireEvent.click(toggleButton)
    expect(sidebar).toHaveAttribute('data-collapsed', 'false')
  })

  it('applies correct CSS classes based on sidebar state', () => {
    render(<AdminDashboardLayout {...defaultProps} />)
    
    const mainContent = screen.getByTestId('dashboard-content').closest('.dashboard__main')
    const toggleButton = screen.getByTestId('toggle-sidebar')
    
    // Initially expanded
    expect(mainContent).not.toHaveClass('dashboard__main--expanded')
    
    // Collapse sidebar
    fireEvent.click(toggleButton)
    expect(mainContent).toHaveClass('dashboard__main--expanded')
  })

  it('renders multiple breadcrumb items with separators', () => {
    const breadcrumbs = [
      { label: 'Home', path: '/admin' },
      { label: 'Users', path: '/admin/users' },
      { label: 'Profile', path: '/admin/users/123' },
    ]

    render(<AdminDashboardLayout {...defaultProps} breadcrumbs={breadcrumbs} />)
    
    // Should have 3 links and 2 separators
    expect(screen.getAllByRole('link')).toHaveLength(3)
    expect(screen.getAllByText('>')).toHaveLength(2)
  })

  it('renders breadcrumb links with correct href attributes', () => {
    const breadcrumbs = [
      { label: 'Home', path: '/admin' },
      { label: 'Dashboard', path: '/admin/dashboard' },
    ]

    render(<AdminDashboardLayout {...defaultProps} breadcrumbs={breadcrumbs} />)
    
    const homeLink = screen.getByText('Home')
    const dashboardLink = screen.getByText('Dashboard')
    
    expect(homeLink).toHaveAttribute('href', '/admin')
    expect(dashboardLink).toHaveAttribute('href', '/admin/dashboard')
  })
})