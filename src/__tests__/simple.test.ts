// Simple test to verify Jest setup
describe('Simple test', () => {
  it('should pass', () => {
    expect(1 + 1).toBe(2)
  })

  it('should handle basic operations', () => {
    const sum = (a: number, b: number) => a + b
    expect(sum(2, 3)).toBe(5)
  })

  it('should handle arrays', () => {
    const arr = [1, 2, 3]
    expect(arr).toHaveLength(3)
    expect(arr).toContain(2)
  })

  it('should handle objects', () => {
    const obj = { name: 'test', value: 42 }
    expect(obj).toHaveProperty('name', 'test')
    expect(obj).toHaveProperty('value', 42)
  })
})