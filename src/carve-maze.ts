import { IGrid } from './grid'
import { ICell } from './cell'
import { randInRange } from './rand'
import { Direction } from './direction'

export type Strategy = 'recursive-backtracking' | 'iterative'

export function carveMaze(
  grid: IGrid,
  strategy: Strategy = 'recursive-backtracking'
) {
  switch (strategy) {
    case 'recursive-backtracking':
      const cell = grid.getRandCell()
      cell.markStart()
      carveRecursiveBacktracking(grid, [cell])
    case 'iterative':
      carveIterative(grid)
  }
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
      const backtrackedCell = history.pop()
      if (backtrackedCell) {
        backtrackedCell.markPopped()
      }
      carveRecursiveBacktracking(carveableGrid, history)
      return
    }
    return
  }

  const wallIndex = randInRange(0, walls.length)
  const wall = walls[wallIndex]
  wall.state = 'carved'
  cell.markVisited()

  const adjacentCell = carveableGrid.getAdjacentCell(
    wall.direction,
    cell.getCoord()
  )
  if (adjacentCell) {
    if (!adjacentCell.isVisited()) {
      const oppDir = getOppositeDirection(wall.direction)
      adjacentCell.getWalls()[oppDir].state = 'carved'
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
        const backtrackedCoord = history.pop()
        if (!backtrackedCoord) {
          throw new Error('backtracked coord not found')
        }
        const backtrackedCell = grid.getCell(backtrackedCoord)
        if (backtrackedCell) {
          backtrackedCell.markPopped()
        }
      } else {
        running = false
      }
    } else {
      const wallIndex = randInRange(0, walls.length)
      const wall = walls[wallIndex]
      wall.state = 'carved'
      cell.markVisited()

      const adjacentCell = grid.getAdjacentCell(wall.direction, cell.getCoord())
      if (adjacentCell && !adjacentCell.isVisited()) {
        const oppDir = getOppositeDirection(wall.direction)
        adjacentCell.getWalls()[oppDir].state = 'carved'
        adjacentCell.markVisited()
        history.push(adjacentCell.getCoord())
      }
    }
  }
}
