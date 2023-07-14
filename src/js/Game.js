export default class Game {
  constructor(_class) {
    this.class = _class;
    this.allElements = document.querySelectorAll(`.${this.class}`);
    this.elementId = 0;
    this.getId = this.getId.bind(this);
  }

  getId() {
    let counter = 0;
    while (true) {
      counter += 1;
      const newId = Math.round(Math.random() * 15);
      if (newId !== this.elementId) {
        this.elementId = newId;
        break;
      }
      if (counter === 10) {
        throw new Error('Something wrong! 10 matches!');
      }
    }
    return this.elementId;
  }

  changeHole() {
    setInterval(() => {
      const id = this.getId();
      if (document.querySelector('.gobin_in_hole')) {
        document.querySelector('.gobin_in_hole').className = 'hole';
      }
      this.allElements[id].className = 'hole gobin_in_hole';
    }, 800);
  }
}
