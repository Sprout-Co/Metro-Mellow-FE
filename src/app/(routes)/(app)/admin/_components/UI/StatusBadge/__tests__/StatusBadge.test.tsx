import { render, screen } from '@testing-library/react'
import StatusBadge from '../StatusBadge'

describe('StatusBadge', () => {
  it('renders with active status', () => {
    render(<StatusBadge status="active" label="Active" />)
    
    const badge = screen.getByText('Active')
    expect(badge).toBeInTheDocument()
    expect(badge).toHaveClass('badge--success')
  })

  it('renders with pending status', () => {
    render(<StatusBadge status="pending" label="Pending" />)
    
    const badge = screen.getByText('Pending')
    expect(badge).toBeInTheDocument()
    expect(badge).toHaveClass('badge--warning')
  })

  it('renders with cancelled status', () => {
    render(<StatusBadge status="cancelled" label="Cancelled" />)
    
    const badge = screen.getByText('Cancelled')
    expect(badge).toBeInTheDocument()
    expect(badge).toHaveClass('badge--error')
  })

  it('renders with completed status', () => {
    render(<StatusBadge status="completed" label="Completed" />)
    
    const badge = screen.getByText('Completed')
    expect(badge).toBeInTheDocument()
    expect(badge).toHaveClass('badge--primary')
  })

  it('renders with inactive status', () => {
    render(<StatusBadge status="inactive" label="Inactive" />)
    
    const badge = screen.getByText('Inactive')
    expect(badge).toBeInTheDocument()
    expect(badge).toHaveClass('badge--error')
  })

  it('renders with different labels', () => {
    const { rerender } = render(<StatusBadge status="active" label="Verified" />)
    expect(screen.getByText('Verified')).toBeInTheDocument()
    
    rerender(<StatusBadge status="pending" label="Awaiting Review" />)
    expect(screen.getByText('Awaiting Review')).toBeInTheDocument()
    
    rerender(<StatusBadge status="cancelled" label="Rejected" />)
    expect(screen.getByText('Rejected')).toBeInTheDocument()
  })

  it('uses default labels when not provided', () => {
    render(<StatusBadge status="active" />)
    expect(screen.getByText('Active')).toBeInTheDocument()
    
    const { rerender } = render(<StatusBadge status="pending" />)
    expect(screen.getByText('Pending')).toBeInTheDocument()
  })
})