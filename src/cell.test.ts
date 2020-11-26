import { Cell } from './cell'
import { Direction } from './direction'

test('getWalls', () => {
  const cell = Cell.new()
  const walls = cell.getWalls()
  expect(walls).toEqual({
    north: true,
    east: true,
    south: true,
    west: true
  })
})

describe('carveWall', () => {
  const intact = {
    north: true,
    east: true,
    south: true,
    west: true
  }
  const data: Array<{
    readonly direction: Direction
    readonly expected: Record<Direction, boolean>
  }> = [
    { direction: 'north', expected: { ...intact, north: false } },
    { direction: 'east', expected: { ...intact, east: false } },
    { direction: 'south', expected: { ...intact, south: false } },
    { direction: 'west', expected: { ...intact, west: false } }
  ]
  data.forEach(({ direction, expected }) => {
    test(direction, () => {
      const cell = Cell.new()
      cell.carveWall(direction)
      expect(cell.getWalls()).toEqual(expected)
    })
  })
})

describe('isWallSolid', () => {
  const data: Direction[] = ['north', 'east', 'south', 'west']
  data.forEach(direction => {
    test(`${direction} is solid`, () => {
      const cell = Cell.new()
      expect(cell.isWallSolid(direction)).toEqual(true)
    })
    test(`${direction} is not solid`, () => {
      const cell = Cell.new()
      cell.carveWall(direction)
      expect(cell.isWallSolid(direction)).toEqual(false)
    })
  })
})

describe('visited', () => {
  it('is not visited', () => {
    const cell = Cell.new()
    expect(cell.isVisited()).toBe(false)
  })
  it('is visited', () => {
    const cell = Cell.new()
    cell.markVisited()
    expect(cell.isVisited()).toBe(true)
  })
})

describe('getOppositeWall', () => {
  const data = [
    { input: 0, output: 2 },
    { input: 1, output: 3 },
    { input: 2, output: 0 },
    { input: 3, output: 1 }
  ]
  data.forEach(({ input, output }) => {
    test(`input=${input} output=${output}`, () => {
      const cell = Cell.new()
      expect(cell.getOppositeWall(input)).toBe(output)
    })
  })
})

describe('isCarved', () => {
  test(`returns false`, () => {
    const cell = Cell.new()
    expect(cell.isCarved()).toBe(false)
  })
  const data: Direction[] = ['north', 'east', 'south', 'west']
  data.forEach(direction => {
    test(`after carving ${direction}, return true`, () => {
      const cell = Cell.new()
      cell.carveWall(direction)
      expect(cell.isCarved()).toBe(true)
    })
  })
})

describe('getData', () => {
  test('for new cell', () => {
    expect(Cell.new().getData()).toEqual('01111')
  })
  test('north carved', () => {
    const cell = Cell.new()
    cell.carveWall('north')
    expect(cell.getData()).toEqual('00111')
  })
  test('east carved', () => {
    const cell = Cell.new()
    cell.carveWall('east')
    expect(cell.getData()).toEqual('01011')
  })
  test('south carved', () => {
    const cell = Cell.new()
    cell.carveWall('south')
    expect(cell.getData()).toEqual('01101')
  })
  test('west carved', () => {
    const cell = Cell.new()
    cell.carveWall('west')
    expect(cell.getData()).toEqual('01110')
  })
  test('all carved', () => {
    const cell = Cell.new()
    cell.carveWall('north')
    cell.carveWall('east')
    cell.carveWall('south')
    cell.carveWall('west')
    expect(cell.getData()).toEqual('00000')
  })
})