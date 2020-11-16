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
  describe('getAdjacentCoord', () => {
    test('returns an adjacent cell', () => {
      const coord = coordFactory(0, 0)
      const adjacent = grid.getAdjacentCoord('east', coord)
      if (!adjacent) {
        throw new Error('expected adjacent coord to be defined')
      }
      expect(adjacent.row).toEqual(0)
      expect(adjacent.col).toEqual(1)
    })
    test('does not return a cell', () => {
      const coord = coordFactory(3, 3)
      const adjacent = grid.getAdjacentCoord('east', coord)
      expect(adjacent).toBeUndefined()
    })
  })
  describe('getExportData', () => {
    test('returns an un-carved grid', () => {
      expect(grid.getExportData()).toMatchSnapshot()
    })
    test('returns an un-carved grid', () => {
      const carveData: Array<
        [number, number, Array<'north' | 'east' | 'south' | 'west'>]
      > = [
        [0, 0, ['north']],
        [1, 2, ['north', 'east']],
        [2, 3, ['north', 'west']],
        [3, 3, ['south']]
      ]
      carveData.forEach(([row, col, wallNames]) => {
        const cell = grid.getCell(coordFactory(row, col))
        if (!cell) {
          throw new Error('cell is undefined which is unexpected')
        }
        const walls = cell.getWalls()
        wallNames.forEach(wallName => walls[wallName].carve())
      })

      expect(grid.getExportData()).toMatchSnapshot()
    })
  })
})
