import Ship from "./Ship.js";
/* global describe, test, expect, beforeEach */

describe("Ship initialization", () => {
  test("Ship with size of 2", () => {
    const ship = new Ship();
    expect(ship.size).toBe(2);
  });

  test("Ship with size of 3", () => {
    const ship = new Ship(3);
    expect(ship.size).toBe(3);
  });

  test("Cannot create a ship of size -", () => {
    expect(() => new Ship(0)).toThrow("Invalid ship size");
  });

  test("Cannot create a ship of negative size", () => {
    expect(() => new Ship(-1)).toThrow("Invalid ship size");
  });
});

describe("On Hit", () => {
  let ship;

  beforeEach(() => {
    ship = new Ship(2);
  });

  test("Increment number of hits", () => {
    ship.onHit();
    expect(ship.hits).toBe(1);
  });

  test("Number of hits equal to the size will sink", () => {
    ship.onHit();
    ship.onHit();
    expect(ship.isSunk()).toBe(true);
  });

  test("Cannot hit any more after ship has sunk", () => {
    ship.onHit();
    ship.onHit();
    expect(() => ship.onHit()).toThrow();
  });
});

describe("Has the ship sunk?", () => {
  let ship;

  beforeEach(() => {
    ship = new Ship(1);
  });

  test("Ship has not sunk after initiation", () => {
    expect(ship.isSunk()).toBe(false);
  });

  test("Ship sinks after being as many times as it's length", () => {
    ship.onHit();
    expect(ship.isSunk()).toBe(true);
  });
});

describe("Return the number of hits", () => {
  let ship;

  beforeEach(() => {
    ship = new Ship();
  });

  test("Ship has no hits after initialization", () => {
    expect(ship.hits).toBe(0);
  });

  test("Ship has has many hits as onHit was triggered", () => {
    ship.onHit();
    expect(ship.hits).toBe(1);
    ship.onHit();
    expect(ship.hits).toBe(2);
  });
});

describe("Return the size of the ship", () => {
  test.each([1, 2, 5])("Ship of size %i", (size) => {
    const ship = new Ship(size);
    expect(ship.size).toBe(size);
  });
});
