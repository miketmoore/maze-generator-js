import { gridFactory } from './grid'
import { carveMaze } from './carve-maze'

describe('recursive-backtracking', () => {
  test('all cells should be carved', () => {
    const grid = gridFactory(4, 4)
    carveMaze(grid, 'recursive-backtracking')
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
