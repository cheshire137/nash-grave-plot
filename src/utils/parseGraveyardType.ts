const parseGraveyardType = (graveyardType?: string | null) => {
  const lowercase = (graveyardType || '').toLowerCase();
  if (lowercase.match(/\s+graveyard$/)) {
    return lowercase.split(/\s+/)[0];
  }
  return lowercase;
}

export default parseGraveyardType;