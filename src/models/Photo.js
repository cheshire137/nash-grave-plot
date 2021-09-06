const extractUrl = text => {
  const match = text.match(/\s?\(/);
  if (!match) {
    return null;
  }

  const openParenIndex = match.index + match[0].length;
  let url = text.slice(openParenIndex).trim();
  if (url.indexOf(')') === url.length - 1) {
    url = url.slice(0, url.length - 1);
  }
  const potentialURL = url.toLowerCase();
  if (potentialURL.length > 0 && potentialURL.indexOf('http') === 0) {
    return potentialURL
  }

  return null;
};


const extractTitle = (number, text, url) => {
  const cleanedText = text.replace(url, '').replace(/^\s*view\s+/i, '').replace(/\s*\(\s*\)\s*$/, '');
  return `${cleanedText} ${number}`;
};

class Photo {
  constructor(number, text) {
    this.text = text;
    this.url = extractUrl(text);
    this.title = extractTitle(number, text, this.url);
  }
}

export default Photo;
