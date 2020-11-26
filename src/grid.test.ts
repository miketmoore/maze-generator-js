import { gridFactory, IGrid } from './grid'
import { coordFactory } from './coord'
import { Direction } from './cell'

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
      if (!coord) {
        throw new Error('coord is undefined but expected to be defined')
      }
      expect(coord.row).toEqual(0)
      expect(coord.col).toEqual(1)
    })
    test('adjacent north coord is undefined', () => {
      const coord = grid.getAdjacentCoord('north', coordFactory(0, 0))
      expect(coord).toBeUndefined()
    })
    test('adjacent east coord is undefined', () => {
      const coord = grid.getAdjacentCoord('east', coordFactory(0, 3))
      expect(coord).toBeUndefined()
    })
    test('adjacent south coord is undefined', () => {
      const coord = grid.getAdjacentCoord('south', coordFactory(3, 0))
      expect(coord).toBeUndefined()
    })
    test('adjacent west coord is undefined', () => {
      const coord = grid.getAdjacentCoord('west', coordFactory(0, 0))
      expect(coord).toBeUndefined()
    })
  })
  describe('getRandCoord', () => {
    test('always returns a defined coord', () => {
      for (var i = 0; i < 100; i++) {
        expect(grid.getRandCoord()).toBeDefined()
      }
    })
  })
  describe('getRandCell', () => {
    test('always returns a defined cell', () => {
      for (var i = 0; i < 100; i++) {
        expect(grid.getRandCell()).toBeDefined()
      }
    })
  })
  describe('carveCellWall', () => {
    const data: Direction[] = ['north', 'east', 'south', 'west']
    data.forEach(wall => {
      it(`can carve the ${wall} wall`, () => {
        const coord = coordFactory(0, 0)
        grid.carveCellWall(coord, wall)
        const cell = grid.getCell(coord)
        if (!cell) throw new Error('cell is undefined which is unexpected')
        expect(cell.getWalls()[wall]).toEqual(false)
      })
    })
  })
  describe('getAvailableCellWalls', () => {
    const data = [
      {
        wallsToCarve: ['north', 'east', 'south', 'west'],
        expected: []
      },
      // 3 available
      {
        wallsToCarve: ['north'],
        expected: ['east', 'south', 'west']
      },
      {
        wallsToCarve: ['east'],
        expected: ['north', 'south', 'west']
      },
      {
        wallsToCarve: ['south'],
        expected: ['north', 'east', 'west']
      },
      {
        wallsToCarve: ['west'],
        expected: ['north', 'east', 'south']
      },
      // 2 available
      {
        wallsToCarve: ['north', 'south'],
        expected: ['east', 'west']
      },
      {
        wallsToCarve: ['east', 'west'],
        expected: ['north', 'south']
      },
      // 1 available
      {
        wallsToCarve: ['north', 'east', 'south'],
        expected: ['west']
      },
      {
        wallsToCarve: ['east', 'south', 'west'],
        expected: ['north']
      }
    ]
    data.forEach(({ wallsToCarve, expected }) => {
      const name =
        expected.length === 0
          ? 'none available'
          : `${expected.length} available after carving ${wallsToCarve.join(
              ','
            )}`
      test(name, () => {
        const coord = coordFactory(1, 1)

        wallsToCarve.forEach((wall: Direction) =>
          grid.carveCellWall(coord, wall)
        )

        const cell = grid.getCell(coord)
        if (!cell) {
          throw new Error('cell is undefined which is unexpected')
        }

        const walls = grid.getAvailableCellWalls(cell, coord)
        expect(walls.length).toEqual(expected.length)
        expect(walls).toEqual(expected)
      })
    })
  })
})
