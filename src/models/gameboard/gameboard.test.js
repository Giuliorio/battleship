/* global describe, test, expect, beforeEach, jest */

import Gameboard from "./gameboard";

describe("Board initialization", () => {
  test("Board of size 10", () => {
    const gameboard = new Gameboard(10);
    expect(gameboard.board.length).toBe(10);
    expect(gameboard.board[0].length).toBe(10);
    expect(gameboard.board.flat().every((cell) => cell === null)).toBe(true);
  });

  test("Board of size 20", () => {
    const gameboard = new Gameboard(20);
    expect(gameboard.board.length).toBe(20);
    expect(gameboard.board[0].length).toBe(20);
    expect(gameboard.board.flat().every((cell) => cell === null)).toBe(true);
  });
});

describe("Placing ships", () => {
  let mockShip;

  let gameboard;

  beforeEach(() => {
    gameboard = new Gameboard();

    mockShip = {
      length: 2,
      onHit: jest.fn(),
      isSunk: jest.fn(() => false),
    };
  });

  test("Placing a ship increments the number of ships", () => {
    expect(gameboard.ships.length).toBe(0);
    gameboard.placeShip(mockShip, 0, 0);
    expect(gameboard.ships.length).toBe(1);
  });

  test("Ships can be placed horizontally", () => {
    gameboard.placeShip(mockShip, 0, 0, true);
    gameboard.receiveAttack(0, 0);
    gameboard.receiveAttack(0, 1);

    expect(mockShip.onHit).toHaveBeenCalledTimes(2);
  });

  test("Ships can be placed vertically", () => {
    gameboard.placeShip(mockShip, 0, 0, false);
    gameboard.receiveAttack(0, 0);
    gameboard.receiveAttack(1, 0);

    expect(mockShip.onHit).toHaveBeenCalledTimes(2);
  });

  test("Cannot place a ship outside the board boundaries", () => {
    expect(() => {
      gameboard.placeShip(mockShip, 10, 10);
    }).toThrow();
  });

  test("Cannot place a ship crossing the boundaties", () => {
    expect(() => {
      gameboard.placeShip(mockShip, 9, 9);
    }).toThrow();
  });

  test("Cannot place a ship over another ship", () => {
    const secondMockShip = {
      length: 2,
      onHit: jest.fn(),
      isSunk: jest.fn(() => false),
    };

    gameboard.placeShip(mockShip, 0, 0);

    expect(() => {
      gameboard.placeShip(secondMockShip, 0, 0);
    }).toThrow("Cannot place a ship over another ship");
  });
});

describe("Receiving Attacks", () => {
  const mockShip = {
    length: 2,
    onHit: jest.fn(),
    isSunk: jest.fn(() => false),
  };
  let gameboard;

  beforeEach(() => {
    gameboard = new Gameboard(10);
  });

  test("Attacking a ship trigger the ship's onHit", () => {
    gameboard.placeShip(mockShip, 0, 0);
    gameboard.receiveAttack(0, 0);

    expect(mockShip.onHit).toHaveBeenCalledTimes(1);
  });

  test("Attacking an empty cell marks it as empty", () => {
    gameboard.receiveAttack(0, 0);
    expect(gameboard.board[0][0]).toBe("miss");
  });

  test("Cannot attack a cell out of bounds", () => {
    expect(() => {
      gameboard.receiveAttack(10, 10);
    }).toThrow("Cannot attack a cell out of bounds");
  });

  test("Cannot hit the same cell twice", () => {
    gameboard.receiveAttack(0, 0);

    expect(() => {
      gameboard.receiveAttack(0, 0);
    }).toThrow("Cannot hit the same cell twice");

    gameboard.placeShip(mockShip, 1, 0);
    gameboard.receiveAttack(1, 0);
    expect(() => {
      gameboard.receiveAttack(1, 0);
    }).toThrow("Cannot hit the same cell twice");
  });
});

describe("Check if all ships have sunk", () => {
  let gameboard;
  let mockShip;
  let hits;

  beforeEach(() => {
    gameboard = new Gameboard();
    hits = 0;
    mockShip = {
      length: 2,
      onHit: jest.fn(() => hits++),
      isSunk: jest.fn(() => hits >= 2),
    };
  });

  test("All ships have sunk", () => {
    gameboard.placeShip(mockShip, 0, 0, true);
    gameboard.receiveAttack(0, 0);
    gameboard.receiveAttack(0, 1);
    expect(mockShip.onHit).toHaveBeenCalledTimes(2);

    expect(gameboard.areAllShipsSunk()).toBe(true);
  });

  test("Not all ships have sunk", () => {
    gameboard.placeShip(mockShip, 0, 0);

    expect(gameboard.areAllShipsSunk()).toBe(false);
  });
});
