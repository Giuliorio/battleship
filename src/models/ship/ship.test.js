import Ship from "./ship.js";
/* global describe, it, expect, beforeEach */

describe("Ship Class with Length of 0", () => {
  let ship;
  beforeEach(() => {
    ship = new Ship();
  });

  it("Length should be 1", () => {
    expect(ship.length).toBe(0);
  });

  it("Hits should be 0", () => {
    expect(ship.hits).toBe(0);
  });

  it("Ship should not be sunk initially", () => {
    expect(ship.isSunk()).toBe(true);
  });
});

describe("Ship Class with Length of 1", () => {
  let ship;
  beforeEach(() => {
    ship = new Ship(1);
  });

  it("Length should be 1", () => {
    expect(ship.length).toBe(1);
  });

  it("Hits should be 0", () => {
    expect(ship.hits).toBe(0);
  });

  it("Ship should not be sunk before being hit", () => {
    expect(ship.isSunk()).toBe(false);
  });

  it("Ship should be sunk after being hit", () => {
    ship.hit();
    expect(ship.isSunk()).toBe(true);
  });
});

describe("Ship Class with Length of 2", () => {
  let ship;
  beforeEach(() => {
    ship = new Ship(2);
  });

  it("Length should be 1", () => {
    expect(ship.length).toBe(2);
  });

  it("Ship should not be sunk before being hit", () => {
    expect(ship.isSunk()).toBe(false);
  });

  it("Hits should be 1 after being hit once", () => {
    ship.hit();
    expect(ship.hits).toBe(1);
  });

  it("Ship should not be sunk after being hit once", () => {
    ship.hit();
    expect(ship.isSunk()).toBe(false);
  });

  it("Ship should be sunk after being hit twice", () => {
    ship.hit();
    ship.hit();
    expect(ship.isSunk()).toBe(true);
  });
});
