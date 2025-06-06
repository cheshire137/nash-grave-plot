export function getPhotoCaptionsByUrl(urlTexts: string[]): {
  [url: string]: string
} {
  const result: {[url: string]: string} = {}

  // e.g., "View Grave Photo (http://dataimages.nashville.gov/dccs/an-36-01-01.jpg)"
  for (const text of urlTexts) {
    const openParenIndex = text.indexOf('(')
    if (openParenIndex > -1) {
      const closeParenIndex = text.indexOf(')', openParenIndex)
      const url = text.substring(openParenIndex + 1, closeParenIndex)
      const caption = text.substring(0, openParenIndex).trim()
      result[url] = caption
    } else {
      result[text] = text
    }
  }

  return result
}
