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

describe('isVisited', () => {
  it('is not visited', () => {
    const cell = Cell.new()
    expect(cell.isVisited()).toBe(false)
  })
  it('is visited', () => {
    const cell = Cell.new()
    cell.carveWall('north')
    expect(cell.isVisited()).toBe(true)
  })
})

describe('getOppositeDirection', () => {
  const data: Array<{
    readonly input: Direction
    readonly output: Direction
  }> = [
    { input: 'north', output: 'south' },
    { input: 'east', output: 'west' },
    { input: 'south', output: 'north' },
    { input: 'west', output: 'east' }
  ]
  data.forEach(({ input, output }) => {
    test(`input=${input} output=${output}`, () => {
      const cell = Cell.new()
      expect(cell.getOppositeDirection(input)).toBe(output)
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
    expect(cell.getData()).toEqual('10111')
  })
  test('east carved', () => {
    const cell = Cell.new()
    cell.carveWall('east')
    expect(cell.getData()).toEqual('11011')
  })
  test('south carved', () => {
    const cell = Cell.new()
    cell.carveWall('south')
    expect(cell.getData()).toEqual('11101')
  })
  test('west carved', () => {
    const cell = Cell.new()
    cell.carveWall('west')
    expect(cell.getData()).toEqual('11110')
  })
  test('all carved', () => {
    const cell = Cell.new()
    cell.carveWall('north')
    cell.carveWall('east')
    cell.carveWall('south')
    cell.carveWall('west')
    expect(cell.getData()).toEqual('10000')
  })
})
