import Gameboard from "../gameboard/Gameboard";

/**
 * Represents a player in the game, either human or computer.
 * Each player has a gameboard and a fleet of ships.
 */
class Player {
  /**
   * Creates a new Player.
   * @param {string} name - The name of the player. Must not be empty.
   * @param {Ship[]} fleet - An array of Ship instances representing the player's fleet. Must not be empty.
   * @throws {Error} Throws an error if name is empty or fleet is empty.
   */
  constructor(name = "", fleet = []) {
    if (name.trim() === "") {
      throw new Error("Player must have a name");
    }
    if (fleet.length === 0) {
      throw new Error("Player must have a fleet");
    }

    this.board = new Gameboard();
    this.fleet = fleet;
  }

  /**
   * Places a ship on the player's board at specified coordinates.
   * @param {Ship} ship - The ship to place.
   * @param {number} x - The x-coordinate for the ship's starting position.
   * @param {number} y - The y-coordinate for the ship's starting position.
   * @param {boolean} [isHorizontal=true] - Whether the ship should be placed horizontally.
   */
  placeShip(ship, x, y, isHorizontal = true) {
    this.board.placeShip(ship, x, y, isHorizontal);
  }

  /**
   * Places all ships in the player's fleet randomly on the board.
   * Ships will be placed until a valid position is found.
   */
  placeFleetRandomly() {
    const size = this.board.size;

    this.fleet.forEach((ship) => {
      let placed = false;
      while (!placed) {
        const x = Math.floor(Math.random() * size);
        const y = Math.floor(Math.random() * size);
        const isHorizontal = Math.random < 0.5;

        try {
          this.board.placeShip(ship, x, y, isHorizontal);
          placed = true;
        } catch {
          continue;
        }
      }
    });
  }

  /**
   * Chooses an attack coordinate to send to the opponent.
   * @param {number} x - The x-coordinate of the attack.
   * @param {number} y - The y-coordinate of the attack.
   * @returns {{x: number, y: number}} The attack coordinates.
   * @throws {Error} Throws an error if coordinates are out of bounds.
   */
  chooseAttack(x, y) {
    if (x >= this.board.size || x < 0 || y >= this.board.size || y < 0) {
      throw new Error("Attack coordinates are out of bounds");
    }
    return { x, y };
  }
}

export default Player;
