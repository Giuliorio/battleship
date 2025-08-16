class Ship {
  #length = 0;
  #hits = 0;
  constructor(length = 0) {
    this.#length = length;
  }

  get length() {
    return this.#length;
  }

  get hits() {
    return this.#hits;
  }

  hit() {
    this.#hits += 1;
  }

  isSunk() {
    return this.#hits === this.#length ? true : false;
  }
}

export default Ship;
