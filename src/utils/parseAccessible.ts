const parseAccessible = (accessible?: string | null) => {
  const lowercase = (accessible || '').toLowerCase()
  if (lowercase === 'yes' || lowercase === 'y') {
    return 'yes'
  }
  if (lowercase === 'no' || lowercase === 'n') {
    return 'no'
  }
  if (lowercase.trim().length > 0) return lowercase
  return ''
}

export default parseAccessible
