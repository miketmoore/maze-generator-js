import { carveRecursiveBacktracking } from './carve-recursive'
import { gridFactory } from './grid'

describe('carveRecursiveBacktracking', () => {
  test('all cells should be carved', () => {
    const grid = gridFactory(4, 4)
    carveRecursiveBacktracking(grid)
    let count = 0
    grid.forEachRow(row => {
      row.forEach(cell => {
        if (cell.isCarved()) {
          count++
        }
      })
    })
    expect(count).toEqual(4 * 4)
  })
})
