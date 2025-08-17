/**
 * Represents a Battleship game board.
 */
class Gameboard {
  /**
   * Creates a new game board.
   * @param {number} size - The size of the board (default 10x10).
   */
  constructor(size = 10) {
    this.size = size;
    this.board = Array.from({ length: size }, () => Array(size).fill(null));
    this.ships = [];
    this.attacked = new Set();
  }

  /**
   * Places a ship on the board.
   * @param {Ship} ship - The ship to place.
   * @param {number} x - Starting x-coordinate.
   * @param {number} y - Starting y-coordinate.
   * @param {boolean} [isHorizontal=true] - Whether the ship is placed horizontally.
   * @throws Will throw an error if placement is out of bounds or overlaps another ship.
   */
  placeShip(ship, x, y, isHorizontal = true) {
    for (let i = 0; i < ship.length; i++) {
      const posX = isHorizontal ? x : x + i;
      const posY = isHorizontal ? y + i : y;

      if (posX >= this.size || posY >= this.size) {
        throw new Error("Cannot place a ship outside the board boundaries");
      }

      const cell = this.board[posX][posY];
      if (cell && typeof cell.onHit === "function") {
        throw new Error("Cannot place a ship over another ship");
      }

      this.board[posX][posY] = ship;
    }

    this.ships.push(ship);
  }

  /**
   * Registers an attack on a cell.
   * @param {number} x - X-coordinate of the attack.
   * @param {number} y - Y-coordinate of the attack.
   * @returns {Ship|string} The ship hit or "miss" if no ship is present.
   * @throws Will throw an error if coordinates are out of bounds or cell was already attacked.
   */
  receiveAttack(x, y) {
    if (x < 0 || x >= this.size || y < 0 || y >= this.size) {
      throw new Error("Cannot attack a cell out of bounds");
    }
    const key = this.#coordKey(x, y);
    if (this.attacked.has(key)) {
      throw new Error("Cannot hit the same cell twice");
    }

    const cell = this.board[x][y];
    if (cell && typeof cell.onHit === "function") {
      cell.onHit();
    } else {
      this.board[x][y] = "miss";
    }

    this.attacked.add(this.#coordKey(x, y));
    return this.board[x][y];
  }

  /**
   * Checks if all ships on the board have sunk.
   * @returns {boolean} True if every ship's isSunk() returns true.
   */
  areAllShipsSunk() {
    return this.ships.every((ship) => ship.isSunk() === true);
  }

  /**
   * Generates a unique key for a coordinate (used internally).
   * @private
   * @param {number} x
   * @param {number} y
   * @returns {string} Coordinate key as "x,y".
   */
  #coordKey(x, y) {
    return `${x},${y}`;
  }
}

export default Gameboard;
