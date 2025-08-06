import { render, screen } from '@testing-library/react'
import DashboardPage from '../page'

// Mock the components
jest.mock('../../_components/AdminDashboardLayout/AdminDashboardLayout', () => {
  return function MockAdminDashboardLayout({ 
    children, 
    title, 
    breadcrumbs 
  }: { 
    children: React.ReactNode
    title: string
    breadcrumbs: Array<{ label: string; path: string }>
  }) {
    return (
      <div data-testid="admin-layout">
        <h1 data-testid="layout-title">{title}</h1>
        <div data-testid="breadcrumbs">
          {breadcrumbs.map(bc => bc.label).join(' > ')}
        </div>
        {children}
      </div>
    )
  }
})

jest.mock('../../_components/UI/MetricCard/MetricCard', () => {
  return function MockMetricCard({ 
    title, 
    value, 
    icon, 
    progress, 
    color 
  }: { 
    title: string
    value: string
    icon: string
    progress: { current: number; total: number; label: string }
    color: string
  }) {
    return (
      <div data-testid="metric-card" data-color={color}>
        <h3>{title}</h3>
        <p>{value}</p>
        <span>{icon}</span>
        <div data-testid="progress">
          {progress.current}/{progress.total} - {progress.label}
        </div>
      </div>
    )
  }
})

jest.mock('../../_components/UI/ServicePerformance/ServicePerformance', () => {
  return function MockServicePerformance({ serviceData }: { serviceData: any }) {
    return (
      <div data-testid="service-performance">
        Service Performance Chart
        <div data-testid="chart-labels">{serviceData.labels.join(', ')}</div>
      </div>
    )
  }
})

jest.mock('../../_components/UI/RevenueMetrics/RevenueMetrics', () => {
  return function MockRevenueMetrics({ 
    revenue, 
    percentageIncrease 
  }: { 
    revenue: number
    percentageIncrease: number
  }) {
    return (
      <div data-testid="revenue-metrics">
        Revenue: ${revenue}, Increase: {percentageIncrease}%
      </div>
    )
  }
})

jest.mock('../../_components/UI/RecentBookings/RecentBookings', () => {
  return function MockRecentBookings({ bookings }: { bookings: any[] }) {
    return (
      <div data-testid="recent-bookings">
        Recent Bookings ({bookings.length})
        {bookings.map((booking, index) => (
          <div key={index} data-testid={`booking-${booking.id}`}>
            {booking.service.name} - {booking.customer.name}
          </div>
        ))}
      </div>
    )
  }
})

describe('DashboardPage', () => {
  it('renders the dashboard with correct title and breadcrumbs', () => {
    render(<DashboardPage />)
    
    expect(screen.getByTestId('layout-title')).toHaveTextContent('Dashboard')
    expect(screen.getByTestId('breadcrumbs')).toHaveTextContent('Home > Dashboard')
  })

  it('renders all metric cards with correct data', () => {
    render(<DashboardPage />)
    
    const metricCards = screen.getAllByTestId('metric-card')
    expect(metricCards).toHaveLength(4)

    // Check specific metrics
    expect(screen.getByText('Bookings Completed')).toBeInTheDocument()
    expect(screen.getByText('24/38')).toBeInTheDocument()
    expect(screen.getByText('Leads Converted')).toBeInTheDocument()
    expect(screen.getByText('32/45')).toBeInTheDocument()
    expect(screen.getByText('Projects In Progress')).toBeInTheDocument()
    expect(screen.getByText('12/20')).toBeInTheDocument()
    expect(screen.getByText('Customer Satisfaction')).toBeInTheDocument()
    expect(screen.getByText('72.4%')).toBeInTheDocument()
  })

  it('renders metric cards with correct colors', () => {
    render(<DashboardPage />)
    
    const metricCards = screen.getAllByTestId('metric-card')
    
    expect(metricCards[0]).toHaveAttribute('data-color', 'primary')
    expect(metricCards[1]).toHaveAttribute('data-color', 'secondary')
    expect(metricCards[2]).toHaveAttribute('data-color', 'success')
    expect(metricCards[3]).toHaveAttribute('data-color', 'info')
  })

  it('renders service performance chart with correct data', () => {
    render(<DashboardPage />)
    
    expect(screen.getByTestId('service-performance')).toBeInTheDocument()
    
    const chartLabels = screen.getByTestId('chart-labels')
    expect(chartLabels).toHaveTextContent('Jan, Feb, Mar, Apr, May, Jun, Jul, Aug, Sep, Oct, Nov, Dec')
  })

  it('renders revenue metrics with correct values', () => {
    render(<DashboardPage />)
    
    const revenueMetrics = screen.getByTestId('revenue-metrics')
    expect(revenueMetrics).toHaveTextContent('Revenue: $32642, Increase: 18%')
  })

  it('renders recent bookings section', () => {
    render(<DashboardPage />)
    
    const recentBookings = screen.getByTestId('recent-bookings')
    expect(recentBookings).toHaveTextContent('Recent Bookings (3)')
    
    // Check individual bookings
    expect(screen.getByTestId('booking-1')).toHaveTextContent('House Cleaning - Sarah Johnson')
    expect(screen.getByTestId('booking-2')).toHaveTextContent('Laundry Service - Michael Davis')
    expect(screen.getByTestId('booking-3')).toHaveTextContent('Cooking Service - Emily Wilson')
  })

  it('displays correct progress data for metrics', () => {
    render(<DashboardPage />)
    
    const progressElements = screen.getAllByTestId('progress')
    
    expect(progressElements[0]).toHaveTextContent('24/38 - Bookings Completed')
    expect(progressElements[1]).toHaveTextContent('32/45 - Leads Converted')
    expect(progressElements[2]).toHaveTextContent('12/20 - Projects In Progress')
    expect(progressElements[3]).toHaveTextContent('72.4/100 - Customer Satisfaction')
  })

  it('renders all dashboard sections', () => {
    render(<DashboardPage />)
    
    // Check that all main sections are present
    expect(screen.getByTestId('service-performance')).toBeInTheDocument()
    expect(screen.getByTestId('revenue-metrics')).toBeInTheDocument()
    expect(screen.getByTestId('recent-bookings')).toBeInTheDocument()
    expect(screen.getAllByTestId('metric-card')).toHaveLength(4)
  })
})