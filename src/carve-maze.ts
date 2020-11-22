import { gridFactory, IGrid } from './grid'
import { ICell } from './cell'
import { randInRange } from './rand'
import { Direction } from './direction'

export type Strategy = 'recursive-backtracking' | 'iterative'

export function carveMaze(
  rows: number,
  columns: number,
  strategy: Strategy = 'recursive-backtracking'
) {
  const grid = gridFactory(rows, columns)
  switch (strategy) {
    case 'recursive-backtracking':
      const cell = grid.getRandCell()
      cell.markStart()
      carveRecursiveBacktracking(grid, [cell])
    case 'iterative':
      carveIterative(grid)
  }
  return grid
}

const getOppositeDirection: (direction: Direction) => Direction = direction => {
  if (direction === 'north') {
    return 'south'
  } else if (direction === 'east') {
    return 'west'
  } else if (direction === 'south') {
    return 'north'
  }
  return 'east'
}

function carveRecursiveBacktracking(
  carveableGrid: IGrid,
  history: ICell[]
): void {
  const cell = history[history.length - 1]

  // get list of walls not carved yet, that point to adjacent cells that have not been visited yet
  const walls = carveableGrid.getAvailableCellWalls(cell, cell.getCoord())

  if (walls.length === 0) {
    if (history.length >= 2) {
      history.pop()
      carveRecursiveBacktracking(carveableGrid, history)
      return
    }
    return
  }

  const wallIndex = randInRange(0, walls.length)
  const wall = walls[wallIndex]
  wall.carve()
  cell.markVisited()

  const adjacentCell = carveableGrid.getAdjacentCell(
    wall.direction,
    cell.getCoord()
  )
  if (adjacentCell) {
    if (!adjacentCell.isVisited()) {
      const oppDir = getOppositeDirection(wall.direction)
      adjacentCell.getWalls()[oppDir].carve()
      adjacentCell.markVisited()
      history.push(adjacentCell)

      carveRecursiveBacktracking(carveableGrid, history)
    }
  }
}

function carveIterative(grid: IGrid): void {
  const coord = grid.getRandCoord()
  const history = [coord]

  let running = true
  while (running) {
    const coord = history[history.length - 1]
    const cell = grid.getCell(coord)
    if (!cell) {
      throw new Error('cell not found')
    }

    // get list of walls not carved yet, that point to adjacent cells that have not been visited yet
    const walls = grid.getAvailableCellWalls(cell, cell.getCoord())

    if (walls.length === 0) {
      if (history.length >= 2) {
        history.pop()
      } else {
        running = false
      }
    } else {
      const wallIndex = randInRange(0, walls.length)
      const wall = walls[wallIndex]
      wall.carve()
      cell.markVisited()

      const adjacentCell = grid.getAdjacentCell(wall.direction, cell.getCoord())
      if (adjacentCell && !adjacentCell.isVisited()) {
        const oppDir = getOppositeDirection(wall.direction)
        adjacentCell.getWalls()[oppDir].carve()
        adjacentCell.markVisited()
        history.push(adjacentCell.getCoord())
      }
    }
  }
}
