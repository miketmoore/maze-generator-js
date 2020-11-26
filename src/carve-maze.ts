import { gridFactory, IGrid } from './grid'
import { carveRecursiveBacktracking } from './carve-recursive'
import { carveIterative } from './carve-iterative'

export type Strategy = 'recursive-backtracking' | 'iterative'

export function carveMaze(rows: number, columns: number, strategy: Strategy) {
  const grid = gridFactory(rows, columns)
  switch (strategy) {
    case 'recursive-backtracking':
      carveRecursiveBacktracking(grid)
      break
    case 'iterative':
      carveIterative(grid)
      break
    default:
      throw new Error(`unexpected strategy: '${strategy}'`)
  }
  return grid
}
