const parseGraveyardType = (graveyardType?: string | null) => {
  const lowercase = (graveyardType || '').toLowerCase().trim()
  if (lowercase.match(/\s+graveyard$/)) {
    return lowercase.split(/\s+/)[0]
  }
  if (lowercase.length > 0) return lowercase
  return 'unspecified'
}

export default parseGraveyardType
