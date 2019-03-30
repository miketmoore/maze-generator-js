import { gridFactory } from './grid'
import { carveMaze } from './carve-maze'

export const mazeGenerator = (rows: number, cols: number) => {
  if (typeof rows !== 'number') {
    throw new Error('rows is required')
  }
  if (rows < 0) {
    throw new Error('rows must be a positive integer')
  }
  if (typeof cols !== 'number') {
    throw new Error('cols is required')
  }
  if (cols < 0) {
    throw new Error('cols must be a positive integer')
  }
  const grid = gridFactory(rows, cols)
  carveMaze(grid)
  return grid
}
