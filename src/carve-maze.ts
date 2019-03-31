import { IGrid } from './grid'
import { ICell } from './cell'
import { carveGridFactory, ICarveableGrid } from './carveable-grid'
import { randInRange } from './rand'
import { Direction } from './direction'
import { ICoord } from './coord'

type Strategy = 'recursive-backtracking' | 'iteration'

export function carveMaze(
  grid: IGrid,
  strategy: Strategy = 'recursive-backtracking'
) {
  const cell = grid.getRandCell()
  cell.markStart()
  const carveableGrid = carveGridFactory(grid)
  switch (strategy) {
    case 'recursive-backtracking':
      carveRecursiveBacktracking(carveableGrid, [cell])
    case 'iteration':
      carveIteration(carveableGrid, [cell])
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
  carveableGrid: ICarveableGrid,
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

function carveIteration(carveableGrid: ICarveableGrid, history: ICell[]): void {
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
