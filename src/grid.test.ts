import { gridFactory, IGrid } from './grid'
import { coordFactory } from './coord'

let grid: IGrid
beforeEach(() => (grid = gridFactory(4, 4)))

describe('grid', () => {
  describe('forEachRow', () => {
    test('iterates over all rows', () => {
      let rowCount = 0
      grid.forEachRow(row => rowCount++)
      expect(rowCount).toEqual(4)
    })
    test('supplies the correct row index on each iteration', () => {
      const rowIndices: number[] = []
      grid.forEachRow((_, rowIndex) => rowIndices.push(rowIndex))
      expect(rowIndices).toEqual([0, 1, 2, 3])
    })
    test('supplies all columns for each row', () => {
      let colCount = 0
      grid.forEachRow(row => {
        colCount += row.length
      })
      expect(colCount).toEqual(4 * 4)
    })
  })
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
      expect(cell).toBeDefined()
    })
    test('does not return a cell', () => {
      const coord = coordFactory(3, 3)
      const cell = grid.getAdjacentCell('east', coord)
      expect(cell).toBeUndefined()
    })
  })
  describe('getAdjacentCoord', () => {
    test('returns an adjacent coord', () => {
      const coord = grid.getAdjacentCoord('north', coordFactory(1, 1))
      expect(coord.row).toEqual(0)
      expect(coord.col).toEqual(1)
    })
    test('does not return a coord', () => {
      const coord = grid.getAdjacentCoord('north', coordFactory(0, 0))
      expect(coord).toBeUndefined()
    })
  })
})
