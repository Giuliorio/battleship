/* global describe, test, expect, jest, beforeEach */

import Player from "./Player";

const name = "Player 1";
const fleet = ["Ship 1", "Ship 2"];
let ships;
const mockBoard = {
  placeShip: jest.fn(() => ships++),
};

describe("Player initialization", () => {
  test("Player initializes with a new Gameboard", () => {
    const player = new Player(name, fleet);
    expect(player.board).toBeDefined();
  });

  test("Player must have a name", () => {
    expect(() => {
      new Player("", fleet);
    }).toThrow("Player must have a name");
  });

  test("Player must have a fleet", () => {
    expect(() => {
      new Player(name);
    }).toThrow("Player must have a fleet");
  });
});

describe("Player can place ships", () => {
  let player;

  beforeEach(() => {
    ships = 0;
    player = new Player(name, fleet);
    player.board = mockBoard;
  });

  test("Player can place a ship", () => {
    const shipToPlace = fleet[0];
    player.placeShip(shipToPlace, 0, 0, true);
    expect(mockBoard.placeShip).toHaveBeenCalledWith(shipToPlace, 0, 0, true);
  });

  test("Player can place entire fleet", () => {
    player.placeFleetRandomly();
    expect(ships).toBe(fleet.length);
  });
});

describe("Player can send attacks", () => {
  let player;
  beforeEach(() => {
    player = new Player(name, fleet);
  });
  test("Test 1", () => {
    expect(player.chooseAttack(0, 0)).toEqual({ x: 0, y: 0 });
  });

  test("Cannot send attacks outside the board", () => {
    expect(() => {
      player.chooseAttack(10, 10);
    }).toThrow("Attack coordinates are out of bounds");
    expect(() => {
      player.chooseAttack(-1, 0);
    }).toThrow("Attack coordinates are out of bounds");
  });
});
