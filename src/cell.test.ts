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
