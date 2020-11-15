import { gridFactory, IGrid } from './grid'
import { carveMaze, Strategy } from './carve-maze'
import { coordFactory } from './coord'

const countCarvedCells = (rows: number, cols: number, grid: IGrid) => {
  let count = 0
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const coord = coordFactory(row, col)
      const cell = grid.getCell(coord)
      if (cell && cell.isCarved()) {
        count++
      }
    }
  }
  return count
}

const strategies: Strategy[] = ['iterative', 'recursive-backtracking']

strategies.forEach(strategy => {
  test(`strategy=${strategy} carves all cells`, () => {
    const rows = 4
    const cols = 4
    const grid = gridFactory(rows, cols)
    carveMaze(grid, strategy)
    let count = countCarvedCells(rows, cols, grid)
    expect(count).toEqual(rows * cols)
  })
})
