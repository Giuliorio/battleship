/**
 * Represents a ship in the game.
 */
class Ship {
  #size;
  #hits = 0;

  /**
   * Creates a new Ship instance.
   * @param {number} size - The size (length) of the ship. Must be greater than 0.
   * @throws Will throw an error if size <= 0.
   */
  constructor(size = 2) {
    if (size <= 0) {
      throw new Error("Invalid ship size");
    }

    this.#size = size;
  }

  /**
   * @returns {number} The size of the ship.
   */
  get size() {
    return this.#size;
  }

  /**
   * @returns {number} The number of hits the ship has taken.
   */
  get hits() {
    return this.#hits;
  }

  /**
   * Registers a hit on the ship.
   * @throws Will throw an error if the ship is already sunk.
   */
  onHit() {
    if (this.isSunk()) {
      throw new Error("Cannot hit any more after ship has sunk");
    }

    this.#hits += 1;
  }

  /**
   * Checks if the ship has sunk.
   * @returns {boolean} True if hits equal size, false otherwise.
   */
  isSunk() {
    return this.#hits === this.#size ? true : false;
  }
}

export default Ship;
