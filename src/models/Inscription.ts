class Inscription {
  text: string;
  lines: string[];

  constructor(text: string | null) {
    this.text = text || '';
    this.lines = this.text.split(/\s*\/\s*/).filter(line => line.trim().length > 0);
  }
}

export default Inscription;
