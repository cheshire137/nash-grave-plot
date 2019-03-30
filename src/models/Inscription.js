class Inscription {
  constructor(text) {
    this.text = String(text);
    this.lines = this.text.split(/\s*\/\s*/).
      filter(line => line.trim().length > 0);
  }
}

export default Inscription;
