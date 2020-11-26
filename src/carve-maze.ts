import { gridFactory, IGrid } from './grid'
import { carveRecursiveBacktracking } from './carve-recursive'
import { carveIterative } from './carve-iterative'

export type Strategy = 'recursive-backtracking' | 'iterative'

export function carveMaze(
  rows: number,
  columns: number,
  strategy: Strategy = 'recursive-backtracking'
) {
  const grid = gridFactory(rows, columns)
  switch (strategy) {
    case 'recursive-backtracking':
      carveRecursiveBacktracking(grid)
    case 'iterative':
      carveIterative(grid)
  }
  return grid
}
