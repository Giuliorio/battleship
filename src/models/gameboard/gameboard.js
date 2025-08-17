class Gameboard {
  constructor(size = 10) {
    this.size = size;
    this.board = Array.from({ length: size }, () => Array(size).fill(null));
    this.ships = [];
    this.attacked = new Set();
  }

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

  areAllShipsSunk() {
    return this.ships.every((ship) => ship.isSunk() === true);
  }

  #coordKey(x, y) {
    return `${x},${y}`;
  }
}

export default Gameboard;
