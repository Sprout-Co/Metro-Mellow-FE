// Simple utility functions test for admin functionality

describe('Admin Utils', () => {
  describe('Status formatting', () => {
    it('should format account status correctly', () => {
      const formatStatus = (status: string) => {
        return status.replace(/_/g, ' ')
      }

      expect(formatStatus('ACTIVE')).toBe('ACTIVE')
      expect(formatStatus('PENDING_VERIFICATION')).toBe('PENDING VERIFICATION')
      expect(formatStatus('LOCKED')).toBe('LOCKED')
    })

    it('should convert status to color', () => {
      const getStatusColor = (status: string) => {
        switch (status) {
          case 'ACTIVE':
            return 'active'
          case 'INACTIVE':
            return 'inactive'
          case 'LOCKED':
            return 'cancelled'
          case 'PENDING_VERIFICATION':
            return 'pending'
          case 'SUSPENDED':
            return 'cancelled'
          default:
            return 'pending'
        }
      }

      expect(getStatusColor('ACTIVE')).toBe('active')
      expect(getStatusColor('INACTIVE')).toBe('inactive')
      expect(getStatusColor('LOCKED')).toBe('cancelled')
      expect(getStatusColor('PENDING_VERIFICATION')).toBe('pending')
      expect(getStatusColor('SUSPENDED')).toBe('cancelled')
      expect(getStatusColor('UNKNOWN')).toBe('pending')
    })
  })

  describe('Date formatting', () => {
    it('should format dates for display', () => {
      const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        })
      }

      const testDate = '2024-01-15T10:00:00Z'
      const formatted = formatDate(testDate)
      expect(formatted).toBe('Jan 15, 2024')
    })
  })

  describe('Customer statistics', () => {
    it('should calculate customer stats correctly', () => {
      const customers = [
        { accountStatus: 'ACTIVE' },
        { accountStatus: 'ACTIVE' },
        { accountStatus: 'PENDING_VERIFICATION' },
        { accountStatus: 'INACTIVE' },
        { accountStatus: 'ACTIVE' },
      ]

      const calculateStats = (customers: Array<{ accountStatus: string }>) => {
        return {
          total: customers.length,
          active: customers.filter(c => c.accountStatus === 'ACTIVE').length,
          pending: customers.filter(c => c.accountStatus === 'PENDING_VERIFICATION').length,
          inactive: customers.filter(c => c.accountStatus === 'INACTIVE').length,
        }
      }

      const stats = calculateStats(customers)
      
      expect(stats.total).toBe(5)
      expect(stats.active).toBe(3)
      expect(stats.pending).toBe(1)
      expect(stats.inactive).toBe(1)
    })
  })

  describe('Progress calculation', () => {
    it('should calculate progress percentage correctly', () => {
      const calculateProgress = (current: number, total: number) => {
        if (total === 0) return 0
        const percentage = (current / total) * 100
        return Math.min(100, Math.max(0, percentage))
      }

      expect(calculateProgress(75, 100)).toBe(75)
      expect(calculateProgress(150, 100)).toBe(100) // Should cap at 100
      expect(calculateProgress(10, 0)).toBe(0) // Handle division by zero
      expect(calculateProgress(-5, 100)).toBe(0) // Handle negative values
    })
  })

  describe('User role validation', () => {
    it('should validate admin access', () => {
      const hasAdminAccess = (role: string) => {
        return role === 'ADMIN' || role === 'SUPER_ADMIN'
      }

      expect(hasAdminAccess('ADMIN')).toBe(true)
      expect(hasAdminAccess('SUPER_ADMIN')).toBe(true)
      expect(hasAdminAccess('CUSTOMER')).toBe(false)
      expect(hasAdminAccess('STAFF')).toBe(false)
    })

    it('should check customer role', () => {
      const isCustomer = (role: string) => {
        return role === 'CUSTOMER'
      }

      expect(isCustomer('CUSTOMER')).toBe(true)
      expect(isCustomer('ADMIN')).toBe(false)
      expect(isCustomer('STAFF')).toBe(false)
    })
  })

  describe('Search and filtering', () => {
    it('should filter customers by search query', () => {
      const customers = [
        { firstName: 'John', lastName: 'Doe', email: 'john@example.com', phone: '123-456-7890' },
        { firstName: 'Jane', lastName: 'Smith', email: 'jane@example.com', phone: '098-765-4321' },
        { firstName: 'Bob', lastName: 'Johnson', email: 'bob@test.com', phone: '555-123-4567' },
      ]

      const filterCustomers = (customers: any[], query: string) => {
        if (!query) return customers
        
        return customers.filter(customer => {
          const fullName = `${customer.firstName} ${customer.lastName}`.toLowerCase()
          const email = customer.email.toLowerCase()
          const phone = customer.phone
          const searchQuery = query.toLowerCase()
          
          return fullName.includes(searchQuery) || 
                 email.includes(searchQuery) || 
                 phone.includes(searchQuery)
        })
      }

      expect(filterCustomers(customers, 'john')).toHaveLength(2) // John Doe and Bob Johnson
      expect(filterCustomers(customers, 'jane')).toHaveLength(1)
      expect(filterCustomers(customers, '@example.com')).toHaveLength(2)
      expect(filterCustomers(customers, '555')).toHaveLength(1)
      expect(filterCustomers(customers, '')).toHaveLength(3) // No filter
    })
  })
})