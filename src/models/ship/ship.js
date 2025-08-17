class Ship {
  #size;
  #hits = 0;
  constructor(size = 2) {
    if (size <= 0) {
      throw new Error("Invalid ship size");
    }

    this.#size = size;
  }

  get size() {
    return this.#size;
  }

  get hits() {
    return this.#hits;
  }

  onHit() {
    if (this.isSunk()) {
      throw new Error("Cannot hit any more after ship has sunk");
    }

    this.#hits += 1;
  }

  isSunk() {
    return this.#hits === this.#size ? true : false;
  }
}

export default Ship;
