import { gridFactory, IGrid } from './grid'
import { coordFactory } from './coord'

let grid: IGrid
beforeEach(() => (grid = gridFactory(4, 4)))

describe('grid', () => {
  describe('getCell', () => {
    const validCoords = [[0, 0], [1, 2], [3, 3]]
    validCoords.forEach(([row, col]) => {
      test(`returns a cell at coordinate [row:${row}, col:${col}]`, () => {
        const coord = coordFactory(row, col)
        const cell = grid.getCell(coord)
        expect(cell).toBeDefined()
      })
    })

    const invalidCoords = [[-1, -1], [4, 4]]
    invalidCoords.forEach(([row, col]) => {
      test(`returns undefined for invalid coordinates`, () => {
        const coord = coordFactory(row, col)
        const cell = grid.getCell(coord)
        expect(cell).toBeUndefined()
      })
    })
  })
  describe('getAdjacentCell', () => {
    test('returns an adjacent cell', () => {
      const coord = coordFactory(0, 0)
      const cell = grid.getAdjacentCell('east', coord)
      if (!cell) {
        throw new Error('oh no')
      }
      const adjacentCoord = cell.getCoord()
      expect(adjacentCoord.row).toEqual(0)
      expect(adjacentCoord.col).toEqual(1)
    })
    test('does not return a cell', () => {
      const coord = coordFactory(3, 3)
      const cell = grid.getAdjacentCell('east', coord)
      expect(cell).toBeUndefined()
    })
  })
})
